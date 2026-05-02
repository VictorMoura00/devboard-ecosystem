import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RetroCodeComponent } from '@retro-ui';

export type FoundationId =
  | 'colors'
  | 'tokens'
  | 'typography'
  | 'spacing'
  | 'borders'
  | 'shadows'
  | 'states'
  | 'theme'
  | 'a11y'
  | 'motion'
  | 'composition';

export interface FoundationTopic {
  id: string;
  label: string;
}

@Component({
  selector: 'app-foundations-doc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './foundations-doc.component.html',
  styleUrl: './foundations-doc.component.scss',
})
export class FoundationsDocComponent {
  readonly foundation = input.required<FoundationId>();

  readonly topics = computed(() => this._topicsMap[this.foundation()] ?? []);

  protected scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try {
      history.replaceState(null, '', '#' + sectionId);
    } catch {
      // ignore
    }
  }

  private readonly _topicsMap: Record<FoundationId, FoundationTopic[]> = {
    colors: [
      { id: 'overview', label: 'Overview' },
      { id: 'surface-colors', label: 'Surface Colors' },
      { id: 'text-colors', label: 'Text Colors' },
      { id: 'accent-feedback', label: 'Accent & Feedback' },
      { id: 'light-vs-dark', label: 'Light vs Dark' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
      { id: 'accessibility', label: 'Accessibility' },
      { id: 'relation', label: 'Component Relation' },
    ],
    tokens: [
      { id: 'overview', label: 'Overview' },
      { id: 'primitive-semantic', label: 'Primitive → Semantic' },
      { id: 'legacy-aliases', label: 'Legacy Aliases' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
      { id: 'accessibility', label: 'Accessibility' },
    ],
    typography: [
      { id: 'overview', label: 'Overview' },
      { id: 'type-scale', label: 'Type Scale' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
      { id: 'accessibility', label: 'Accessibility' },
    ],
    spacing: [
      { id: 'overview', label: 'Overview' },
      { id: 'spacing-scale', label: 'Spacing Scale' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
      { id: 'accessibility', label: 'Accessibility' },
    ],
    borders: [
      { id: 'overview', label: 'Overview' },
      { id: 'border-widths', label: 'Border Widths' },
      { id: 'border-radius', label: 'Border Radius' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
      { id: 'accessibility', label: 'Accessibility' },
    ],
    shadows: [
      { id: 'overview', label: 'Overview' },
      { id: 'shadow-tokens', label: 'Shadow Tokens' },
      { id: 'elevation-usage', label: 'Elevation Usage' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
    ],
    states: [
      { id: 'overview', label: 'Overview' },
      { id: 'state-reference', label: 'State Reference' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
      { id: 'accessibility', label: 'Accessibility' },
    ],
    theme: [
      { id: 'overview', label: 'Overview' },
      { id: 'available-themes', label: 'Available Themes' },
      { id: 'theme-builder-contract', label: 'Theme Builder Contract' },
      { id: 'html-attributes', label: 'HTML Attributes' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
    ],
    a11y: [
      { id: 'overview', label: 'Overview' },
      { id: 'contrast', label: 'Contrast' },
      { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
      { id: 'screen-readers', label: 'Screen Readers' },
      { id: 'motion-animation', label: 'Motion & Animation' },
      { id: 'do-not-rely-on-color', label: 'Do Not Rely on Color Alone' },
    ],
    motion: [
      { id: 'overview', label: 'Overview' },
      { id: 'transition-tokens', label: 'Transition Tokens' },
      { id: 'motion-principles', label: 'Motion Principles' },
      { id: 'common-patterns', label: 'Common Patterns' },
    ],
    composition: [
      { id: 'overview', label: 'Overview' },
      { id: 'composition-rules', label: 'Composition Rules' },
      { id: 'example-card', label: 'Example: Building a Card' },
      { id: 'content-projection', label: 'Content Projection' },
      { id: 'usage-guidelines', label: 'Usage Guidelines' },
    ],
  };

  readonly colorTokens = [
    { name: 'desktop',    css: '--desktop',    desc: 'Page background — the canvas behind everything.' },
    { name: 'panel',      css: '--panel',      desc: 'Primary surface for cards, panels, and containers.' },
    { name: 'panel-alt',  css: '--panel-alt',  desc: 'Alternate surface for differentiation within panels.' },
    { name: 'sunken',     css: '--sunken',     desc: 'Recessed surface for inputs, code blocks, and inset areas.' },
    { name: 'line',       css: '--line',       desc: 'Borders, structural lines, and strong separators.' },
    { name: 'line-soft',  css: '--line-soft',  desc: 'Subtle dividers and dashed separators.' },
    { name: 'text',       css: '--text',       desc: 'Primary text — labels, headings, body copy.' },
    { name: 'muted',      css: '--muted',      desc: 'Secondary text — hints, placeholders, disabled labels.' },
    { name: 'input-bg',   css: '--input-bg',   desc: 'Form field background.' },
    { name: 'accent',     css: '--accent',     desc: 'Emphasis, focus rings, active states, links.' },
    { name: 'accent-brite', css: '--accent-brite', desc: 'Bright accent for hover states and glows.' },
    { name: 'success',    css: '--success',    desc: 'Positive feedback — saved, connected, done.' },
    { name: 'info',       css: '--info',       desc: 'Informational highlights — tips, hints, active tabs.' },
    { name: 'danger',     css: '--danger',     desc: 'Errors, destructive actions, warnings.' },
  ];

  readonly semanticTokensTable = [
    { primitive: '--_desktop',     semantic: '--desktop',      usage: 'page background, body' },
    { primitive: '--_panel',       semantic: '--panel',        usage: 'card, panel, window background' },
    { primitive: '--_panel-alt',   semantic: '--panel-alt',    usage: 'alternate card, hover surface' },
    { primitive: '--_sunken',      semantic: '--sunken',       usage: 'input, code block, recessed area' },
    { primitive: '--_line',        semantic: '--line',         usage: 'border, separator, shadow color' },
    { primitive: '--_line-soft',   semantic: '--line-soft',    usage: 'subtle divider, dashed line' },
    { primitive: '--_text',        semantic: '--text',         usage: 'primary text, heading, label' },
    { primitive: '--_muted',       semantic: '--muted',        usage: 'secondary text, placeholder, hint' },
    { primitive: '--_input-bg',    semantic: '--input-bg',     usage: 'form field background' },
    { primitive: '--_accent',      semantic: '--accent',       usage: 'focus ring, active state, link' },
    { primitive: '--_accent-brite', semantic: '--accent-brite', usage: 'hover accent, glow effect' },
    { primitive: '--_success',     semantic: '--success',      usage: 'success message, positive indicator' },
    { primitive: '--_info',        semantic: '--info',         usage: 'info message, tip, active tab' },
    { primitive: '--_danger',      semantic: '--danger',       usage: 'error message, danger button' },
  ];

  readonly typeScale = [
    { name: 'Display',   size: '28px', family: 'var(--font-display)', sample: 'RETRO/UI', usage: 'Page titles, hero text' },
    { name: 'H1',        size: '24px', family: 'var(--font-display)', sample: 'Section Title', usage: 'Major section headings' },
    { name: 'H2',        size: '18px', family: 'var(--font-display)', sample: 'Subsection', usage: 'Subsection headings' },
    { name: 'Body',      size: '14px', family: 'var(--font-mono)',    sample: 'Body text content', usage: 'Paragraphs, descriptions' },
    { name: 'Small',     size: '12px', family: 'var(--font-mono)',    sample: 'Muted helper text', usage: 'Captions, secondary info' },
    { name: 'Label',     size: '10px', family: 'var(--font-mono)',    sample: 'LABEL', usage: 'Form labels, badges, tags' },
    { name: 'Code',      size: '11px', family: 'var(--font-mono)',    sample: 'const x = 42;', usage: 'Inline code, tokens, paths' },
  ];

  readonly spacingScale = [
    { name: '--space-1',  px: 2,  desc: 'Micro gaps, icon padding' },
    { name: '--space-2',  px: 4,  desc: 'Tight element spacing' },
    { name: '--space-3',  px: 6,  desc: 'Label gaps, small margins' },
    { name: '--space-4',  px: 8,  desc: 'Standard padding' },
    { name: '--space-5',  px: 12, desc: 'Component padding' },
    { name: '--space-6',  px: 16, desc: 'Section gaps' },
    { name: '--space-8',  px: 24, desc: 'Layout margins' },
    { name: '--space-10', px: 32, desc: 'Page sections' },
    { name: '--space-12', px: 48, desc: 'Major page divisions' },
    { name: '--space-16', px: 64, desc: 'Major layout separations' },
  ];

  readonly radiusScale = [
    { name: '--radius-none', value: '0',      desc: 'Sharp corners — terminal feel' },
    { name: '--radius-sm',   value: '2px',    desc: 'Subtle softening' },
    { name: '--radius-md',   value: '4px',    desc: 'Standard component radius' },
    { name: '--radius-lg',   value: '8px',    desc: 'Cards, modals' },
    { name: '--radius-full', value: '9999px', desc: 'Pills, dots, badges' },
  ];

  readonly shadowTokens = [
    { name: '--shadow-sm', value: '1px 1px 0 0 var(--shadow-color)', desc: 'Subtle depth — buttons, tags' },
    { name: '--shadow-md', value: '2px 2px 0 0 var(--shadow-color)', desc: 'Standard elevation — cards, inputs' },
    { name: '--shadow-lg', value: '3px 3px 0 0 var(--shadow-color)', desc: 'High elevation — modals, toasts' },
  ];

  readonly stateList = [
    { name: 'Default',    token: '—',               desc: 'Resting state. No interaction occurring.', note: 'Use --panel, --text' },
    { name: 'Hover',      token: 'var(--panel-alt)', desc: 'Mouse is over an interactive element.', note: 'Background shift only; do not change text color alone' },
    { name: 'Focus',      token: 'var(--focus-ring)', desc: 'Keyboard or programmatic focus.', note: 'Must be visible. Minimum 2px outline.' },
    { name: 'Active',     token: 'var(--sunken)',   desc: 'Element is being pressed/activated.', note: 'Invert shadow direction or darken background' },
    { name: 'Selected',   token: 'var(--accent)',   desc: 'Item is chosen or toggled on.', note: 'Combine with text color change for contrast' },
    { name: 'Disabled',   token: 'var(--muted)',    desc: 'Interaction is blocked.', note: 'Reduce opacity to 0.5 and set pointer-events: none' },
    { name: 'Loading',    token: 'var(--info)',     desc: 'Operation in progress.', note: 'Use skeleton or spinner; never rely on color alone' },
    { name: 'Error',      token: 'var(--danger)',   desc: 'Invalid state or failure.', note: 'Always pair with text message and icon' },
    { name: 'Success',    token: 'var(--success)',  desc: 'Operation completed successfully.', note: 'Use toast or inline message; confirm with text' },
    { name: 'Warning',    token: 'var(--accent)',   desc: 'Caution needed.', note: 'Do not use danger for warnings; keep semantic distinction' },
    { name: 'Empty',      token: '—',               desc: 'No data to display.', note: 'Use empty-state pattern with icon and action' },
    { name: 'Expanded',   token: '—',               desc: 'Content is revealed.', note: 'Animate height or opacity; respect prefers-reduced-motion' },
    { name: 'Collapsed',  token: '—',               desc: 'Content is hidden.', note: 'Keep focusable children disabled or hidden from AT' },
  ];

  readonly themes = [
    { name: 'classic-amber',    label: 'Classic Amber',    identity: 'Warm paper, graphite, amber' },
    { name: 'phosphor-green',   label: 'Phosphor Green',   identity: 'Terminal green, dark text' },
    { name: 'crt-blue',         label: 'CRT Blue',         identity: 'Cool grey-blue, navy text' },
    { name: 'synthwave',        label: 'Synthwave',        identity: 'Soft lavender, purple text' },
    { name: 'solar-sepia',      label: 'Solar Sepia',      identity: 'Aged paper, brown text' },
    { name: 'old-computer',     label: 'Old Computer',     identity: 'Warm beige, olive, wood' },
  ];

  readonly motionTokens = [
    { name: '--transition-fast', value: '100ms ease', desc: 'Hover, active, minor state changes' },
    { name: '--transition-base', value: '150ms ease', desc: 'Standard UI transitions' },
    { name: '--transition-slow', value: '300ms ease', desc: 'Expand, collapse, modal enter' },
  ];

  readonly compositionRules = [
    { title: 'Content projection over props', desc: 'Prefer slots and ng-content for flexible content instead of many string inputs.' },
    { title: 'Small focused components', desc: 'Each component should do one thing well. Compose them to build complex UI.' },
    { title: 'Tokens over hardcoded values', desc: 'Always use CSS variables for colors, spacing, and borders.' },
    { title: 'Semantic HTML first', desc: 'Use the correct HTML element before adding ARIA attributes.' },
    { title: 'OnPush by default', desc: 'All components use ChangeDetectionStrategy.OnPush for performance.' },
    { title: 'No domain logic in UI library', desc: 'Components must remain generic and reusable across applications.' },
  ];
}
