import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { RetroButtonComponent, RetroRangeComponent } from '@retro-ui';

@Component({
  selector: 'app-resume-now-playing',
  standalone: true,
  imports: [RetroButtonComponent, RetroRangeComponent],
  templateUrl: './resume-now-playing.component.html',
  styleUrl: './resume-now-playing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeNowPlayingComponent {
  readonly playing  = input.required<boolean>();
  readonly volume   = input.required<number>();
  readonly progress = input.required<number>();
  readonly track    = input('');
  readonly artist   = input('');

  readonly toggle       = output<void>();
  readonly volumeChange = output<number>();
}
