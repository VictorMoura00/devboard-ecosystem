import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroSegmentedComponent } from './retro-segmented.component';

describe('RetroSegmentedComponent', () => {
  let fixture: ComponentFixture<RetroSegmentedComponent>;
  let component: RetroSegmentedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroSegmentedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroSegmentedComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', ['alpha', 'beta', 'gamma']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('should update internal value via writeValue', () => {
      component.writeValue('beta');
      expect((component as any)._value()).toBe('beta');
    });

    it('should call registered onChange when option clicked', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
      buttons[1].click();

      expect(onChange).toHaveBeenCalledWith('beta');
    });

    it('should call registered onTouched when option clicked', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);

      const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
      buttons[0].click();

      expect(onTouched).toHaveBeenCalled();
    });

    it('should disable all buttons via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
      buttons.forEach((btn: HTMLButtonElement) => {
        expect(btn.disabled).toBe(true);
      });
    });

    it('should not emit change when disabled', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      component.setDisabledState(true);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
      buttons[2].click();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should apply active class to selected option', () => {
      component.writeValue('gamma');
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
      expect(buttons[2].classList.contains('seg-btn--active')).toBe(true);
      expect(buttons[2].getAttribute('aria-pressed')).toBe('true');
    });
  });
});
