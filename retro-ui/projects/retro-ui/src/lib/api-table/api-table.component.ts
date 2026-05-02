import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'retro-api-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <table class="api-table" [class.api-table--gap]="gap()">
      <thead>
        <tr>
          @for (h of resolvedHeaders(); track h) {
            <th>{{ h }}</th>
          }
        </tr>
      </thead>
      <tbody>
        <ng-content />
      </tbody>
    </table>
  `,
  styleUrl: './api-table.component.scss',
})
export class ApiTableComponent {
  readonly type    = input<'input' | 'output' | 'method'>('input');
  readonly gap     = input(false);
  readonly headers = input<string[]>([]);

  protected readonly resolvedHeaders = computed<string[]>(() => {
    if (this.headers().length) return this.headers();
    switch (this.type()) {
      case 'input':  return ['input', 'type', 'default', 'description'];
      case 'output': return ['output', 'type', 'description'];
      case 'method': return ['public method', 'signature', 'description'];
    }
  });
}
