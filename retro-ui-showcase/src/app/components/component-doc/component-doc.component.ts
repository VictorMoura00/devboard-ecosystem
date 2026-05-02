import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, input, contentChild } from '@angular/core';
import { RetroCodeComponent } from '@retro-ui';
import type { ComponentDocConfig } from './component-doc.types';

@Component({
  selector: 'app-component-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RetroCodeComponent, NgTemplateOutlet],
  templateUrl: './component-doc.component.html',
  styleUrl: './component-doc.component.scss',
})
export class ComponentDocComponent {
  readonly config = input.required<ComponentDocConfig>();
  readonly demoRef = contentChild<TemplateRef<unknown>>('demo');

  protected scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();

    const el = document.getElementById(sectionId);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL hash without forcing navigation or reflow
    try {
      history.replaceState(null, '', '#' + sectionId);
    } catch {
      // ignore
    }
  }
}
