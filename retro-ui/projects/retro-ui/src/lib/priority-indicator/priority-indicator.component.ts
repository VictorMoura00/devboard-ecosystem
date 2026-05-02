import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type Priority = 'critical' | 'high' | 'medium' | 'low' | 'none';

const SYMBOLS: Record<Priority, string> = {
  critical: '!!',
  high: '!',
  medium: '•',
  low: '·',
  none: '–',
};

@Component({
  selector: 'retro-priority-indicator',
  standalone: true,
  template: `<span class="pi pi--{{ priority() }}">{{ symbol() }}</span>`,
  styleUrl: './priority-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-label': 'priority' },
})
export class PriorityIndicatorComponent {
  readonly priority = input<Priority>('none');
  protected readonly symbol = computed(() => SYMBOLS[this.priority()]);
}
