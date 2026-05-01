import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroRangeComponent } from './retro-range.component';

describe('RetroRangeComponent', () => {
  let fixture: ComponentFixture<RetroRangeComponent>;
  let component: RetroRangeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroRangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('should update internal value via writeValue', () => {
      component.writeValue(50);
      expect((component as any)._value()).toBe(50);
    });

    it('should call registered onChange when range input changes', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const inputEl = fixture.nativeElement.querySelector('input');
      inputEl.value = '75';
      inputEl.dispatchEvent(new Event('input'));

      expect(onChange).toHaveBeenCalledWith(75);
    });

    it('should call registered onTouched on blur', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);

      const inputEl = fixture.nativeElement.querySelector('input');
      inputEl.dispatchEvent(new Event('blur'));

      expect(onTouched).toHaveBeenCalled();
    });

    it('should disable range via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      const inputEl = fixture.nativeElement.querySelector('input');
      expect(inputEl.disabled).toBe(true);
    });

    it('should enable range via setDisabledState(false)', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      component.setDisabledState(false);
      fixture.detectChanges();

      const inputEl = fixture.nativeElement.querySelector('input');
      expect(inputEl.disabled).toBe(false);
    });

    it('should display value when showValue is true', () => {
      fixture.componentRef.setInput('showValue', true);
      fixture.componentRef.setInput('value', 42);
      fixture.detectChanges();

      const valueEl = fixture.nativeElement.querySelector('.retro-range__value');
      expect(valueEl.textContent).toBe('42');
    });
  });
});
