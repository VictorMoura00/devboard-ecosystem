import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroInputComponent } from './retro-input.component';

describe('RetroInputComponent', () => {
  let fixture: ComponentFixture<RetroInputComponent>;
  let component: RetroInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('should reflect writeValue in the internal signal', () => {
      component.writeValue('hello');
      expect((component as any)._value()).toBe('hello');
    });

    it('should call registered onChange when input changes', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const inputEl = fixture.nativeElement.querySelector('input');
      inputEl.value = 'world';
      inputEl.dispatchEvent(new Event('input'));

      expect(onChange).toHaveBeenCalledWith('world');
    });

    it('should call registered onTouched on blur', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);

      const inputEl = fixture.nativeElement.querySelector('input');
      inputEl.dispatchEvent(new Event('blur'));

      expect(onTouched).toHaveBeenCalled();
    });

    it('should disable the native input via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      const inputEl = fixture.nativeElement.querySelector('input');
      expect(inputEl.disabled).toBe(true);
    });

    it('should emit cleared value when clear button is clicked', () => {
      fixture.componentRef.setInput('clearable', true);
      fixture.componentRef.setInput('value', 'text');
      fixture.detectChanges();

      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const clearBtn = fixture.nativeElement.querySelector('.input-clear');
      expect(clearBtn).not.toBeNull();

      clearBtn.click();
      expect(onChange).toHaveBeenCalledWith('');
      expect((component as any)._value()).toBe('');
    });
  });
});
