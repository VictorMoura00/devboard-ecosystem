import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroSelectComponent } from './retro-select.component';

describe('RetroSelectComponent', () => {
  let fixture: ComponentFixture<RetroSelectComponent>;
  let component: RetroSelectComponent;

  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('should reflect writeValue in the internal signal', () => {
      component.writeValue('b');
      expect((component as any)._value()).toBe('b');
    });

    it('should call registered onChange when an option is selected', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const trigger = fixture.nativeElement.querySelector('.retro-select__trigger');
      trigger.click();
      fixture.detectChanges();

      const optButtons = fixture.nativeElement.querySelectorAll('.retro-select__opt');
      optButtons[1].click();

      expect(onChange).toHaveBeenCalledWith('b');
    });

    it('should call registered onTouched on blur', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);

      const trigger = fixture.nativeElement.querySelector('.retro-select__trigger');
      trigger.dispatchEvent(new Event('blur'));

      expect(onTouched).toHaveBeenCalled();
    });

    it('should disable the trigger via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('.retro-select__trigger');
      expect(trigger.disabled).toBe(true);
    });

    it('should open dropdown on trigger click', () => {
      expect((component as any)._open()).toBe(false);

      const trigger = fixture.nativeElement.querySelector('.retro-select__trigger');
      trigger.click();
      fixture.detectChanges();

      expect((component as any)._open()).toBe(true);
      expect(fixture.nativeElement.querySelector('.retro-select__dropdown')).not.toBeNull();
    });

    it('should not select a disabled option', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const trigger = fixture.nativeElement.querySelector('.retro-select__trigger');
      trigger.click();
      fixture.detectChanges();

      const optButtons = fixture.nativeElement.querySelectorAll('.retro-select__opt');
      // Third option is disabled in our test data
      expect(optButtons[2].disabled).toBe(true);
    });
  });
});
