import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroSkeletonComponent } from './retro-skeleton.component';

describe('RetroSkeletonComponent', () => {
  let fixture: ComponentFixture<RetroSkeletonComponent>;
  let component: RetroSkeletonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ARIA accessibility', () => {
    it('should have aria-hidden="true" by default', () => {
      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have role="status"', () => {
      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('role')).toBe('status');
    });

    it('should remove aria-hidden and set aria-label when ariaLabel is provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Loading content');
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.getAttribute('aria-hidden')).toBeNull();
      expect(host.getAttribute('aria-label')).toBe('Loading content');
    });
  });

  describe('count', () => {
    it('should render default single row', () => {
      const skeletons = fixture.nativeElement.querySelectorAll('.skeleton');
      expect(skeletons.length).toBe(1);
    });

    it('should render multiple rows when count > 1', () => {
      fixture.componentRef.setInput('count', 3);
      fixture.detectChanges();

      const skeletons = fixture.nativeElement.querySelectorAll('.skeleton');
      expect(skeletons.length).toBe(3);
    });

    it('should render at least one row even with count=0', () => {
      fixture.componentRef.setInput('count', 0);
      fixture.detectChanges();

      const skeletons = fixture.nativeElement.querySelectorAll('.skeleton');
      expect(skeletons.length).toBe(1);
    });
  });

  describe('shape', () => {
    it('should apply circle class when shape is circle', () => {
      fixture.componentRef.setInput('shape', 'circle');
      fixture.detectChanges();

      const skeleton = fixture.nativeElement.querySelector('.skeleton');
      expect(skeleton.classList.contains('skeleton--circle')).toBe(true);
    });

    it('should not apply circle class when shape is rectangle', () => {
      const skeleton = fixture.nativeElement.querySelector('.skeleton');
      expect(skeleton.classList.contains('skeleton--circle')).toBe(false);
    });
  });

  describe('animation', () => {
    it('should apply wave class by default', () => {
      const skeleton = fixture.nativeElement.querySelector('.skeleton');
      expect(skeleton.classList.contains('skeleton--wave')).toBe(true);
    });

    it('should apply pulse class when animation is pulse', () => {
      fixture.componentRef.setInput('animation', 'pulse');
      fixture.detectChanges();

      const skeleton = fixture.nativeElement.querySelector('.skeleton');
      expect(skeleton.classList.contains('skeleton--pulse')).toBe(true);
      expect(skeleton.classList.contains('skeleton--wave')).toBe(false);
    });

    it('should apply no animation class when animation is none', () => {
      fixture.componentRef.setInput('animation', 'none');
      fixture.detectChanges();

      const skeleton = fixture.nativeElement.querySelector('.skeleton');
      expect(skeleton.classList.contains('skeleton--wave')).toBe(false);
      expect(skeleton.classList.contains('skeleton--pulse')).toBe(false);
    });
  });
});
