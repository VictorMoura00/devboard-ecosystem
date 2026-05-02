import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroProgressComponent } from './retro-progress.component';

describe('RetroProgressComponent', () => {
  let fixture: ComponentFixture<RetroProgressComponent>;
  let component: RetroProgressComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ARIA accessibility', () => {
    it('should have role="progressbar" on host', () => {
      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('role')).toBe('progressbar');
    });

    it('should have aria-valuemin="0"', () => {
      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-valuemin')).toBe('0');
    });

    it('should have aria-valuemax="100"', () => {
      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-valuemax')).toBe('100');
    });

    it('should set aria-valuenow for determinate mode', () => {
      fixture.componentRef.setInput('value', 42);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-valuenow')).toBe('42');
    });

    it('should set aria-valuenow=0 for indeterminate mode', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.componentRef.setInput('value', 75);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-valuenow')).toBeNull();
    });

    it('should use ariaLabel input for accessible name', () => {
      fixture.componentRef.setInput('ariaLabel', 'Upload progress');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-label')).toBe('Upload progress');
    });

    it('should fall back to label input when ariaLabel is empty', () => {
      fixture.componentRef.setInput('label', 'Download');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-label')).toBe('Download');
    });

    it('should set aria-valuetext with value and unit in determinate mode', () => {
      fixture.componentRef.setInput('value', 60);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-valuetext')).toBe('60%');
    });

    it('should not set aria-valuetext in indeterminate mode', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-valuetext')).toBeNull();
    });
  });

  describe('value clamping', () => {
    it('should clamp value to 0-100 range', () => {
      fixture.componentRef.setInput('value', 150);
      fixture.detectChanges();
      expect((component as any).pct()).toBe(100);

      fixture.componentRef.setInput('value', -20);
      fixture.detectChanges();
      expect((component as any).pct()).toBe(0);
    });
  });
});
