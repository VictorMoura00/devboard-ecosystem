import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'retro-segmented',
  standalone: true,
  templateUrl: './retro-segmented.component.html',
  styleUrl: './retro-segmented.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'radiogroup',
    '[class.is-col]': "direction() === 'col'",
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-disabled]': '_cvaDisabled()',
    '(keydown)': '_onKeyDown($event)',
  },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RetroSegmentedComponent), multi: true }],
})
export class RetroSegmentedComponent implements ControlValueAccessor {
  readonly options   = input<readonly string[]>([]);
  readonly value     = input('');
  readonly direction = input<'row' | 'col'>('row');
  readonly ariaLabel = input('');

  readonly valueChange = output<string>();

  protected readonly _value       = linkedSignal(() => this.value());
  protected readonly _cvaDisabled = signal(false);
  protected readonly _buttons     = viewChildren<HTMLButtonElement>('segBtn');

  private _el         = inject(ElementRef);
  private _onChange:  (v: string) => void = () => {};
  private _onTouched: () => void           = () => {};

  writeValue(v: string): void                     { this._value.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void         { this._onTouched = fn; }
  setDisabledState(disabled: boolean): void       { this._cvaDisabled.set(disabled); }

  protected select(opt: string): void {
    if (this._cvaDisabled()) return;
    this._value.set(opt);
    this._onChange(opt);
    this._onTouched();
    this.valueChange.emit(opt);
  }

  protected _onKeyDown(event: KeyboardEvent): void {
    const opts   = this.options();
    const current = opts.indexOf(this._value());
    let next = current;

    const isRow = this.direction() === 'row';

    switch (event.key) {
      case 'ArrowRight':
        if (isRow) { next = (current + 1) % opts.length; event.preventDefault(); }
        break;
      case 'ArrowLeft':
        if (isRow) { next = (current - 1 + opts.length) % opts.length; event.preventDefault(); }
        break;
      case 'ArrowDown':
        if (!isRow) { next = (current + 1) % opts.length; event.preventDefault(); }
        break;
      case 'ArrowUp':
        if (!isRow) { next = (current - 1 + opts.length) % opts.length; event.preventDefault(); }
        break;
      case 'Home':
        next = 0; event.preventDefault();
        break;
      case 'End':
        next = opts.length - 1; event.preventDefault();
        break;
      default:
        return;
    }

    if (next >= 0 && next < opts.length && next !== current) {
      this.select(opts[next]);
      const buttons = this._buttons();
      buttons[next]?.focus?.();
    }
  }
}
