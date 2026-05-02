import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SkeletonShape     = 'rectangle' | 'circle';
export type SkeletonAnimation = 'wave' | 'pulse' | 'none';

@Component({
  selector: 'retro-skeleton',
  standalone: true,
  templateUrl: './retro-skeleton.component.html',
  styleUrl: './retro-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[attr.aria-label]': 'ariaLabel() || null',
    role: 'status',
  },
})
export class RetroSkeletonComponent {
  readonly width     = input('100%');
  readonly height    = input('14px');
  readonly shape     = input<SkeletonShape>('rectangle');
  readonly animation = input<SkeletonAnimation>('wave');
  /** Number of stacked skeleton rows. */
  readonly count     = input(1);
  /** Accessible label — when set, skeleton is announced as loading status. */
  readonly ariaLabel = input('');

  protected readonly rows = computed(() => Array.from({ length: Math.max(1, this.count()) }));
  protected readonly isCircle = computed(() => this.shape() === 'circle');
}
