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

  describe('ARIA accessibility', () => {
    it('should have role="radiogroup" on host', () => {
      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('role')).toBe('radiogroup');
    });

    it('should have role="radio" on each button', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
      buttons.forEach((btn: HTMLButtonElement) => {
        expect(btn.getAttribute('role')).toBe('radio');
      });
    });

    it('should set aria-checked on buttons', () => {
      component.writeValue('beta');
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
      expect(buttons[0].getAttribute('aria-checked')).toBe('false');
      expect(buttons[1].getAttribute('aria-checked')).toBe('true');
      expect(buttons[2].getAttribute('aria-checked')).toBe('false');
    });

    it('should set aria-label on host when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'View mode');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-label')).toBe('View mode');
    });
  });

  describe('Keyboard navigation (row direction)', () => {
    beforeEach(() => {
      component.writeValue('alpha');
      fixture.detectChanges();
    });

    it('should move focus to next option on ArrowRight', () => {
      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('beta');
    });

    it('should move focus to previous option on ArrowLeft', () => {
      component.writeValue('beta');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');
    });

    it('should wrap around on ArrowRight from last option', () => {
      component.writeValue('gamma');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');
    });

    it('should wrap around on ArrowLeft from first option', () => {
      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('gamma');
    });

    it('should select first option on Home', () => {
      component.writeValue('gamma');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');
    });

    it('should select last option on End', () => {
      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('gamma');
    });

    it('should not react to vertical arrows in row mode', () => {
      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');

      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');
    });
  });

  describe('Keyboard navigation (col direction)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('direction', 'col');
      component.writeValue('alpha');
      fixture.detectChanges();
    });

    it('should move focus to next option on ArrowDown', () => {
      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('beta');
    });

    it('should move focus to previous option on ArrowUp', () => {
      component.writeValue('beta');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');
    });

    it('should not react to horizontal arrows in col mode', () => {
      const host = fixture.nativeElement as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');

      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      fixture.detectChanges();

      expect(component['_value']()).toBe('alpha');
    });
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
      expect(buttons[2].getAttribute('aria-checked')).toBe('true');
    });
  });
});
