import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroCheckboxComponent } from './retro-checkbox.component';

describe('RetroCheckboxComponent', () => {
  let fixture: ComponentFixture<RetroCheckboxComponent>;
  let component: RetroCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('should reflect writeValue in the internal signal', () => {
      component.writeValue(true);
      expect((component as any)._checked()).toBe(true);
    });

    it('should coerce falsy values to boolean on writeValue', () => {
      component.writeValue(false);
      expect((component as any)._checked()).toBe(false);
    });

    it('should call registered onChange when checkbox changes', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const inputEl = fixture.nativeElement.querySelector('input[type="checkbox"]');
      inputEl.checked = true;
      inputEl.dispatchEvent(new Event('change'));

      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should call registered onTouched on blur', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);

      const inputEl = fixture.nativeElement.querySelector('input[type="checkbox"]');
      inputEl.dispatchEvent(new Event('blur'));

      expect(onTouched).toHaveBeenCalled();
    });

    it('should disable the native input via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      const inputEl = fixture.nativeElement.querySelector('input[type="checkbox"]');
      expect(inputEl.disabled).toBe(true);
    });

    it('should emit valueChange with trueValue/falseValue', () => {
      fixture.componentRef.setInput('trueValue', 'yes');
      fixture.componentRef.setInput('falseValue', 'no');
      fixture.detectChanges();

      const valueSpy = vi.fn();
      fixture.componentInstance.valueChange.subscribe(valueSpy);

      const inputEl = fixture.nativeElement.querySelector('input[type="checkbox"]');
      inputEl.checked = true;
      inputEl.dispatchEvent(new Event('change'));

      expect(valueSpy).toHaveBeenCalledWith('yes');
    });
  });
});
