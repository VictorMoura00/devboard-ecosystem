import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { APP_THEMES, DisplayMode, RetroAccent, RetroThemeName, ThemeService } from '@retro-ui';
import {
  AsciiBarComponent,
  FilterRule,
  FilterTab,
  GridColumn,
  RetroFilterBarComponent,
  RetroGridRowComponent,
  NotifService,
  NotifSource,
  NotifType,
  Priority,
  PriorityIndicatorComponent,
  RetroButtonComponent,
  RetroButtonGroupComponent,
  RetroCheckboxComponent,
  RetroCodeComponent,
  RetroCollapsibleComponent,
  RetroDataGridComponent,
  RetroExpandableRowComponent,
  RetroPaginatorComponent,
  RelativeTimePipe,
  createRetroTable,
  RetroInputComponent,
  RetroKbdComponent,
  RetroMessageComponent,
  RetroModalComponent,
  RetroNotifItemComponent,
  RetroNotifStreamComponent,
  RetroProgressComponent,
  RetroRangeComponent,
  RetroSegmentedComponent,
  RetroSelectComponent,
  RetroSkeletonComponent,
  RetroStatusBarComponent,
  RetroTagComponent,
  RetroToastComponent,
  RetroWindowComponent,
  StatBoxComponent,
  StatusDotComponent,
  StatusItem,
  StatusPillComponent,
  StatusShortcut,
  ToastService,
  ToolbarSearchComponent,
  Visibility,
  VisibilityChipComponent,
  RetroTerminalComponent,
  ApiTableComponent,
  RetroTabsComponent,
  RetroSectionComponent,
  RetroTab,
} from '@retro-ui';
import { FoundationsDocComponent, FoundationId } from '../../components/foundations-doc/foundations-doc.component';
import { ComponentDocComponent } from '../../components/component-doc/component-doc.component';
import { COMPONENT_DOCS } from '../../components/component-docs';
import type { TerminalCommand, TerminalLineType } from '@retro-ui';
import { RetroButtonIconPos, RetroButtonTone, RetroButtonVariant } from '@retro-ui';
import { RetroCheckboxSize } from '@retro-ui';
import { RetroInputSize, RetroInputType } from '@retro-ui';
import { MessageSeverity, MessageVariant } from '@retro-ui';
import { ProgressMode, ProgressTone } from '@retro-ui';
import { SkeletonAnimation, SkeletonShape } from '@retro-ui';
import { TagSize, TagVariant } from '@retro-ui';
import { ToastPosition } from '@retro-ui';
import { StatBoxTone, StatBoxTrend } from '@retro-ui';
import { StatusDotSize } from '@retro-ui';
import { StatusPillSize } from '@retro-ui';
import { WindowControl, WindowPadding, WindowStatus, WindowVariant } from '@retro-ui';

type StoryId =
  | 'foundations-colors' | 'foundations-tokens' | 'foundations-typography'
  | 'foundations-spacing' | 'foundations-borders' | 'foundations-shadows'
  | 'foundations-states' | 'foundations-theme' | 'foundations-a11y'
  | 'foundations-motion' | 'foundations-composition'
  | 'win' | 'button' | 'input' | 'select' | 'range' | 'checkbox' | 'kbd'
  | 'pill' | 'dot' | 'tag' | 'stat'
  | 'progress' | 'ascii' | 'toast' | 'message' | 'skeleton'
  | 'modal' | 'collapsible' | 'code'
  | 'toolbar-search' | 'notif-item' | 'notif-stream'
  | 'priority-indicator' | 'visibility-chip' | 'retro-filter-bar' | 'retro-grid-row'
  | 'retro-status-bar' | 'retro-data-grid' | 'retro-expandable-row' | 'retro-paginator'
  | 'terminal'
  | 'segmented' | 'button-group'
  | 'api-table' | 'retro-tabs' | 'retro-section'
  ;
type StoryTab = 'preview' | 'code';
type DocTab = 'usage' | 'api' | 'meta';

interface StoryItem  { id: StoryId; label: string; }
interface StoryGroup { group: string; items: StoryItem[]; }
type PreviewBackground = 'panel' | 'light' | 'dark';
interface StoryDocMeta {
  selector: string;
  summary: string;
  inputs: number;
  outputs: number;
  slots: number;
}

type DocBadge = 'standalone' | 'cva' | 'onpush' | 'a11y' | 'form' | 'layout' | 'display' | 'feedback' | 'composable' | 'interactive';

interface DocApiRow {
  name: string;
  type: string;
  default: string;
  desc: string;
  required?: boolean;
}

interface ComponentDoc {
  badges: DocBadge[];
  description: string;
  inputs?: DocApiRow[];
  outputs?: DocApiRow[];
  methods?: DocApiRow[];
  cva?: string[];
  slots?: string;
  a11y: string[];
  practices: string[];
  tokens?: string[];
}

@Component({
  selector: 'app-ui-library-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.sidebar-collapsed]': 'sidebarCollapsed()' },
  imports: [
    FormsModule,
    AsciiBarComponent,
    RetroButtonComponent,
    RetroButtonGroupComponent,
    RetroCheckboxComponent,
    RetroCodeComponent,
    RetroCollapsibleComponent,
    RetroInputComponent,
    RetroKbdComponent,
    RetroMessageComponent,
    RetroModalComponent,
    RetroProgressComponent,
    RetroRangeComponent,
    RetroSegmentedComponent,
    RetroSelectComponent,
    RetroSkeletonComponent,
    RetroTagComponent,
    RetroToastComponent,
    RetroWindowComponent,
    StatBoxComponent,
    StatusDotComponent,
    StatusPillComponent,    ToolbarSearchComponent,
    RetroNotifItemComponent,
    RetroNotifStreamComponent,
    PriorityIndicatorComponent,
    VisibilityChipComponent,
    RetroFilterBarComponent,    RetroGridRowComponent,
    RetroStatusBarComponent,
    RetroDataGridComponent,
    RetroExpandableRowComponent,
    RetroPaginatorComponent,
    RelativeTimePipe,
    RetroTerminalComponent,
    ApiTableComponent,
    RetroTabsComponent,
    RetroSectionComponent,
    FoundationsDocComponent,
    ComponentDocComponent,
  ],
  templateUrl: './ui-library-page.component.html',
  styleUrl: './ui-library-page.component.scss',
})
export class UiLibraryPageComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly toastService  = inject(ToastService);
  protected readonly notifService  = inject(NotifService);
  private readonly storySearchInput = viewChild<RetroInputComponent>('storySearchInput');
  private readonly previewViewportElement = viewChild<ElementRef<HTMLElement>>('previewViewportEl');
  private readonly hydrated = signal(false);
  private readonly storagePrefix = 'devboard.lib';

  protected readonly themes       = APP_THEMES;
  protected readonly currentTheme = this.themeService.currentTheme;
  protected readonly displayMode  = this.themeService.displayMode;
  protected readonly accent       = this.themeService.accent;
  protected readonly isDark       = this.themeService.isDark;
  protected readonly themeOptions = APP_THEMES.map(t => ({ label: t.label, value: t.name }));
  protected readonly modeOptions: { label: string; value: DisplayMode; icon: string }[] = [
    { label: 'Light', value: 'light', icon: '☀' },
    { label: 'Dark', value: 'dark', icon: '☾' },
  ];
  protected readonly COMPONENT_DOCS = COMPONENT_DOCS;
  protected readonly componentDocKeys = Object.keys(COMPONENT_DOCS);
  protected readonly hasComponentDoc = computed(() => this.componentDocKeys.includes(this.activeStory()));
  protected readonly componentDocConfig = computed(() => this.COMPONENT_DOCS[this.activeStory()]);

  protected readonly isFoundation = computed(() => this.activeStory().startsWith('foundations-'));
  protected readonly activeFoundationId = computed(() => {
    const story = this.activeStory();
    return story.startsWith('foundations-') ? story.replace('foundations-', '') as FoundationId : null;
  });

  protected readonly accentOptions: { label: string; value: RetroAccent }[] = [
    { label: 'Amber', value: 'amber' },
    { label: 'Green', value: 'green' },
    { label: 'Cyan', value: 'cyan' },
  ];

  protected setTheme(name: RetroThemeName): void { this.themeService.setTheme(name); }
  protected setMode(mode: DisplayMode): void  { this.themeService.setMode(mode); }
  protected toggleMode(): void { this.themeService.toggleMode(); }
  protected setAccent(accent: RetroAccent): void { this.themeService.setAccent(accent); }

  // ── Foundations data ────────────────────────────────────────────────────

  protected readonly colorSwatches = [
    { name: 'accent', value: '#ffb000' },
    { name: 'accent-brite', value: '#ffd166' },
    { name: 'success', value: '#33ff66' },
    { name: 'info', value: '#00d3ff' },
    { name: 'danger', value: '#ff4136' },
    { name: 'line', value: '#1a1a18' },
    { name: 'line-soft', value: '#8f8a7a' },
    { name: 'text', value: '#1a1a18' },
    { name: 'muted', value: '#6b6b60' },
    { name: 'panel', value: '#d8d3c4' },
    { name: 'panel-alt', value: '#e4dfd0' },
    { name: 'sunken', value: '#b8b2a1' },
    { name: 'desktop', value: '#c9c3b2' },
  ];

  protected readonly semanticSwatches = [
    { name: 'text', cssVar: '--text' },
    { name: 'muted', cssVar: '--muted' },
    { name: 'line', cssVar: '--line' },
    { name: 'line-soft', cssVar: '--line-soft' },
    { name: 'panel', cssVar: '--panel' },
    { name: 'panel-alt', cssVar: '--panel-alt' },
    { name: 'sunken', cssVar: '--sunken' },
    { name: 'desktop', cssVar: '--desktop' },
    { name: 'accent', cssVar: '--accent' },
    { name: 'accent-brite', cssVar: '--accent-brite' },
    { name: 'success', cssVar: '--success' },
    { name: 'info', cssVar: '--info' },
    { name: 'danger', cssVar: '--danger' },
    { name: 'focus-ring', cssVar: '--focus-ring' },
    { name: 'input-bg', cssVar: '--input-bg' },
  ];

  protected readonly spacingValues = [
    { name: '--space-1', px: 2 },
    { name: '--space-2', px: 4 },
    { name: '--space-3', px: 6 },
    { name: '--space-4', px: 8 },
    { name: '--space-5', px: 12 },
    { name: '--space-6', px: 16 },
    { name: '--space-8', px: 24 },
    { name: '--space-10', px: 32 },
    { name: '--space-12', px: 48 },
    { name: '--space-16', px: 64 },
  ];

  protected readonly radiusValues = [
    { name: '--radius-none', value: '0' },
    { name: '--radius-sm', value: '2px' },
    { name: '--radius-md', value: '4px' },
    { name: '--radius-lg', value: '8px' },
    { name: '--radius-full', value: '9999px' },
  ];

  protected readonly colorsDocCode = `# Colors

## Architecture

retro-ui uses a three-layer token system based on the Theme Builder contract:

1. **Primitive tokens** — 14 raw values per theme+mode (\`--_accent\`, \`--_panel\`, etc.)
2. **Semantic tokens** — mapped from primitives (\`--accent\`, \`--panel\`, etc.)
3. **Component tokens** — derived from semantics (\`--button-primary-bg\`, etc.)

## Theme Builder Contract (14 primitives)

Every theme must define these 14 tokens for both light and dark modes:

\`\`\`scss
/* Surfaces */
--_desktop      /* page background */
--_panel        /* panel / card background */
--_panel-alt    /* alternate panel background */
--_sunken       /* recessed surface background */

/* Structure */
--_line         /* borders and structural lines */
--_line-soft    /* subtle dividers */

/* Text */
--_text         /* primary text */
--_muted        /* secondary / disabled text */

/* Form */
--_input-bg     /* form field background */

/* Accent palette */
--_accent       /* emphasis / highlight */
--_accent-brite /* bright accent (hover, active) */
--_success      /* positive / success */
--_info         /* informational */
--_danger       /* error / danger */
\`\`\`

## Legacy Aliases

For backwards compatibility, these aliases point to the new semantic tokens:

\`\`\`
--amber        → var(--accent)
--amber-bright → var(--accent-brite)
--phosphor     → var(--success)
--cyan         → var(--info)
--red          → var(--danger)
\`\`\`

## Semantic mapping

Semantic tokens are mapped from primitives. The mapping is generic across all themes:

\`\`\`scss
html[data-theme] {
  --accent:  var(--_accent);
  --panel:   var(--_panel);
  --text:    var(--_text);
  /* ... */
}
\`\`\`

## Usage

Always use semantic tokens in components:

\`\`\`scss
.my-component {
  background: var(--panel);     /* ✅ semantic */
  color: var(--text);            /* ✅ semantic */
  border-color: var(--line);     /* ✅ semantic */
}
\`\`\`

Never use primitive tokens:

\`\`\`scss
.my-component {
  background: var(--_panel);    /* ❌ primitive */
  color: var(--_text);           /* ❌ primitive */
}
\`\`\``;

  protected readonly tokensDocCode = `# Design Tokens

## Token Layers

### 1. Primitives (Theme Builder Contract)
14 raw values defined per theme+mode. Prefixed with \`--_\`.

\`\`\`
/* Surfaces */
--_desktop, --_panel, --_panel-alt, --_sunken

/* Structure */
--_line, --_line-soft

/* Text */
--_text, --_muted

/* Form */
--_input-bg

/* Accent palette */
--_accent, --_accent-brite, --_success, --_info, --_danger
\`\`\`

### 2. Semantic
Mapped from primitives. Used by components.

\`\`\`
--desktop, --panel, --panel-alt, --sunken
--line, --line-soft, --text, --muted
--input-bg, --focus-ring, --page-bg

/* Accent palette */
--accent, --accent-brite, --success, --info, --danger

/* Legacy aliases */
--amber, --amber-bright, --phosphor, --cyan, --red
\`\`\`

### 3. Component
Derived from semantic tokens.

\`\`\`
--button-primary-bg, --button-primary-fg
--button-secondary-bg, --button-secondary-fg
--button-shadow
--font-mono, --font-display
\`\`\`

## Spacing Scale

\`\`\`
--space-1:   2px
--space-2:   4px
--space-3:   6px
--space-4:   8px
--space-5:  12px
--space-6:  16px
--space-8:  24px
--space-10: 32px
--space-12: 48px
--space-16: 64px
\`\`\`

## Border Radius

\`\`\`
--radius-none: 0
--radius-sm:   2px
--radius-md:   4px
--radius-lg:   8px
--radius-full: 9999px
\`\`\`

## Shadows

\`\`\`
--shadow-sm: 1px 1px 0 0 var(--shadow-color)
--shadow-md: 2px 2px 0 0 var(--shadow-color)
--shadow-lg: 3px 3px 0 0 var(--shadow-color)
\`\`\`

## Transitions

\`\`\`
--transition-fast: 100ms ease
--transition-base: 150ms ease
--transition-slow: 300ms ease
\`\`\``;

  protected readonly themeDocCode = `# Theme Builder

## Architecture

Three independent dimensions control the visual system:

| Dimension | Values | Purpose |
|-----------|--------|---------|
| **Theme** | classic-amber, phosphor-green, crt-blue, synthwave, solar-sepia, old-computer | Visual identity / palette |
| **Mode** | light, dark | Luminosity of surfaces |
| **Accent** | amber, green, cyan | Highlight / emphasis color |

\`\`\`
Theme:  classic-amber | phosphor-green | crt-blue | synthwave | solar-sepia | old-computer
Mode:   light | dark
Accent: amber | green | cyan
\`\`\`

## Theme Matrix

Every theme supports both light and dark modes:

| Theme | Light identity | Dark identity |
|-------|---------------|---------------|
| classic-amber | warm paper, graphite, amber | charcoal, ivory, amber |
| phosphor-green | terminal green, dark text | black-green, phosphor glow |
| crt-blue | cool grey-blue, navy text | deep navy, cyan glow |
| synthwave | soft lavender, purple text | deep purple, magenta glow |
| solar-sepia | aged paper, brown text | warm charcoal, amber glow |
| old-computer | warm beige, olive, wood | dark olive, warm grey, amber |

## Theme Builder Contract

Every theme must define **14 primitive tokens** for both light and dark modes:

\`\`\`scss
/* Surfaces */
--_desktop      /* page background */
--_panel        /* panel / card background */
--_panel-alt    /* alternate panel background */
--_sunken       /* recessed surface background */

/* Structure */
--_line         /* borders and structural lines */
--_line-soft    /* subtle dividers */

/* Text */
--_text         /* primary text */
--_muted        /* secondary / disabled text */

/* Form */
--_input-bg     /* form field background */

/* Accent palette */
--_accent       /* emphasis / highlight / interactive focus */
--_accent-brite /* bright accent (hover, active) */
--_success      /* positive / success */
--_info         /* informational */
--_danger       /* error / danger */
\`\`\`

## Token Layers

1. **Primitives** (\`--_panel\`, \`--_text\`) — 14 raw values per theme+mode
2. **Semantic** (\`--panel\`, \`--text\`) — mapped from primitives
3. **Legacy aliases** (\`--amber\`, \`--phosphor\`, \`--cyan\`, \`--red\`) — point to semantic accent tokens
4. **Component** (\`--button-primary-bg\`) — derived from semantic
5. **Accent** (\`--accent\`) — dynamic highlight based on data-accent

## Legacy Aliases

For backwards compatibility, these aliases are maintained:

\`\`\`
--amber        → var(--accent)
--amber-bright → var(--accent-brite)
--phosphor     → var(--success)
--cyan         → var(--info)
--red          → var(--danger)
\`\`\`

## Mode Switching

Mode changes semantic surface tokens globally. No component-level overrides needed.

\`\`\`typescript
// ThemeService
themeService.setTheme('phosphor-green');
themeService.setMode('dark');
themeService.toggleMode();
themeService.setAccent('green');
\`\`\`

\`\`\`html
<!-- HTML attributes set by ThemeService -->
<html data-theme="phosphor-green" data-mode="dark" data-accent="green">
\`\`\`

## Best Practices

- ✅ Use semantic tokens (\`--panel\`, \`--text\`)
- ✅ Use \`--accent\` for emphasis instead of hardcoded \`--amber\`
- ✅ Use \`--success\`, \`--info\`, \`--danger\` for semantic states
- ✅ Let mode handle light/dark surfaces
- ✅ Use \`--focus-ring\` for focus states
- ✅ Theme and mode are separate; dark is a mode, not a theme
- ❌ Don't use primitive tokens (\`--_panel\`)
- ❌ Don't hardcode colors in components
- ❌ Don't create separate dark mode styles per component`;

  protected readonly typographyDocCode = `# Typography

## Font Families

Two typefaces power the retro-ui aesthetic:

\`\`\`scss
--font-display: 'Share Tech Mono', monospace;  /* headings, chrome */
--font-mono:    'JetBrains Mono', monospace;   /* body, code, terminals */
\`\`\`

## Type Scale

\`\`\`
display:  28px / --font-display / uppercase / 0.05em letter-spacing
h1:       24px / --font-display / uppercase
h2:       18px / --font-display / uppercase
body:     14px / --font-mono
small:    12px / --font-mono / --muted color
code:     11px / --font-mono / --sunken background
label:    10px / --font-mono / uppercase
badge:     9px / --font-mono
\`\`\``;

  protected readonly spacingDocCode = `# Spacing

## Scale

Consistent spacing creates rhythm. Always use tokens:

\`\`\`
--space-1:   2px   /* micro gaps, icon padding */
--space-2:   4px   /* tight element spacing */
--space-3:   6px   /* label gaps */
--space-4:   8px   /* standard padding */
--space-5:  12px   /* component padding */
--space-6:  16px   /* section gaps */
--space-8:  24px   /* layout margins */
--space-10: 32px   /* page sections */
--space-12: 48px   /* page gaps */
--space-16: 64px   /* major divisions */
\`\`\``;

  protected readonly bordersDocCode = `# Borders & Radius

## Border Widths

\`\`\`scss
--border-width: 2px;    /* default component border */
--border-thin:  1px;    /* subtle dividers */
--border-thick: 3px;    /* emphasis, selected states */
\`\`\`

## Radius Scale

\`\`\`
--radius-none:  0        /* sharp corners, terminal feel */
--radius-sm:    2px      /* subtle softening */
--radius-md:    4px      /* standard component radius */
--radius-lg:    8px      /* cards, modals */
--radius-full:  9999px   /* pills, dots */
\`\`\``;

  protected readonly shadowsDocCode = `# Shadows

## Shadow Tokens

Retro-ui uses crisp, offset shadows rather than blur for a pixel-authentic look:

\`\`\`scss
--shadow-sm: 1px 1px 0 0 var(--shadow-color);
--shadow-md: 2px 2px 0 0 var(--shadow-color);
--shadow-lg: 3px 3px 0 0 var(--shadow-color);
--shadow-color: var(--line);
\`\`\`

Components use shadows consistently for elevation and depth cues.`;

  protected readonly statesDocCode = `# States

## Interactive States

Every interactive component implements:

\`\`\`scss
/* Hover */
--hover-bg: var(--panel-alt);

/* Focus */
--focus-ring: 2px solid var(--amber);
--focus-ring-offset: 2px;

/* Active */
--active-bg: var(--sunken);

/* Disabled */
--disabled-opacity: 0.5;
--disabled-pointer: not-allowed;

/* Transitions */
--transition-fast: 100ms ease;
--transition-base: 150ms ease;
\`\`\`

## Keyboard

- Tab: move focus
- Enter/Space: activate
- Escape: cancel/close
- Arrow keys: navigate within components`;

  protected readonly a11yDocCode = `# Accessibility

## WCAG Requirements

- **AA Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Focus visible**: All interactive elements show focus
- **Keyboard operable**: Tab, Enter, Space, Escape, Arrow keys

## Component Rules

1. Form controls have associated labels
2. Error states include text descriptions
3. ARIA attributes complement (not replace) semantic HTML
4. Color is never the sole indicator of state

## Testing

- Test with screen reader (NVDA, VoiceOver)
- Navigate with keyboard only
- Verify contrast with devtools`;

  protected readonly typeScale = [
    { name: 'display', size: '28px', family: 'var(--font-display)', sample: 'RETRO/UI' },
    { name: 'h1', size: '24px', family: 'var(--font-display)', sample: 'Section Title' },
    { name: 'h2', size: '18px', family: 'var(--font-display)', sample: 'Subsection' },
    { name: 'body', size: '14px', family: 'var(--font-mono)', sample: 'Body text content' },
    { name: 'small', size: '12px', family: 'var(--font-mono)', sample: 'Muted helper text' },
    { name: 'label', size: '10px', family: 'var(--font-mono)', sample: 'LABEL' },
    { name: 'badge', size: '9px', family: 'var(--font-mono)', sample: 'BADGE' },
  ];

  protected readonly shadowTokens = [
    { name: '--shadow-sm', value: '1px 1px 0 0 var(--line)' },
    { name: '--shadow-md', value: '2px 2px 0 0 var(--line)' },
    { name: '--shadow-lg', value: '3px 3px 0 0 var(--line)' },
  ];

  protected readonly stateTokens = [
    { name: 'hover', color: 'var(--panel-alt)', desc: 'Mouse over interactive element' },
    { name: 'focus', color: 'var(--amber)', desc: 'Keyboard focus indicator' },
    { name: 'active', color: 'var(--sunken)', desc: 'Element being pressed' },
    { name: 'disabled', color: 'var(--muted)', desc: 'Interaction blocked (50% opacity)' },
    { name: 'loading', color: 'var(--cyan)', desc: 'Processing or awaiting response' },
    { name: 'error', color: 'var(--red)', desc: 'Invalid state or failure' },
  ];

  protected readonly availableThemes = APP_THEMES.map(t => ({
    name: t.name,
    label: t.label,
    swatches: [t.primitives.accent ?? t.primitives.success ?? '#ffb000', t.primitives.panel ?? '#d8d3c4', t.primitives.line ?? '#1a1a18'],
  }));

  protected cssVar(name: string): string {
    return `var(${name})`;
  }

  protected readonly sidebarCollapsed = signal(false);
  protected toggleSidebar(): void { this.sidebarCollapsed.update(v => !v); }
  protected readonly storySearch = signal('');
  protected readonly collapsedGroups = signal<Set<string>>(new Set());
  protected isGroupCollapsed(group: string): boolean { return this.collapsedGroups().has(group); }
  protected toggleGroup(group: string): void {
    this.collapsedGroups.update(set => {
      const next = new Set(set);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  }

  protected readonly storyGroups: StoryGroup[] = [
    {
      group: 'foundations',
      items: [
        { id: 'foundations-colors',   label: 'Colors' },
        { id: 'foundations-tokens',   label: 'Tokens' },
        { id: 'foundations-typography', label: 'Typography' },
        { id: 'foundations-spacing',  label: 'Spacing' },
        { id: 'foundations-borders',  label: 'Borders' },
        { id: 'foundations-shadows',  label: 'Shadows' },
        { id: 'foundations-states',   label: 'States' },
        { id: 'foundations-theme',    label: 'Theme & Mode' },
        { id: 'foundations-a11y',     label: 'Accessibility' },
        { id: 'foundations-motion',   label: 'Motion' },
        { id: 'foundations-composition', label: 'Composition' },
      ],
    },
    {
      group: 'containers',
      items: [
        { id: 'win',            label: 'Window Frame' },
        { id: 'retro-section',  label: 'Section' },
        { id: 'modal',          label: 'Modal' },
        { id: 'collapsible',    label: 'Collapsible' },
      ],
    },
    {
      group: 'form',
      items: [
        { id: 'button',         label: 'Button' },
        { id: 'button-group',   label: 'Button Group' },
        { id: 'segmented',      label: 'Segmented' },
        { id: 'input',          label: 'Input' },
        { id: 'select',         label: 'Select' },
        { id: 'range',          label: 'Range' },
        { id: 'checkbox',       label: 'Checkbox' },
        { id: 'kbd',            label: 'Kbd' },
        { id: 'toolbar-search', label: 'Toolbar Search' },
      ],
    },
    {
      group: 'display',
      items: [
        { id: 'stat',      label: 'Stat Box' },
        { id: 'progress',  label: 'Progress' },
        { id: 'ascii',     label: 'Ascii Bar' },
        { id: 'code',      label: 'Code Block' },
        { id: 'api-table',   label: 'API Table' },
        { id: 'retro-tabs', label: 'Tabs' },
      ],
    },
    {
      group: 'feedback',
      items: [
        { id: 'toast',        label: 'Toast' },
        { id: 'message',      label: 'Message' },
        { id: 'skeleton',     label: 'Skeleton' },
        { id: 'notif-item',   label: 'Notif Item' },
        { id: 'notif-stream', label: 'Notif Stream' },
      ],
    },
    {
      group: 'labels',
      items: [
        { id: 'pill',               label: 'Status Pill' },
        { id: 'dot',                label: 'Status Dot' },
        { id: 'tag',                label: 'Tag' },
        { id: 'priority-indicator', label: 'Priority Indicator' },
        { id: 'visibility-chip',    label: 'Visibility Chip' },
      ],
    },
    {
      group: 'data',
      items: [
        { id: 'retro-filter-bar',    label: 'Filter Bar' },        { id: 'retro-grid-row',      label: 'Grid Row' },
        { id: 'retro-expandable-row', label: 'Expandable Row' },
        { id: 'retro-paginator',     label: 'Paginator' },
        { id: 'retro-data-grid',     label: 'Data Grid' },      ],
    },
    {
      group: 'shell',
      items: [
        { id: 'retro-status-bar', label: 'Status Bar' },
      ],
    },
    
    {
      group: 'interactive',
      items: [
        { id: 'terminal', label: 'Terminal' },
      ],
    },
  ];

  constructor() {
    this.collapsedGroups.set(new Set(this.storyGroups.map(g => g.group)));
  }

  protected readonly activeStory = signal<StoryId>('foundations-colors');
  protected readonly activeTab   = signal<StoryTab>('preview');
  protected readonly activeDocTab = signal<DocTab>('api');
  protected readonly previewBackground = signal<PreviewBackground>('panel');
  protected readonly previewFullscreen = signal(false);
  protected readonly storyControlsCollapsed = signal(true);
  protected readonly previewBackgrounds: PreviewBackground[] = ['panel', 'light', 'dark'];
  protected readonly previewWidth = signal(960);
  protected readonly previewHeight = signal(560);
  protected readonly previewSizeLabel = computed(
    () => `${this.previewWidth()} x ${this.previewHeight()} px`,
  );

  protected readonly flatStoryItems = computed(() =>
    this.storyGroups.flatMap((group) =>
      group.items.map((item) => ({ ...item, group: group.group })),
    ),
  );

  protected readonly filteredStoryGroups = computed(() => {
    const query = this.storySearch().trim().toLowerCase();

    if (!query) {
      return this.storyGroups;
    }

    return this.storyGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          `${group.group} ${item.label} ${item.id}`.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.items.length > 0);
  });

  protected readonly totalStoryCount = computed(() => this.flatStoryItems().length);
  protected readonly filteredStoryCount = computed(() =>
    this.filteredStoryGroups().reduce((total, group) => total + group.items.length, 0),
  );
  protected readonly filteredStoryIds = computed(() =>
    this.filteredStoryGroups().flatMap((group) => group.items.map((item) => item.id)),
  );
  protected readonly activeStoryItem = computed(
    () => this.flatStoryItems().find((item) => item.id === this.activeStory()) ?? null,
  );
  protected readonly activeStoryLabel = computed(() => this.activeStoryItem()?.label ?? this.activeStory());
  protected readonly activeGroupLabel = computed(() => this.activeStoryItem()?.group ?? 'catalog');
  protected readonly activeBreadcrumb = computed(
    () => {
      const story = this.activeStory();
      if (story.startsWith('foundations')) {
        return `foundations / ${this.activeStoryLabel()}`;
      }
      return `catalog / ${this.activeGroupLabel()} / ${this.activeStoryLabel()}`;
    },
  );
  protected readonly activeStoryPath = computed(
    () => {
      const story = this.activeStory();
      if (story.startsWith('foundations')) {
        return `@retro-ui/docs/${story.replace('foundations-', '')}`;
      }
      return `@retro-ui/${this.activeStoryTitle().replace('.ts', '')}`;
    },
  );
  protected readonly activeStoryHint = computed(
    () => {
      const story = this.activeStory();
      if (story.startsWith('foundations')) {
        return 'foundation guide';
      }
      return `${this.activeGroupLabel()} component · shareable via ?story=${this.activeStory()}`;
    },
  );

  protected readonly activeStoryTitle = computed(() => {
    const map: Record<StoryId, string> = {
      'foundations-colors':     'foundations/colors.md',
      'foundations-tokens':     'foundations/tokens.md',
      'foundations-typography': 'foundations/typography.md',
      'foundations-spacing':    'foundations/spacing.md',
      'foundations-borders':    'foundations/borders.md',
      'foundations-shadows':    'foundations/shadows.md',
      'foundations-states':     'foundations/states.md',
      'foundations-theme':      'foundations/theme.md',
      'foundations-a11y':       'foundations/accessibility.md',
      'foundations-motion':     'foundations/motion.md',
      'foundations-composition':'foundations/composition.md',
      win:        'retro-window.component.ts',
      button:     'retro-button.component.ts',
      input:      'retro-input.component.ts',
      select:     'retro-select.component.ts',
      range:      'retro-range.component.ts',
      checkbox:   'retro-checkbox.component.ts',
      kbd:        'retro-kbd.component.ts',
      pill:       'status-pill.component.ts',
      dot:        'status-dot.component.ts',
      tag:        'retro-tag.component.ts',
      stat:       'stat-box.component.ts',
      progress:   'retro-progress.component.ts',
      ascii:      'ascii-bar.component.ts',
      toast:      'retro-toast.component.ts',
      message:    'retro-message.component.ts',
      skeleton:   'retro-skeleton.component.ts',
      modal:      'retro-modal.component.ts',
      collapsible:      'retro-collapsible.component.ts',
      code:             'retro-code.component.ts',
      'toolbar-search': 'toolbar-search.component.ts',      'notif-item':             'retro-notif-item.component.ts',
      'notif-stream':           'retro-notif-stream.component.ts',
      'priority-indicator':     'priority-indicator.component.ts',
      'visibility-chip':        'visibility-chip.component.ts',
      'retro-filter-bar':       'retro-filter-bar.component.ts',      'retro-grid-row':         'retro-grid-row.component.ts',
      'retro-expandable-row':   'retro-expandable-row.component.ts',
      'retro-paginator':        'retro-paginator.component.ts',
      'retro-status-bar':       'retro-status-bar.component.ts',
      'retro-data-grid':        'retro-data-grid.component.ts',      'terminal':               'retro-terminal.component.ts',
      'segmented':              'retro-segmented.component.ts',
      'button-group':           'retro-button-group.component.ts',
      'api-table':              'api-table.component.ts',
      'retro-tabs':             'retro-tabs.component.ts',
      'retro-section':          'retro-section.component.ts',
    };
    return map[this.activeStory()];
  });

  protected readonly activeDocMeta = computed<StoryDocMeta>(() => {
    const docs: Record<StoryId, StoryDocMeta> = {
      'foundations-colors': { selector: 'design.tokens', summary: 'Semantic color tokens mapped from theme primitives. Mode (light/dark) controls the surface mapping without touching components.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-tokens': { selector: 'design.tokens', summary: 'Primitive and semantic token layers — how theme values cascade to component styles.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-typography': { selector: 'design.typography', summary: 'Type scale, font families, and text token conventions used across all components.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-spacing': { selector: 'design.spacing', summary: 'Spacing scale and density conventions for consistent layout rhythm.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-borders': { selector: 'design.borders', summary: 'Border widths, radii, and edge treatment patterns.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-shadows': { selector: 'design.shadows', summary: 'Shadow tokens for depth, elevation, and glow effects.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-states': { selector: 'design.states', summary: 'Interactive state tokens — hover, focus, active, disabled conventions.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-theme': { selector: 'design.theme', summary: 'Theme architecture: primitives, semantic mapping, mode switching, and accent colors.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-a11y': { selector: 'design.a11y', summary: 'Accessibility guidelines, contrast requirements, keyboard navigation patterns, and ARIA conventions.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-motion': { selector: 'design.motion', summary: 'Transition tokens, animation principles, and reduced-motion support.', inputs: 0, outputs: 0, slots: 0 },
      'foundations-composition': { selector: 'design.composition', summary: 'Component composition patterns, content projection, and domain-free architecture.', inputs: 0, outputs: 0, slots: 0 },
      win: { selector: 'retro-window', summary: 'Janela base para shells, painéis e blocos do design system retrô.', inputs: 11, outputs: 4, slots: 3 },
      button: { selector: 'retro-button', summary: 'Botão principal da biblioteca com variantes, loading e link rendering.', inputs: 7, outputs: 1, slots: 1 },
      input: { selector: 'retro-input', summary: 'Campo de entrada retrô com prefixo, suffix, clearable e estados visuais.', inputs: 14, outputs: 2, slots: 0 },
      select: { selector: 'retro-select', summary: 'Select retrô para listas pequenas e configurações rápidas do sistema.', inputs: 7, outputs: 1, slots: 0 },
      range: { selector: 'retro-range', summary: 'Slider retrô para ajustes de valor contínuo com feedback imediato.', inputs: 9, outputs: 1, slots: 0 },
      checkbox: { selector: 'retro-checkbox', summary: 'Checkbox standalone com estados checked, readonly, invalid e indeterminate.', inputs: 9, outputs: 2, slots: 0 },
      kbd: { selector: 'retro-kbd', summary: 'Representação visual de teclas únicas ou combos de atalhos.', inputs: 1, outputs: 0, slots: 1 },
      pill: { selector: 'retro-status-pill', summary: 'Pill compacta para estados de workflow e status categóricos.', inputs: 3, outputs: 0, slots: 0 },
      dot: { selector: 'retro-status-dot', summary: 'Indicador pontual de estado com opção de pulso para atividade.', inputs: 4, outputs: 0, slots: 0 },
      tag: { selector: 'retro-tag', summary: 'Tag textual para labels, filtros e taxonomias do projeto.', inputs: 6, outputs: 1, slots: 0 },
      stat: { selector: 'retro-stat-box', summary: 'Caixa métrica para KPIs, contadores e resumos do dashboard.', inputs: 5, outputs: 0, slots: 0 },
      progress: { selector: 'retro-progress', summary: 'Barra de progresso com modos determinate e indeterminate.', inputs: 7, outputs: 0, slots: 0 },
      ascii: { selector: 'retro-ascii-bar', summary: 'Barra em estilo terminal usando caracteres ASCII configuráveis.', inputs: 5, outputs: 0, slots: 0 },
      toast: { selector: 'retro-toast', summary: 'Host visual para notificações emitidas pelo ToastService.', inputs: 2, outputs: 1, slots: 0 },
      message: { selector: 'retro-message', summary: 'Mensagem inline com severidade, variante e fechamento opcional.', inputs: 5, outputs: 1, slots: 1 },
      skeleton: { selector: 'retro-skeleton', summary: 'Placeholder visual para carregamento com wave, pulse ou estado estático.', inputs: 5, outputs: 0, slots: 0 },
      modal: { selector: 'retro-modal', summary: 'Modal standalone com overlay, backdrop close, teclado e slots nomeados.', inputs: 6, outputs: 1, slots: 2 },
      collapsible:      { selector: 'retro-collapsible',   summary: 'Bloco expansível para seções de documentação e conteúdo progressivo.', inputs: 3, outputs: 1, slots: 1 },
      code:             { selector: 'retro-code',          summary: 'Bloco de código com linguagem, borda opcional e ação de cópia.', inputs: 3, outputs: 0, slots: 0 },
      'toolbar-search': { selector: 'retro-toolbar-search',      summary: 'Campo de busca pré-configurado para toolbars — wraps RetroInput com prefix $ e clearable.', inputs: 2, outputs: 2, slots: 0 },      'notif-item':             { selector: 'retro-notif-item',         summary: 'Linha individual de notificação com badge de tipo, fonte, timestamp relativo e subtítulo.', inputs: 6, outputs: 1, slots: 0 },
      'notif-stream':           { selector: 'retro-notif-stream',        summary: 'Painel lateral de notificações com slide-in, ações em lote e projeção de NotifItem.', inputs: 1, outputs: 1, slots: 1 },
      'priority-indicator':     { selector: 'retro-priority-indicator',        summary: 'Indicador de prioridade em estilo terminal: !!, !, •, · ou — por nível.', inputs: 1, outputs: 0, slots: 0 },
      'visibility-chip':        { selector: 'retro-visibility-chip',           summary: 'Chip de visibilidade [PUB]/[PRIV]/[INT] com cor semântica por tipo.', inputs: 1, outputs: 0, slots: 0 },
      'retro-filter-bar':       { selector: 'retro-filter-bar',          summary: 'Barra de filtros genérica com single/multi-select, disabled por tab e slot [filter-end] para controles extras.', inputs: 5, outputs: 2, slots: 1 },      'retro-grid-row':         { selector: 'retro-grid-row',            summary: 'Linha genérica de grid — projeta qualquer filho como célula e herda --grid-cols.', inputs: 0, outputs: 0, slots: 1 },
      'retro-expandable-row':   { selector: 'retro-expandable-row',      summary: 'Linha expansível com painel de detalhe animado — herda --grid-cols e usa model(expanded).', inputs: 1, outputs: 1, slots: 2 },
      'retro-paginator':        { selector: 'retro-paginator',           summary: 'Barra de paginação com navegação de páginas, janela inteligente de números e seletor de page size.', inputs: 5, outputs: 2, slots: 0 },
      'retro-status-bar':       { selector: 'retro-status-bar',          summary: 'Barra de status fixa com versão, itens de sistema e atalhos de teclado.', inputs: 3, outputs: 0, slots: 0 },
      'retro-data-grid':        { selector: 'retro-data-grid',           summary: 'Grid de dados com sort, busca, filtros por checkbox, regras avançadas (column+op+value), redimensionamento de colunas e visibilidade dinâmica.', inputs: 18, outputs: 11, slots: 2 },      'terminal':               { selector: 'retro-terminal',            summary: 'Terminal interativo com histórico, tab completion, typewriter, cursor de bloco e comandos registráveis.', inputs: 7, outputs: 1, slots: 0 },
      'segmented':              { selector: 'retro-segmented',           summary: 'Seletor segmentado compatível com CVA — alterna entre opções de texto em layout row ou col.', inputs: 3, outputs: 1, slots: 0 },
      'button-group':           { selector: 'retro-button-group',        summary: 'Wrapper semântico que agrupa botões adjacentes removendo bordas internas duplicadas.', inputs: 0, outputs: 0, slots: 1 },
      'api-table':              { selector: 'retro-api-table',                 summary: 'Tabela de referência de API — renderiza cabeçalhos tipados (input/output/method) e projeta linhas via ng-content.', inputs: 3, outputs: 0, slots: 1 },
      'retro-tabs':             { selector: 'retro-tabs',                summary: 'Barra de abas estilo terminal com disabled, icon, badge por aba, navegação por teclado (← → Home End) e cinco variantes visuais.', inputs: 3, outputs: 1, slots: 1 },
      'retro-section':          { selector: 'retro-section',             summary: 'Contêiner estilo fieldset com label na borda — versão leve do window frame para agrupar conteúdo internamente.', inputs: 2, outputs: 0, slots: 1 },
    };

    return docs[this.activeStory()];
  });

  private readonly persistStateEffect = effect(() => {
    if (!this.hydrated()) {
      return;
    }

    localStorage.setItem(`${this.storagePrefix}.active`, this.activeStory());
    localStorage.setItem(
      `${this.storagePrefix}.ui`,
      JSON.stringify({
        activeTab: this.activeTab(),
        activeDocTab: this.activeDocTab(),
        previewBackground: this.previewBackground(),
        previewWidth: this.previewWidth(),
        previewHeight: this.previewHeight(),
        sidebarCollapsed: this.sidebarCollapsed(),
        storyControlsCollapsed: this.storyControlsCollapsed(),
      }),
    );

    for (const storyId of this.flatStoryItems().map((item) => item.id)) {
      localStorage.setItem(this.storyStorageKey(storyId), JSON.stringify(this.getStoryState(storyId)));
    }
  });

  private readonly syncFilteredSelectionEffect = effect(() => {
    if (!this.hydrated()) {
      return;
    }

    const visibleStories = this.filteredStoryIds();

    if (visibleStories.length === 0 || visibleStories.includes(this.activeStory())) {
      return;
    }

    this.activeStory.set(visibleStories[0]);
    this.activeTab.set('preview');
    this.previewFullscreen.set(false);
    this.syncUrlState();
  });

  private readonly expandActiveGroupEffect = effect(() => {
    const activeItem = this.activeStoryItem();
    if (!activeItem) return;

    this.collapsedGroups.update(set => {
      const next = new Set(set);
      next.delete(activeItem.group);
      return next;
    });
  });

  // ── Terminal ──────────────────────────────────────────────────────────────

  protected readonly termPrompt          = signal('user@devboard:~$ ');
  protected readonly termTypewriterSpeed = signal(16);

  protected readonly segOptions  = signal<string[]>(['alpha', 'beta', 'gamma']);
  protected readonly segValue    = signal('alpha');
  protected readonly segDir      = signal<'row' | 'col'>('row');
  protected readonly segAriaLabel = signal('demo options');

  protected readonly tabsVariant      = signal<WindowVariant>('default');
  protected readonly tabsCount        = signal(3);
  protected readonly tabsActivePreview = signal('tab-0');
  protected readonly tabsDisabledIdx  = signal(-1);
  protected readonly tabsShowIcon     = signal(false);
  protected readonly tabsShowBadge    = signal(false);

  private readonly TAB_ICONS   = ['▶', '⚙', '⚠', '◈', '✦', '◉', '▣', '⬡'];
  private readonly TAB_BADGES  = [null, 3, 12, 1, null, 7, 2, 5];

  protected readonly tabsPreviewItems = computed<RetroTab[]>(() => {
    const labels = ['overview', 'source', 'config', 'output', 'tests', 'history', 'deploy', 'logs'];
    return Array.from({ length: this.tabsCount() }, (_, i) => ({
      id:       `tab-${i}`,
      label:    labels[i] ?? `tab-${i + 1}`,
      icon:     this.tabsShowIcon() ? this.TAB_ICONS[i] : undefined,
      badge:    (this.tabsShowBadge() && this.TAB_BADGES[i] != null) ? this.TAB_BADGES[i]! : undefined,
      disabled: i === this.tabsDisabledIdx(),
    }));
  });

  protected readonly tabsDisabledOptions = computed(() => [
    { label: 'nenhuma', value: '-1' },
    ...Array.from({ length: this.tabsCount() }, (_, i) => ({
      label: `tab ${i + 1}`,
      value: String(i),
    })),
  ]);

  protected readonly tabsDisabledIdxStr = computed(() => String(this.tabsDisabledIdx()));

  protected readonly tabsActiveOptions = computed(() =>
    this.tabsPreviewItems()
      .filter(t => !t.disabled)
      .map(t => ({ label: t.label, value: t.id })),
  );

  protected readonly sectionVariant = signal<WindowVariant>('default');

  protected readonly termDemoCommands: TerminalCommand[] = [
    {
      name: 'ls',
      description: 'list items in the current directory',
      run: () => [
        { type: 'stdout', text: 'projects/   tasks/   config.json   README.md' },
      ],
    },
    {
      name: 'status',
      description: 'show system service status',
      run: async () => {
        await new Promise(r => setTimeout(r, 600));
        return [
          { type: 'success', text: '● api-server     running   pid 4821  uptime 3d 14h' },
          { type: 'success', text: '● task-worker    running   pid 4822  uptime 3d 14h' },
          { type: 'warn',    text: '▲ db-primary     degraded  1 of 3 nodes responding' },
          { type: 'stderr',  text: '✗ cache-service  stopped   last exit code 1' },
        ];
      },
    },
    {
      name: 'ping',
      description: 'send ICMP packets to a host',
      usage: 'host',
      run: async (args) => {
        const host = args[0] ?? 'devboard.local';
        await new Promise(r => setTimeout(r, 350));
        return [
          { type: 'muted',  text: `PING ${host}: 56 data bytes` },
          ...Array.from({ length: 4 }, (_, i) => ({
            type: 'stdout' as TerminalLineType,
            text: `64 bytes from ${host}: icmp_seq=${i + 1} ttl=64 time=${(Math.random() * 8 + 0.4).toFixed(2)} ms`,
          })),
          { type: 'muted', text: `--- ${host} ping statistics ---` },
          { type: 'success', text: '4 packets transmitted, 4 received, 0% packet loss' },
        ];
      },
    },
    {
      name: 'tasks',
      description: 'list recent tasks',
      usage: 'status?',
      run: async (args) => {
        await new Promise(r => setTimeout(r, 280));
        const filter = args[0];
        const items = [
          { s: 'done',   id: '#042', title: 'Fix retro-select keyboard nav' },
          { s: 'doing',  id: '#043', title: 'Build retro-terminal component' },
          { s: 'review', id: '#044', title: 'Add retro-sparkline' },
          { s: 'todo',   id: '#045', title: 'Write component docs' },
          { s: 'todo',   id: '#046', title: 'Configure CI pipeline' },
        ].filter(t => !filter || t.s === filter);
        if (!items.length) return [{ type: 'muted', text: `  no tasks matching '${filter}'` }];
        const typeMap: Record<string, TerminalLineType> = {
          done: 'success', doing: 'warn', review: 'warn', todo: 'stdout',
        };
        return [
          { type: 'muted', text: '  ID      STATUS    TITLE' },
          { type: 'muted', text: '  ' + '─'.repeat(42) },
          ...items.map(t => ({
            type: typeMap[t.s] ?? 'stdout' as TerminalLineType,
            text: `  ${t.id}   ${t.s.padEnd(8)}  ${t.title}`,
          })),
        ];
      },
    },
    {
      name: 'theme',
      description: 'get or set the active UI theme',
      usage: 'name?',
      run: (args) => {
        if (args[0]) {
          return [
            { type: 'warn',   text: `switching theme to '${args[0]}'...` },
            { type: 'success', text: `theme applied: ${args[0]}` },
          ];
        }
        return [{ type: 'stdout', text: `current theme: ${this.currentTheme()}` }];
      },
    },
  ];

  // ── Win ─────────────────────────────────────────────────────────────────

  protected readonly winTitle      = signal('~/devboard/example');
  protected readonly winSubtitle   = signal('window.frame');
  protected readonly winVariant    = signal<WindowVariant>('default');
  protected readonly winPadding    = signal<WindowPadding>('md');
  protected readonly winStatus     = signal<WindowStatus | ''>('');
  protected readonly winScrollable = signal(false);
  protected readonly winLoading    = signal(false);
  protected readonly winFooter     = signal('');

  // Controls — individual toggles that compute the [controls] array
  protected readonly winCtrlMinimize = signal(false);
  protected readonly winCtrlMaximize = signal(false);
  protected readonly winCtrlClose    = signal(false);
  protected readonly winControls = computed<WindowControl[]>(() => [
    ...(this.winCtrlMinimize() ? ['minimize' as WindowControl] : []),
    ...(this.winCtrlMaximize() ? ['maximize' as WindowControl] : []),
    ...(this.winCtrlClose()    ? ['close'    as WindowControl] : []),
  ]);

  protected readonly winCode = computed(() => {
    const controls = this.winControls();
    const allThree = controls.length === 3;
    const controlsLine = allThree
      ? `  [showControls]="true"`
      : controls.length > 0
        ? `  [controls]="['${controls.join("', '")}']"`
        : null;

    return [
      `<retro-window`,
      `  title="${this.winTitle()}"`,
      this.winSubtitle()              ? `  subtitle="${this.winSubtitle()}"` : null,
      this.winVariant() !== 'default' ? `  variant="${this.winVariant()}"` : null,
      this.winPadding() !== 'md'      ? `  padding="${this.winPadding()}"` : null,
      this.winStatus()                ? `  status="${this.winStatus()}"` : null,
      this.winScrollable()            ? `  [scrollable]="true"` : null,
      this.winLoading()               ? `  [loading]="true"` : null,
      controlsLine,
      `>`,
      `  <!-- body content -->`,
      this.winFooter() ? `  <div window-footer><!-- footer --></div>` : null,
      `</retro-window>`,
    ].filter((l) => l !== null).join('\n');
  });

  // ── Button ──────────────────────────────────────────────────────────────

  protected readonly btnLabel     = signal('deploy');
  protected readonly btnVariant   = signal<RetroButtonVariant>('primary');
  protected readonly btnTone      = signal<RetroButtonTone>('default');
  protected readonly btnSize      = signal<'sm' | 'md' | 'lg'>('md');
  protected readonly btnIcon      = signal('');
  protected readonly btnIconPos   = signal<RetroButtonIconPos>('left');
  protected readonly btnBadge     = signal('');
  protected readonly btnHref      = signal('');
  protected readonly btnDownload  = signal('');
  protected readonly btnDisabled  = signal(false);
  protected readonly btnLoading   = signal(false);
  protected readonly btnFullWidth = signal(false);
  protected readonly btnClicks    = signal(0);

  protected readonly btnCode = computed(() => {
    const lines = [
      `<retro-button`,
      this.btnVariant() !== 'primary'   ? `  variant="${this.btnVariant()}"` : null,
      this.btnTone()    !== 'default'   ? `  tone="${this.btnTone()}"` : null,
      this.btnSize()    !== 'md'        ? `  size="${this.btnSize()}"` : null,
      this.btnIcon()                    ? `  icon="${this.btnIcon()}"` : null,
      this.btnIcon() && this.btnIconPos() !== 'left' ? `  iconPos="${this.btnIconPos()}"` : null,
      this.btnBadge()                   ? `  badge="${this.btnBadge()}"` : null,
      this.btnHref()                    ? `  href="${this.btnHref()}"` : null,
      this.btnDownload()                ? `  download="${this.btnDownload()}"` : null,
      this.btnDisabled()                ? `  [disabled]="true"` : null,
      this.btnLoading()                 ? `  [loading]="true"` : null,
      this.btnFullWidth()               ? `  [fullWidth]="true"` : null,
      `  (pressed)="onClick()">`,
      `  ${this.btnLabel()}`,
      `</retro-button>`,
    ];
    return lines.filter((l) => l !== null).join('\n');
  });

  // ── Input ────────────────────────────────────────────────────────────────

  protected readonly inputValue        = signal('');
  protected readonly inputPlaceholder  = signal('grep projects…');
  protected readonly inputType         = signal<RetroInputType>('text');
  protected readonly inputSize         = signal<RetroInputSize>('md');
  protected readonly inputPrefix       = signal('$');
  protected readonly inputSuffix       = signal('');
  protected readonly inputDisabled     = signal(false);
  protected readonly inputReadonly     = signal(false);
  protected readonly inputInvalid      = signal(false);
  protected readonly inputErrorMessage = signal('campo obrigatório');
  protected readonly inputHelpText     = signal('');
  protected readonly inputClearable    = signal(true);
  protected readonly inputFullWidth    = signal(false);
  protected readonly inputTypes: RetroInputType[] = ['text', 'search', 'number', 'email', 'password'];
  protected readonly inputSizes: RetroInputSize[] = ['sm', 'md', 'lg'];
  protected readonly inputCode = computed(() =>
    [
      `<retro-input`,
      `  type="${this.inputType()}"`,
      this.inputSize() !== 'md'  ? `  size="${this.inputSize()}"` : null,
      this.inputPrefix()         ? `  prefix="${this.inputPrefix()}"` : null,
      this.inputSuffix()         ? `  suffix="${this.inputSuffix()}"` : null,
      `  placeholder="${this.inputPlaceholder()}"`,
      `  [value]="value"`,
      this.inputClearable()      ? `  [clearable]="true"` : null,
      this.inputReadonly()       ? `  [readonly]="true"` : null,
      this.inputInvalid()        ? `  [invalid]="true"` : null,
      this.inputInvalid() && this.inputErrorMessage()
        ? `  errorMessage="${this.inputErrorMessage()}"` : null,
      this.inputHelpText()       ? `  helpText="${this.inputHelpText()}"` : null,
      this.inputDisabled()       ? `  [disabled]="true"` : null,
      this.inputFullWidth()      ? `  [fullWidth]="true"` : null,
      `  (valueChange)="value = $event"`,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Checkbox ─────────────────────────────────────────────────────────────

  protected readonly selectValue = signal('classic-amber');
  protected readonly selectSize = signal<'sm' | 'md'>('md');
  protected readonly selectDisabled = signal(false);
  protected readonly selectOptions = [
    { label: 'Classic Amber', value: 'classic-amber' },
    { label: 'Phosphor Green', value: 'phosphor-green' },
    { label: 'CRT Blue', value: 'crt-blue' },
  ];
  protected readonly selectCode = computed(() =>
    [
      `<retro-select`,
      `  [options]="themeOptions"`,
      `  value="${this.selectValue()}"`,
      this.selectSize() !== 'md' ? `  size="${this.selectSize()}"` : null,
      this.selectDisabled() ? `  [disabled]="true"` : null,
      `  (valueChange)="theme = $event"`,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  protected readonly rangeValue = signal(42);
  protected readonly rangeMin = signal(0);
  protected readonly rangeMax = signal(100);
  protected readonly rangeStep = signal(1);
  protected readonly rangeDisabled = signal(false);
  protected readonly rangeCode = computed(() =>
    [
      `<retro-range`,
      `  [value]="${this.rangeValue()}"`,
      this.rangeMin() !== 0 ? `  [min]="${this.rangeMin()}"` : null,
      this.rangeMax() !== 100 ? `  [max]="${this.rangeMax()}"` : null,
      this.rangeStep() !== 1 ? `  [step]="${this.rangeStep()}"` : null,
      this.rangeDisabled() ? `  [disabled]="true"` : null,
      `  (valueChange)="value = $event"`,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  protected readonly checkboxChecked       = signal(false);
  protected readonly checkboxLabel         = signal('enable feature flag');
  protected readonly checkboxSize          = signal<RetroCheckboxSize>('md');
  protected readonly checkboxDisabled      = signal(false);
  protected readonly checkboxReadonly      = signal(false);
  protected readonly checkboxInvalid       = signal(false);
  protected readonly checkboxIndeterminate = signal(false);
  protected readonly checkboxCode = computed(() =>
    [
      `<retro-checkbox`,
      this.checkboxLabel()          ? `  label="${this.checkboxLabel()}"` : null,
      this.checkboxSize() !== 'md'  ? `  size="${this.checkboxSize()}"` : null,
      `  [checked]="checked"`,
      this.checkboxReadonly()       ? `  [readonly]="true"` : null,
      this.checkboxInvalid()        ? `  [invalid]="true"` : null,
      this.checkboxDisabled()       ? `  [disabled]="true"` : null,
      this.checkboxIndeterminate()  ? `  [indeterminate]="true"` : null,
      `  (checkedChange)="checked = $event"`,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Kbd ──────────────────────────────────────────────────────────────────

  protected readonly kbdComboMode = signal(false);
  protected readonly kbdSingleKey = signal('Esc');
  protected readonly kbdComboKeys = signal(['⌘', 'K']);
  protected readonly kbdComboInput = signal('⌘, K');
  protected readonly kbdCode = computed(() =>
    this.kbdComboMode()
      ? `<retro-kbd [keys]="['${this.kbdComboKeys().join("', '")}']" />`
      : `<retro-kbd>${this.kbdSingleKey()}</retro-kbd>`,
  );

  protected updateKbdCombo(raw: string): void {
    this.kbdComboInput.set(raw);
    this.kbdComboKeys.set(raw.split(',').map((k) => k.trim()).filter(Boolean));
  }

  // ── Pill ─────────────────────────────────────────────────────────────────

  protected readonly pillStatus   = signal('active');
  protected readonly pillSize     = signal<StatusPillSize>('sm');
  protected readonly pillStatuses = ['active', 'paused', 'completed', 'archived', 'cursando'] as const;
  protected readonly pillSizes: StatusPillSize[] = ['sm', 'md'];
  protected readonly pillCode = computed(
    () => `<retro-status-pill\n  status="${this.pillStatus()}"\n  size="${this.pillSize()}" />`,
  );

  // ── Dot ──────────────────────────────────────────────────────────────────

  protected readonly dotStatus   = signal('active');
  protected readonly dotSize     = signal<StatusDotSize>('sm');
  protected readonly dotPulse    = signal(false);
  protected readonly dotStatuses = ['active', 'paused', 'completed', 'archived', 'error', 'default'] as const;
  protected readonly dotSizes: StatusDotSize[] = ['xs', 'sm', 'md'];
  protected readonly dotCode = computed(() =>
    [
      `<retro-status-dot`,
      `  status="${this.dotStatus()}"`,
      `  size="${this.dotSize()}"`,
      this.dotPulse() ? `  [pulse]="true"` : null,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Tag ──────────────────────────────────────────────────────────────────

  protected readonly tagLabel     = signal('angular');
  protected readonly tagVariant   = signal<TagVariant>('default');
  protected readonly tagSize      = signal<TagSize>('md');
  protected readonly tagIcon      = signal('');
  protected readonly tagRemovable = signal(false);
  protected readonly tagDisabled  = signal(false);
  protected readonly tagVariants: TagVariant[] = ['default', 'primary', 'success', 'warning', 'danger'];
  protected readonly tagCode = computed(() =>
    [
      `<retro-tag`,
      `  label="${this.tagLabel()}"`,
      this.tagIcon()              ? `  icon="${this.tagIcon()}"` : null,
      this.tagVariant() !== 'default' ? `  variant="${this.tagVariant()}"` : null,
      this.tagSize() !== 'md'     ? `  size="${this.tagSize()}"` : null,
      this.tagRemovable()         ? `  [removable]="true"` : null,
      this.tagDisabled()          ? `  [disabled]="true"` : null,
      `  (removed)="onRemove()"`,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Stat ─────────────────────────────────────────────────────────────────

  protected readonly statLabel    = signal('Projects');
  protected readonly statValue    = signal<string | number>(6);
  protected readonly statSublabel = signal('4 active');
  protected readonly statTone     = signal<StatBoxTone>('default');
  protected readonly statTrend    = signal<StatBoxTrend | undefined>(undefined);
  protected readonly statTones: StatBoxTone[] = ['default', 'success', 'warning', 'danger'];
  protected readonly statTrends: Array<StatBoxTrend | 'none'> = ['none', 'up', 'down', 'neutral'];
  protected readonly statCode = computed(() =>
    [
      `<retro-stat-box`,
      `  label="${this.statLabel()}"`,
      `  value="${this.statValue()}"`,
      this.statSublabel()         ? `  sublabel="${this.statSublabel()}"` : null,
      this.statTone() !== 'default' ? `  tone="${this.statTone()}"` : null,
      this.statTrend()            ? `  trend="${this.statTrend()}"` : null,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Progress ─────────────────────────────────────────────────────────────

  protected readonly progressValue    = signal(65);
  protected readonly progressMode     = signal<ProgressMode>('determinate');
  protected readonly progressTone     = signal<ProgressTone>('default');
  protected readonly progressLabel    = signal('loading assets');
  protected readonly progressUnit     = signal('%');
  protected readonly progressShowVal  = signal(true);
  protected readonly progressAnimated = signal(false);
  protected readonly progressAriaLabel = signal('asset loading progress');
  protected readonly progressTones: ProgressTone[] = ['default', 'success', 'warning', 'danger'];
  protected readonly progressCode = computed(() => {
    const indet = this.progressMode() !== 'determinate';
    return [
      `<retro-progress`,
      indet ? `  mode="indeterminate"` : `  [value]="${this.progressValue()}"`,
      this.progressTone() !== 'default' ? `  tone="${this.progressTone()}"` : null,
      this.progressUnit() !== '%'       ? `  unit="${this.progressUnit()}"` : null,
      this.progressLabel()              ? `  label="${this.progressLabel()}"` : null,
      this.progressAriaLabel()          ? `  ariaLabel="${this.progressAriaLabel()}"` : null,
      !indet && this.progressShowVal()  ? `  [showValue]="true"` : null,
      !indet && this.progressAnimated() ? `  [animated]="true"` : null,
      `/>`,
    ].filter((l) => l !== null).join('\n');
  });

  // ── Ascii Bar ─────────────────────────────────────────────────────────────

  protected readonly asciiValue      = signal(42);
  protected readonly asciiWidth      = signal(20);
  protected readonly asciiFilledChar = signal('█');
  protected readonly asciiEmptyChar  = signal('░');
  protected readonly asciiShowValue  = signal(true);
  protected readonly asciiCode = computed(() =>
    [
      `<retro-ascii-bar`,
      `  [value]="${this.asciiValue()}"`,
      this.asciiWidth() !== 20       ? `  [width]="${this.asciiWidth()}"` : null,
      this.asciiFilledChar() !== '█' ? `  filledChar="${this.asciiFilledChar()}"` : null,
      this.asciiEmptyChar()  !== '░' ? `  emptyChar="${this.asciiEmptyChar()}"` : null,
      !this.asciiShowValue()         ? `  [showValue]="false"` : null,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Toast ────────────────────────────────────────────────────────────────

  protected readonly toastMessage     = signal('TaskSyncFailed');
  protected readonly toastType        = signal<'event' | 'success' | 'warning' | 'error'>('event');
  protected readonly toastWithDetails = signal(true);
  protected readonly toastLife        = signal(4200);
  protected readonly toastSticky      = signal(false);
  protected readonly toastPosition    = signal<ToastPosition>('bottom-right');
  protected readonly toastMaxVisible  = signal(5);
  protected readonly toastTypes       = ['event', 'success', 'warning', 'error'] as const;
  protected readonly toastPositions: ToastPosition[] = [
    'bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center',
  ];

  protected readonly toastDetailCode        = signal('ERR_503');
  protected readonly toastDetailService     = signal('notifications-api');
  protected readonly toastDetailHttp        = signal('503 Service Unavailable');
  protected readonly toastDetailTrace       = signal('trace_d41ab2');
  protected readonly toastDetailStack       = signal(
    `System.Net.Http.HttpRequestException: Connection refused\nat webhook.PostAsync(uri)\nat NotificationsConsumer.Handle(TaskCompleted)\nat MassTransit.Consumer.Dispatch()`,
  );
  protected readonly toastDetailActionLabel = signal('OPEN IN JAEGER →');
  protected readonly toastDetailActionUrl   = signal('#');

  protected readonly toastCode = computed(() => {
    const sticky      = this.toastSticky();
    const life        = this.toastLife();
    const lifeSuffix  = sticky ? `, 0  // sticky` : life !== 3400 ? `, ${life}` : '';
    return [
      `<retro-toast`,
      this.toastPosition() !== 'bottom-right' ? `  position="${this.toastPosition()}"` : null,
      this.toastMaxVisible() !== 5 ? `  [maxVisible]="${this.toastMaxVisible()}"` : null,
      `  (toastClosed)="onToastClosed($event)"`,
      `/>`,
      ``,
      `// inject the service anywhere in your component`,
      `protected readonly toast = inject(ToastService);`,
      ``,
      `this.toast.${this.toastType()}('${this.toastMessage()}'${lifeSuffix ? `, details${lifeSuffix}` : ''});`,
      this.toastWithDetails() ? `` : null,
      this.toastWithDetails() ? `// with structured details (expands inline)` : null,
      this.toastWithDetails() ? `this.toast.error('${this.toastMessage()}', {` : null,
      this.toastWithDetails() && this.toastDetailCode()    ? `  code: '${this.toastDetailCode()}',` : null,
      this.toastWithDetails() && this.toastDetailService() ? `  service: '${this.toastDetailService()}',` : null,
      this.toastWithDetails() && this.toastDetailHttp()    ? `  http: '${this.toastDetailHttp()}',` : null,
      this.toastWithDetails() && this.toastDetailTrace()   ? `  trace: '${this.toastDetailTrace()}',` : null,
      this.toastWithDetails() && this.toastDetailStack()   ? `  stack: \`...\`,` : null,
      this.toastWithDetails() && this.toastDetailActionLabel() ? `  action: { label: '${this.toastDetailActionLabel()}', url: '${this.toastDetailActionUrl()}' },` : null,
      this.toastWithDetails() ? `}${lifeSuffix ? `, ${sticky ? 0 : life}` : ''});` : null,
    ].filter((l) => l !== null).join('\n');
  });

  protected fireToast(): void {
    const duration = this.toastLife();
    const sticky   = this.toastSticky();
    const details  = this.toastWithDetails() ? {
      code:    this.toastDetailCode()    || undefined,
      service: this.toastDetailService() || undefined,
      http:    this.toastDetailHttp()    || undefined,
      trace:   this.toastDetailTrace()   || undefined,
      stack:   this.toastDetailStack()   || undefined,
      action:  this.toastDetailActionLabel()
        ? { label: this.toastDetailActionLabel(), url: this.toastDetailActionUrl() }
        : undefined,
    } : undefined;
    this.toastService.show(this.toastMessage(), this.toastType(), duration, details, sticky);
  }

  // ── Message ───────────────────────────────────────────────────────────────

  protected readonly msgSeverity  = signal<MessageSeverity>('info');
  protected readonly msgVariant   = signal<MessageVariant>('filled');
  protected readonly msgText      = signal('Pipeline concluído com 3 artefatos publicados.');
  protected readonly msgClosable  = signal(true);
  protected readonly msgIcon      = signal('');
  protected readonly msgSeverities: MessageSeverity[] = ['info', 'success', 'warning', 'error'];
  protected readonly msgVariants: MessageVariant[]    = ['filled', 'outlined', 'ghost'];
  protected readonly msgCode = computed(() =>
    [
      `<retro-message`,
      `  severity="${this.msgSeverity()}"`,
      this.msgVariant() !== 'filled'    ? `  variant="${this.msgVariant()}"` : null,
      this.msgText()                    ? `  text="${this.msgText()}"` : null,
      this.msgIcon()                    ? `  icon="${this.msgIcon()}"` : null,
      this.msgClosable()                ? `  [closable]="true"` : null,
      `  (msgClosed)="onMsgClosed()"`,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Skeleton ──────────────────────────────────────────────────────────────

  protected readonly skelWidth     = signal('100%');
  protected readonly skelHeight    = signal('14px');
  protected readonly skelShape     = signal<SkeletonShape>('rectangle');
  protected readonly skelAnimation = signal<SkeletonAnimation>('wave');
  protected readonly skelCount     = signal(1);
  protected readonly skelAriaLabel = signal('');
  protected readonly skelCode = computed(() =>
    [
      `<retro-skeleton`,
      this.skelWidth()  !== '100%'       ? `  width="${this.skelWidth()}"` : null,
      this.skelHeight() !== '14px'       ? `  height="${this.skelHeight()}"` : null,
      this.skelShape()  !== 'rectangle'  ? `  shape="${this.skelShape()}"` : null,
      this.skelAnimation() !== 'wave'    ? `  animation="${this.skelAnimation()}"` : null,
      this.skelCount() !== 1             ? `  [count]="${this.skelCount()}"` : null,
      this.skelAriaLabel()               ? `  ariaLabel="${this.skelAriaLabel()}"` : null,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Modal ────────────────────────────────────────────────────────────────

  protected readonly modalOpen            = signal(false);
  protected readonly modalTitle           = signal('new-project.form');
  protected readonly modalSubtitle        = signal('component.preview');
  protected readonly modalSize            = signal<'sm' | 'md' | 'lg'>('md');
  protected readonly modalSizes           = ['sm', 'md', 'lg'] as const;
  protected readonly modalCloseOnBackdrop = signal(true);
  protected readonly modalShowCloseButton = signal(true);
  protected readonly modalCode = computed(() =>
    [
      `<retro-modal`,
      `  [open]="isOpen"`,
      `  title="${this.modalTitle()}"`,
      this.modalSubtitle() ? `  subtitle="${this.modalSubtitle()}"` : null,
      `  size="${this.modalSize()}"`,
      `  [closeOnBackdrop]="${this.modalCloseOnBackdrop()}"`,
      `  [showCloseButton]="${this.modalShowCloseButton()}"`,
      `  (closed)="close()">`,
      `  <!-- [modal-body] / [modal-actions] -->`,
      `</retro-modal>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Collapsible ───────────────────────────────────────────────────────────

  protected readonly collapsibleTitle     = signal('section.details');
  protected readonly collapsibleCollapsed = signal(false);
  protected readonly collapsibleDisabled  = signal(false);
  protected readonly collapsibleCode = computed(() =>
    [
      `<retro-collapsible`,
      `  title="${this.collapsibleTitle()}"`,
      this.collapsibleCollapsed() ? `  [(collapsed)]="isCollapsed"` : null,
      this.collapsibleDisabled()  ? `  [disabled]="true"` : null,
      `>`,
      `  <!-- content -->`,
      `</retro-collapsible>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Code Block ────────────────────────────────────────────────────────────

  protected readonly codeLanguage  = signal('typescript');
  protected readonly codeFramed    = signal(true);
  protected readonly codeLanguages = ['typescript', 'angular', 'bash', 'json', ''] as const;
  protected readonly codeExamples: Record<string, string> = {
    typescript: `@Component({
  standalone: true,
  imports: [RetroCodeComponent],
  template: \`
    <retro-code
      [code]="snippet"
      language="typescript"
    />
  \`,
})
export class MyPage {
  readonly snippet = 'const x = 42;';
}`,
    angular: `<retro-window title="~/my-feature">
  <retro-input
    prefix="$"
    placeholder="grep..."
    [clearable]="true"
    (valueChange)="onSearch($event)"
  />
  <retro-button
    variant="primary"
    [loading]="saving()"
    (pressed)="save()">
    save
  </retro-button>
</retro-window>`,
    bash: `$ ng generate component shared/ui/my-component \\
    --standalone \\
    --change-detection OnPush

CREATE src/app/shared/ui/my-component/...
✔  BUILD SUCCESS`,
    json: `{
  "name": "devboard-ui",
  "version": "0.1.0",
  "components": [
    "RetroButton",
    "RetroInput",
    "RetroCode"
  ]
}`,
    '': `// sem linguagem definida
const answer = 42;`,
  };
  protected readonly codeExample = computed(
    () => this.codeExamples[this.codeLanguage()] ?? this.codeExamples['typescript'],
  );
  protected readonly codeStoryCode = computed(() =>
    [
      `<retro-code`,
      `  [code]="snippet"`,
      this.codeLanguage() ? `  language="${this.codeLanguage()}"` : null,
      !this.codeFramed()  ? `  [framed]="false"` : null,
      `/>`,
    ].filter((l) => l !== null).join('\n'),
  );

  // ── Toolbar Search ───────────────────────────────────────────────────────

  protected readonly toolbarSearchValue       = signal('');
  protected readonly toolbarSearchPlaceholder = signal('search...');

  protected readonly toolbarSearchCode = computed(() =>
    [
      `<retro-toolbar-search`,
      this.toolbarSearchPlaceholder() !== 'search...' ? `  placeholder="${this.toolbarSearchPlaceholder()}"` : null,
      `  [value]="searchQuery"`,
      `  (valueChange)="searchQuery = $event"`,
      `  (cleared)="searchQuery = ''"`,
      `/>`,
    ].filter(l => l !== null).join('\n'),
  );

  
  // ── Notif Item ────────────────────────────────────────────────────────────

  protected readonly notifItemNow      = new Date();
  protected readonly notifItemType     = signal<NotifType>('event');
  protected readonly notifItemSource   = signal<NotifSource>('webhook');
  protected readonly notifItemTitle    = signal('TaskCompleted → webhook slack');
  protected readonly notifItemSubtitle = signal('proj_02 · t4 entregou 200 OK em 142ms');
  protected readonly notifItemRead     = signal(false);

  protected readonly notifItemCode = computed(() =>
    [
      `<retro-notif-item`,
      `  type="${this.notifItemType()}"`,
      `  source="${this.notifItemSource()}"`,
      `  [timestamp]="item.timestamp"`,
      `  title="${this.notifItemTitle()}"`,
      this.notifItemSubtitle() ? `  subtitle="${this.notifItemSubtitle()}"` : null,
      this.notifItemRead()     ? `  [read]="true"` : null,
      `  (itemRead)="markRead(item.id)"`,
      `/>`,
    ].filter(l => l !== null).join('\n'),
  );

  // ── Notif Stream ──────────────────────────────────────────────────────────

  protected readonly notifStreamOpen = signal(false);

  protected readonly notifStreamCode = `<retro-notif-stream [open]="streamOpen" (closed)="streamOpen = false">
  @for (item of notifService.items(); track item.id) {
    <retro-notif-item
      [type]="item.type"
      [source]="item.source"
      [timestamp]="item.timestamp"
      [title]="item.title"
      [subtitle]="item.subtitle"
      [read]="item.read"
      (itemRead)="notifService.markRead(item.id)"
    />
  }
</retro-notif-stream>`;

  protected addSampleNotif(): void {
    const samples: Array<Parameters<NotifService['add']>[0]> = [
      { type: 'event', source: 'webhook', title: 'TaskCompleted → webhook slack', subtitle: 'proj_02 · t4 entregou 200 OK em 142ms' },
      { type: 'build', source: 'email',   title: 'CI: signals-kanban verde',      subtitle: 'pipeline #412 concluído em 3m 22s' },
      { type: 'alert', source: 'email',   title: 'DLQ threshold: devboard-notif', subtitle: "queue 'notif.dlq' atingiu 3 mensagens" },
    ];
    this.notifService.add(samples[this.notifService.totalCount() % samples.length]);
  }

  // ── Priority Indicator ────────────────────────────────────────────────────

  protected readonly priorityKnob = signal<Priority>('high');

  // ── Visibility Chip ───────────────────────────────────────────────────────

  protected readonly visibilityKnob = signal<Visibility>('public');

  // ── Retro Filter Bar ─────────────────────────────────────────────────────

  protected readonly filterBarActive     = signal('all');
  protected readonly filterBarMulti      = signal(false);
  protected readonly filterBarActiveKeys = signal<string[]>(['todo', 'doing']);
  protected readonly filterBarTabs: FilterTab[] = [
    { key: 'all',    label: 'ALL' },
    { key: 'todo',   label: 'TODO',   count: 2 },
    { key: 'doing',  label: 'DOING',  count: 2 },
    { key: 'review', label: 'REVIEW', count: 1 },
    { key: 'done',   label: 'DONE',   count: 3, disabled: false },
  ];

  // ── Retro Status Bar ──────────────────────────────────────────────────────

  protected readonly statusBarItems: StatusItem[] = [
    { label: 'YARP gateway', value: ':8080' },
    { label: 'services', value: 4 },
    { label: 'pg instances', value: 4 },
    { label: 'broker', value: 1 },
  ];
  protected readonly statusBarShortcuts: StatusShortcut[] = [
    { key: 'N', label: 'new' },
    { key: 'G', label: 'dashboard' },
    { key: 'A', label: 'arch' },
    { key: '⌘ K', label: 'search' },
  ];

  // ── Task Row & Data Grid ──────────────────────────────────────────────────

  private readonly _initialTasks: any[] = [
    { id: 't1',  index: 1,  priority: 'critical', status: 'done',   title: 'Setup inicial do repositório',    labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 86400000)   },
    { id: 't2',  index: 2,  priority: 'critical', status: 'done',   title: 'Definir contratos de API',        labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 172800000)  },
    { id: 't3',  index: 3,  priority: 'high',     status: 'done',   title: 'Dockerfile + compose',            labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 259200000)  },
    { id: 't4',  index: 4,  priority: 'critical', status: 'doing',  title: 'Implementar endpoint principal',  labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 345600000)  },
    { id: 't5',  index: 5,  priority: 'high',     status: 'doing',  title: 'Testes unitários do domínio',     labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 432000000)  },
    { id: 't6',  index: 6,  priority: 'low',      status: 'todo',   title: 'Documentação README',             labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 518400000)  },
    { id: 't7',  index: 7,  priority: 'high',     status: 'todo',   title: 'CI/CD pipeline GitHub Actions',   labels: ['devops'],   dueDate: null, updatedAt: new Date(Date.now() - 604800000)  },
    { id: 't8',  index: 8,  priority: 'critical', status: 'review', title: 'Revisão de segurança',            labels: ['security'], dueDate: null, updatedAt: new Date(Date.now() - 691200000)  },
    { id: 't9',  index: 9,  priority: 'medium',   status: 'todo',   title: 'Implementar cache Redis',         labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 777600000)  },
    { id: 't10', index: 10, priority: 'low',      status: 'todo',   title: 'Configurar Grafana',              labels: ['devops'],   dueDate: null, updatedAt: new Date(Date.now() - 864000000)  },
    { id: 't11', index: 11, priority: 'high',     status: 'doing',  title: 'Rate limiting no gateway',        labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 950400000)  },
    { id: 't12', index: 12, priority: 'medium',   status: 'review', title: 'Adicionar testes de integração',  labels: ['qa'],       dueDate: null, updatedAt: new Date(Date.now() - 1036800000) },
    { id: 't13', index: 13, priority: 'low',      status: 'done',   title: 'Documentar endpoints OpenAPI',    labels: ['docs'],     dueDate: null, updatedAt: new Date(Date.now() - 1123200000) },
    { id: 't14', index: 14, priority: 'critical', status: 'todo',   title: 'Migração schema v2',              labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 1209600000) },
    { id: 't15', index: 15, priority: 'none',     status: 'todo',   title: 'Refactor módulo de auth',         labels: ['backend'],  dueDate: null, updatedAt: new Date(Date.now() - 1296000000) },
  ];

  protected readonly demoTasksSource = signal<any[]>([...this._initialTasks]);

  protected readonly dataGridTable = createRetroTable({
    rows: this.demoTasksSource,
    searchFields: ['title', 'status', 'priority'],
    filterFields: ['status', 'priority'],
    pageSize: 5,
    pageSizeOptions: [5, 10, 15],
  });

  protected readonly taskGridColumns: GridColumn[] = [
    { key: 'exp',     label: '',        width: '28px',            align: 'center', noResize: true },
    { key: '#',       label: '#',       width: '30px',            align: 'right',  sortable: true  },
    { key: 'pri',     label: '',        width: '28px',            align: 'center', noResize: true },
    { key: 'status',  label: 'status',  width: '80px',            sortable: true,  filterable: true },
    { key: 'title',   label: 'title',   width: 'minmax(0, 1fr)', sortable: true                   },
    { key: 'labels',  label: 'labels',  width: '110px'                                            },
    { key: 'updated', label: 'updated', width: '76px',            sortable: true                   },
    { key: 'del',     label: '',        width: '28px',            align: 'center', noResize: true },
  ];

  private _taskCounter = 16;
  private readonly _addTitles = [
    'Implementar cache Redis', 'Configurar monitoramento Grafana', 'Migração schema v3',
    'Lint e formatação do projeto', 'Rate limiting no gateway', 'Adicionar testes e2e',
    'Documentar endpoints gRPC',
  ];
  private readonly _addStatuses: string[] = ['todo', 'doing', 'review'];
  private readonly _addPriorities: string[] = ['critical', 'high', 'medium', 'low'];

  protected addDemoTask(): void {
    const idx = this._taskCounter++;
    this.demoTasksSource.update(tasks => [...tasks, {
      id: `t${idx}`, index: idx,
      priority: this._addPriorities[idx % this._addPriorities.length],
      status:   this._addStatuses[idx % this._addStatuses.length],
      title:    this._addTitles[idx % this._addTitles.length],
      labels:   ['backend'], dueDate: null, updatedAt: new Date(),
    }]);
  }

  protected resetDemoTasks(): void {
    this.demoTasksSource.set([...this._initialTasks]);
    this.dataGridTable.clearAllFilters();
    this.dataGridTable.collapseAll();
  }

  protected deleteTask(id: string): void {
    this.demoTasksSource.update(tasks => tasks.filter(t => t.id !== id));
  }

  // ── Expandable Row ────────────────────────────────────────────────────────

  protected readonly expandableRowExpanded = signal(false);
  protected readonly expandableRowExpandOnClick = signal(false);

  // ── Paginator ─────────────────────────────────────────────────────────────

  protected readonly paginatorDemoPage = signal(0);
  protected readonly paginatorDemoTotal = signal(50);
  protected readonly paginatorDemoPageSize = signal(10);

  // ── Usage snippet ─────────────────────────────────────────────────────────

  protected readonly usageCodeSnippet = `// standalone component import
import { Component } from '@angular/core';
import {
  RetroButtonComponent,
  RetroInputComponent,
  RetroWindowComponent,
  StatBoxComponent,
  StatusPillComponent,
} from '@retro-ui';

@Component({
  standalone: true,
  imports: [RetroButtonComponent, RetroInputComponent, RetroWindowComponent],
  template: \`
    <retro-window title="~/my-feature">
      <retro-input prefix="$" placeholder="grep..." [clearable]="true"
        (valueChange)="onSearch($event)" />
      <retro-button variant="primary" [loading]="saving()" (pressed)="save()">
        save
      </retro-button>
    </retro-window>
  \`,
})
export class MyFeaturePage {}`;

  protected readonly componentDocs: Record<StoryId, ComponentDoc> = {
    'foundations-colors':     { badges: ['standalone'], description: 'Semantic color tokens mapped from theme primitives. Mode (light/dark) controls the surface mapping without touching components.', a11y: [], practices: [] },
    'foundations-tokens':     { badges: ['standalone'], description: 'Primitive and semantic token layers — how theme values cascade to component styles.', a11y: [], practices: [] },
    'foundations-typography': { badges: ['standalone'], description: 'Type scale, font families, and text token conventions used across all components.', a11y: [], practices: [] },
    'foundations-spacing':    { badges: ['standalone'], description: 'Spacing scale and density conventions for consistent layout rhythm.', a11y: [], practices: [] },
    'foundations-borders':    { badges: ['standalone'], description: 'Border widths, radii, and edge treatment patterns.', a11y: [], practices: [] },
    'foundations-shadows':    { badges: ['standalone'], description: 'Shadow tokens for depth, elevation, and glow effects.', a11y: [], practices: [] },
    'foundations-states':     { badges: ['standalone'], description: 'Interactive state tokens — hover, focus, active, disabled conventions.', a11y: [], practices: [] },
    'foundations-theme':      { badges: ['standalone'], description: 'Theme architecture: retro-classico identity with light/dark modes and accent colors. Primitives, semantic mapping, and mode switching.', a11y: [], practices: [] },
    'foundations-a11y':       { badges: ['standalone'], description: 'Accessibility guidelines, contrast requirements, keyboard navigation patterns, and ARIA conventions.', a11y: [], practices: [] },
    'foundations-motion':     { badges: ['standalone'], description: 'Transition tokens, animation principles, and reduced-motion support for purposeful UI motion.', a11y: [], practices: [] },
    'foundations-composition':{ badges: ['standalone'], description: 'Component composition patterns, content projection over props, and domain-free architecture guidelines.', a11y: [], practices: [] },
    win: {
      badges: ['standalone', 'layout', 'onpush', 'composable'],
      description: 'Janela base para shells, painéis e blocos do design system retrô. Suporta variantes visuais, controles de janela, status, scroll e footer projetável.',
      inputs: [
        { name: 'title', type: 'string', default: "''", desc: 'Título exibido na barra de janela.', required: true },
        { name: 'subtitle', type: 'string', default: "''", desc: 'Subtítulo opcional ao lado do título.' },
        { name: 'variant', type: 'WindowVariant', default: "'default'", desc: 'Variante visual: default, terminal, system, alert, ghost.' },
        { name: 'padding', type: 'WindowPadding', default: "'md'", desc: 'Espaçamento interno: none, sm, md, lg.' },
        { name: 'status', type: 'WindowStatus | null', default: 'null', desc: 'Status exibido no canto: idle, active, loading, error.' },
        { name: 'statusLabel', type: 'string', default: "''", desc: 'Label acessível para o status.' },
        { name: 'controls', type: 'WindowControl[]', default: '[]', desc: 'Botões de controle: minimize, maximize, close.' },
        { name: 'scrollable', type: 'boolean', default: 'false', desc: 'Habilita scroll interno quando o conteúdo excede a altura.' },
        { name: 'maxHeight', type: 'number', default: '340', desc: 'Altura máxima quando scrollable está ativo.' },
        { name: 'loading', type: 'boolean', default: 'false', desc: 'Substitui o conteúdo por um skeleton de carregamento.' },
        { name: 'showControls', type: 'boolean', default: 'false', desc: 'Atalho para exibir os três controles padrão.' },
        { name: 'closed', type: 'boolean', default: 'false', desc: 'Controla estado fechado da janela (two-way via model).' },
        { name: 'icon', type: 'string', default: "''", desc: 'Ícone exibido antes do título.' },
      ],
      outputs: [
        { name: 'minimizeClick', type: 'void', default: '-', desc: 'Emitido ao clicar no botão minimizar.' },
        { name: 'maximizeClick', type: 'void', default: '-', desc: 'Emitido ao clicar no botão maximizar.' },
        { name: 'closeClick', type: 'void', default: '-', desc: 'Emitido ao clicar no botão fechar.' },
        { name: 'closedChange', type: 'boolean', default: '-', desc: 'Emitido ao alterar o estado closed (two-way via model).' },
      ],
      slots: '<code>[window-actions]</code> para ações no cabeçalho. <code>[window-footer]</code> para rodapé fixo.',
      a11y: [
        'Controles de janela possuem <code>aria-label</code> descritivo.',
        'Foco visível nos botões de controle via <code>--focus-ring</code>.',
      ],
      practices: [
        'Use <code>variant="terminal"</code> para painéis de log ou shell.',
        'Use <code>variant="alert"</code> para modais de confirmação ou erros.',
        'Evite aninhar múltiplas janelas — prefira modais para diálogos.',
      ],
    },

    button: {
      badges: ['standalone', 'interactive', 'onpush'],
      description: 'Botão principal da biblioteca com variantes (primary, secondary, ghost), tons semânticos, loading, ícone e link rendering.',
      inputs: [
        { name: 'variant', type: 'RetroButtonVariant', default: "'primary'", desc: 'Estrutura visual: primary, secondary, ghost.' },
        { name: 'tone', type: 'RetroButtonTone', default: "'default'", desc: 'Cor semântica: default, success, warning, danger.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Tamanho do botão.' },
        { name: 'icon', type: 'string', default: "''", desc: 'Caractere/glyph exibido como ícone.' },
        { name: 'iconPos', type: "'left' | 'right'", default: "'left'", desc: 'Posição do ícone relativo ao texto.' },
        { name: 'badge', type: 'string', default: "''", desc: 'Texto curto exibido ao lado do label.' },
        { name: 'href', type: 'string', default: "''", desc: 'URL para renderizar como âncora (<a>) ao invés de <button>.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", desc: 'Tipo do botão nativo.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita interação e aplica estilo visual.' },
        { name: 'loading', type: 'boolean', default: 'false', desc: 'Substitui o conteúdo por um spinner.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Ocupa 100% da largura do container.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [
        { name: 'pressed', type: 'MouseEvent', default: '-', desc: 'Emitido ao clicar no botão (não emitido se disabled ou loading).' },
        { name: 'focused', type: 'FocusEvent', default: '-', desc: 'Emitido ao receber foco.' },
        { name: 'blurred', type: 'FocusEvent', default: '-', desc: 'Emitido ao perder foco.' },
      ],
      cva: ['Não implementa CVA — usa output para eventos.'],
      a11y: [
        '<code>disabled</code> desabilita interação real, não apenas visual.',
        'Estado <code>loading</code> adiciona <code>aria-busy="true"</code>.',
        'Foco visível com <code>--focus-ring</code>.',
      ],
      practices: [
        'Use <code>variant="ghost"</code> para ações secundárias ou de cancelamento.',
        'Use <code>tone="danger"</code> com <code>variant="secondary"</code> para ações destrutivas.',
        'Evite múltiplos botões <code>primary</code> no mesmo grupo.',
      ],
    },

    input: {
      badges: ['standalone', 'form', 'cva', 'onpush', 'a11y'],
      description: 'Campo de entrada retrô com prefixo, sufixo, clearable, estados visuais (invalid, disabled, readonly) e suporte a CVA.',
      inputs: [
        { name: 'type', type: 'RetroInputType', default: "'text'", desc: 'Tipo do input: text, search, number, email, password.' },
        { name: 'size', type: 'RetroInputSize', default: "'md'", desc: 'Tamanho: sm, md, lg.' },
        { name: 'prefix', type: 'string', default: "''", desc: 'Texto ou glyph exibido antes do valor.' },
        { name: 'suffix', type: 'string', default: "''", desc: 'Texto ou glyph exibido após o valor.' },
        { name: 'placeholder', type: 'string', default: "''", desc: 'Placeholder do campo.' },
        { name: 'value', type: 'string', default: "''", desc: 'Valor atual do campo.' },
        { name: 'clearable', type: 'boolean', default: 'false', desc: 'Exibe botão para limpar o valor.' },
        { name: 'readonly', type: 'boolean', default: 'false', desc: 'Campo somente leitura.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita interação.' },
        { name: 'invalid', type: 'boolean', default: 'false', desc: 'Aplica estilo visual de erro.' },
        { name: 'errorMessage', type: 'string', default: "''", desc: 'Mensagem de erro exibida abaixo do campo.' },
        { name: 'helpText', type: 'string', default: "''", desc: 'Texto auxiliar exibido abaixo do campo.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Ocupa 100% da largura do container.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'string', default: '-', desc: 'Emite o novo valor a cada mudança.' },
        { name: 'cleared', type: 'void', default: '-', desc: 'Emitido ao limpar o campo via botão clear.' },
      ],
      cva: ['Suporta <code>ngModel</code> e <code>formControl</code> via ControlValueAccessor.'],
      a11y: [
        '<code>aria-invalid</code> sincronizado com estado <code>invalid</code>.',
        '<code>aria-describedby</code> associado a <code>errorMessage</code> e <code>helpText</code>.',
        'Foco visível com <code>--focus-ring</code>.',
      ],
      practices: [
        'Use <code>prefix="$"</code> para campos de comando ou terminal.',
        'Sempre forneça <code>errorMessage</code> quando <code>invalid</code> estiver ativo.',
        'Evite usar <code>type="number"</code> para valores monetários — prefira text com máscara.',
      ],
    },

    select: {
      badges: ['standalone', 'form', 'cva', 'onpush', 'a11y'],
      description: 'Select retrô para listas pequenas e configurações rápidas do sistema. Suporta opções com label, value e separator.',
      inputs: [
        { name: 'options', type: '{ label: string; value: string; separator?: boolean }[]', default: '[]', desc: 'Lista de opções exibidas.', required: true },
        { name: 'value', type: 'string', default: "''", desc: 'Valor selecionado.' },
        { name: 'placeholder', type: 'string', default: "''", desc: 'Placeholder exibido quando nenhum valor está selecionado.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", desc: 'Tamanho do select.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita interação.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Ocupa 100% da largura do container.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'string', default: '-', desc: 'Emite o novo valor selecionado.' },
      ],
      cva: ['Suporta <code>ngModel</code> e <code>formControl</code> via ControlValueAccessor.'],
      a11y: [
        'Opções separadoras possuem <code>role="separator"</code>.',
        'Foco visível no dropdown via <code>--focus-ring</code>.',
      ],
      practices: [
        'Use <code>size="sm"</code> em toolbars e controles compactos.',
        'Agrupe opções relacionadas com <code>separator: true</code>.',
      ],
    },

    range: {
      badges: ['standalone', 'form', 'cva', 'onpush', 'a11y'],
      description: 'Slider retrô para ajustes de valor contínuo com feedback imediato. Suporta min, max, step e disabled.',
      inputs: [
        { name: 'value', type: 'number', default: '0', desc: 'Valor atual do slider.' },
        { name: 'min', type: 'number', default: '0', desc: 'Valor mínimo.' },
        { name: 'max', type: 'number', default: '100', desc: 'Valor máximo.' },
        { name: 'step', type: 'number', default: '1', desc: 'Incremento entre valores.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita interação.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Ocupa 100% da largura do container.' },
        { name: 'showValue', type: 'boolean', default: 'false', desc: 'Exibe o valor numérico ao lado do slider.' },
        { name: 'label', type: 'string', default: "''", desc: 'Label descritivo acima do slider.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'number', default: '-', desc: 'Emite o novo valor ao soltar o slider ou usar teclas.' },
      ],
      cva: ['Suporta <code>ngModel</code> e <code>formControl</code> via ControlValueAccessor.'],
      a11y: [
        '<code>aria-valuemin</code>, <code>aria-valuemax</code> e <code>aria-valuenow</code> sincronizados.',
        'Navegável por teclado com setas direcionais.',
      ],
      practices: [
        'Use <code>step</code> para restringir valores a intervalos discretos.',
        'Exiba o valor atual em um label adjacente para melhor usabilidade.',
      ],
    },

    checkbox: {
      badges: ['standalone', 'form', 'cva', 'onpush', 'a11y'],
      description: 'Checkbox standalone com estados checked, readonly, invalid e indeterminate. Suporta CVA e label associada.',
      inputs: [
        { name: 'label', type: 'string', default: "''", desc: 'Texto do label exibido ao lado do checkbox.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Tamanho do checkbox.' },
        { name: 'checked', type: 'boolean', default: 'false', desc: 'Estado marcado.' },
        { name: 'readonly', type: 'boolean', default: 'false', desc: 'Somente leitura — não permite alterar o estado.' },
        { name: 'invalid', type: 'boolean', default: 'false', desc: 'Aplica estilo visual de erro.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita interação.' },
        { name: 'indeterminate', type: 'boolean', default: 'false', desc: 'Estado indeterminado (ex: seleção parcial em lista).' },
        { name: 'trueValue', type: 'unknown', default: 'true', desc: 'Valor emitido via CVA quando checked=true.' },
        { name: 'falseValue', type: 'unknown', default: 'false', desc: 'Valor emitido via CVA quando checked=false.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [
        { name: 'checkedChange', type: 'boolean', default: '-', desc: 'Emite o novo estado ao interagir.' },
        { name: 'valueChange', type: 'unknown', default: '-', desc: 'Emite o valor trueValue/falseValue ao alterar o estado (CVA).' },
      ],
      cva: ['Suporta <code>ngModel</code> e <code>formControl</code> via ControlValueAccessor.'],
      a11y: [
        '<code>aria-checked</code> reflete <code>checked</code> ou <code>indeterminate</code>.',
        'Label clicável associada via <code>for</code> + <code>id</code>.',
        'Foco visível com <code>--focus-ring</code>.',
      ],
      practices: [
        'Use <code>indeterminate</code> para checkboxes de cabeçalho em listas com seleção parcial.',
        'Evite usar <code>readonly</code> sem indicar visualmente que o campo não é editável.',
      ],
    },

    kbd: {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Representação visual de teclas únicas ou combos de atalhos. Estilo retrô com borda elevada.',
      inputs: [
        { name: 'keys', type: 'string[]', default: '[]', desc: 'Array de teclas para exibir como combo.' },
      ],
      outputs: [],
      slots: 'Content projection para tecla única quando <code>keys</code> não é fornecido.',
      a11y: [
        'Usa <code>&lt;kbd&gt;</code> semanticamente.',
      ],
      practices: [
        'Use para atalhos de teclado em tooltips ou documentação.',
        'Prefira teclas curtas — combos muito longos quebram layout.',
      ],
    },

    pill: {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Pill compacta para estados de workflow e status categóricos.',
      inputs: [
        { name: 'status', type: 'string', default: "''", desc: 'Status que determina a cor semântica.', required: true },
        { name: 'size', type: 'StatusPillSize', default: "'sm'", desc: 'Tamanho: sm, md.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [],
      a11y: [
        'Recebe <code>aria-label</code> quando o texto não é autoexplicativo.',
      ],
      practices: [
        'Use para status de workflow (active, paused, completed).',
        'Evite mais de 2 tamanhos diferentes em uma mesma tabela.',
      ],
    },

    dot: {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Indicador pontual de estado com opção de pulso para atividade.',
      inputs: [
        { name: 'status', type: 'string', default: '-', desc: 'Status que determina a cor.', required: true },
        { name: 'size', type: 'StatusDotSize', default: "'sm'", desc: 'Tamanho: xs, sm, md.' },
        { name: 'pulse', type: 'boolean', default: 'false', desc: 'Animação de pulso contínuo.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível.' },
      ],
      outputs: [],
      a11y: [
        '<code>aria-label</code> obrigatório quando usado sem texto adjacente.',
      ],
      practices: [
        'Use <code>pulse</code> para indicar atividade em tempo real.',
        'Combine com texto descritivo ao invés de depender apenas da cor.',
      ],
    },

    tag: {
      badges: ['standalone', 'interactive', 'onpush'],
      description: 'Tag textual para labels, filtros e taxonomias do projeto. Suporta remoção e ícone.',
      inputs: [
        { name: 'label', type: 'string', default: "''", desc: 'Texto da tag.', required: true },
        { name: 'icon', type: 'string', default: "''", desc: 'Glyph exibido antes do texto.' },
        { name: 'variant', type: 'TagVariant', default: "'default'", desc: 'Variante visual: default, primary, success, warning, danger.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", desc: 'Tamanho da tag.' },
        { name: 'removable', type: 'boolean', default: 'false', desc: 'Exibe botão de remoção (×).' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita remoção e aplica opacidade.' },
      ],
      outputs: [
        { name: 'removed', type: 'void', default: '-', desc: 'Emitido ao clicar no botão de remoção.' },
      ],
      a11y: [
        'Botão de remoção possui <code>aria-label</code> descritivo.',
        'Foco visível no botão de remoção.',
      ],
      practices: [
        'Use <code>removable</code> em filtros ativos para permitir limpeza rápida.',
        'Agrupe tags relacionadas horizontalmente com gap de 6–8px.',
      ],
    },

    stat: {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Caixa métrica para KPIs, contadores e resumos do dashboard.',
      inputs: [
        { name: 'label', type: 'string', default: "''", desc: 'Label descritivo da métrica.', required: true },
        { name: 'value', type: 'string | number', default: "''", desc: 'Valor principal exibido.', required: true },
        { name: 'sublabel', type: 'string', default: "''", desc: 'Texto secundário abaixo do valor.' },
        { name: 'tone', type: 'StatBoxTone', default: "'default'", desc: 'Tom semântico: default, success, warning, danger.' },
        { name: 'trend', type: 'StatBoxTrend', default: 'undefined', desc: 'Indicador de tendência: up, down, neutral.' },
      ],
      outputs: [],
      a11y: [
        'Estrutura semântica com <code>aria-label</code> composto por label + value.',
      ],
      practices: [
        'Use <code>trend</code> para indicar variação em relação ao período anterior.',
        'Mantenha labels curtos — máximo 2 palavras.',
      ],
    },

    progress: {
      badges: ['standalone', 'feedback', 'onpush'],
      description: 'Barra de progresso com modos determinate e indeterminate.',
      inputs: [
        { name: 'value', type: 'number', default: '0', desc: 'Valor atual (0–100) no modo determinate.' },
        { name: 'mode', type: 'ProgressMode', default: "'determinate'", desc: 'Modo: determinate ou indeterminate.' },
        { name: 'tone', type: 'ProgressTone', default: "'default'", desc: 'Tom semântico: default, success, warning, danger.' },
        { name: 'unit', type: 'string', default: "'%'", desc: 'Unidade exibida ao lado do valor.' },
        { name: 'label', type: 'string', default: "''", desc: 'Label descritivo acima da barra.' },
        { name: 'showValue', type: 'boolean', default: 'true', desc: 'Exibe o valor numérico.' },
        { name: 'animated', type: 'boolean', default: 'false', desc: 'Animação suave ao mudar o valor.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [],
      a11y: [
        '<code>role="progressbar"</code> com <code>aria-valuenow</code>, <code>aria-valuemin</code> e <code>aria-valuemax</code>.',
        'Label acessível via <code>aria-label</code> ou <code>aria-labelledby</code>.',
      ],
      practices: [
        'Use <code>mode="indeterminate"</code> quando o tempo total é desconhecido.',
        'Sempre forneça <code>label</code> ou <code>ariaLabel</code> para contexto.',
      ],
    },

    ascii: {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Barra em estilo terminal usando caracteres ASCII configuráveis.',
      inputs: [
        { name: 'value', type: 'number', default: '0', desc: 'Valor atual (0–100).', required: true },
        { name: 'width', type: 'number', default: '20', desc: 'Largura da barra em caracteres.' },
        { name: 'filledChar', type: 'string', default: "'█'", desc: 'Caractere para a parte preenchida.' },
        { name: 'emptyChar', type: 'string', default: "'░'", desc: 'Caractere para a parte vazia.' },
        { name: 'showValue', type: 'boolean', default: 'true', desc: 'Exibe o valor percentual ao lado.' },
      ],
      outputs: [],
      a11y: [
        'Usa <code>role="img"</code> com <code>aria-label</code> descrevendo o valor.',
      ],
      practices: [
        'Ideal para dashboards com estética terminal pura.',
        'Ajuste <code>width</code> conforme o espaço disponível em colunas.',
      ],
    },

    toast: {
      badges: ['standalone', 'feedback', 'onpush'],
      description: 'Host visual para notificações emitidas pelo ToastService. Gerencia fila, posição e lifecycle.',
      inputs: [
        { name: 'position', type: 'ToastPosition', default: "'bottom-right'", desc: 'Posição do container de toasts na tela.' },
        { name: 'maxVisible', type: 'number', default: '5', desc: 'Número máximo de toasts visíveis simultaneamente.' },
      ],
      outputs: [
        { name: 'toastClosed', type: 'ToastMessage', default: '-', desc: 'Emitido quando um toast é fechado.' },
      ],
      a11y: [
        'Toasts anunciam novas mensagens via <code>aria-live="polite"</code>.',
        'Botão de fechar possui <code>aria-label</code>.',
      ],
      practices: [
        'Instancie uma única vez na raiz da aplicação.',
        'Use <code>sticky: true</code> para erros que exigem ação do usuário.',
      ],
    },

    message: {
      badges: ['standalone', 'feedback', 'onpush'],
      description: 'Mensagem inline com severidade, variante e fechamento opcional.',
      inputs: [
        { name: 'severity', type: 'MessageSeverity', default: "'info'", desc: 'Severidade: info, success, warning, error.' },
        { name: 'variant', type: 'MessageVariant', default: "'filled'", desc: 'Variante visual: filled, outlined, ghost.' },
        { name: 'text', type: 'string', default: "''", desc: 'Texto da mensagem.', required: true },
        { name: 'icon', type: 'string', default: "''", desc: 'Glyph override para o ícone.' },
        { name: 'closable', type: 'boolean', default: 'false', desc: 'Exibe botão de fechar.' },
      ],
      outputs: [
        { name: 'msgClosed', type: 'void', default: '-', desc: 'Emitido ao clicar no botão de fechar.' },
      ],
      methods: [
        { name: 'close', type: '() => void', default: '-', desc: 'Fecha a mensagem programaticamente.' },
      ],
      slots: 'Content projection para conteúdo rico quando <code>text</code> não é fornecido.',
      a11y: [
        '<code>role="alert"</code> para severidades <code>error</code> e <code>warning</code>.',
        'Botão de fechar com <code>aria-label</code>.',
      ],
      practices: [
        'Use <code>variant="outlined"</code> em formulários para não competir visualmente com campos.',
        'Evite mensagens auto-dismissing sem botão de fechar — prefira Toast para isso.',
      ],
    },

    skeleton: {
      badges: ['standalone', 'feedback', 'onpush'],
      description: 'Placeholder visual para carregamento com wave, pulse ou estado estático.',
      inputs: [
        { name: 'width', type: 'string', default: "'100%'", desc: 'Largura do skeleton.' },
        { name: 'height', type: 'string', default: "'14px'", desc: 'Altura do skeleton.' },
        { name: 'shape', type: 'SkeletonShape', default: "'rectangle'", desc: 'Formato: rectangle, circle.' },
        { name: 'animation', type: 'SkeletonAnimation', default: "'wave'", desc: 'Animação: wave, pulse, none.' },
        { name: 'count', type: 'number', default: '1', desc: 'Número de repetições.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível.' },
      ],
      outputs: [],
      a11y: [
        '<code>aria-busy="true"</code> no container pai é recomendado.',
        '<code>aria-label</code> descreve o estado de carregamento.',
      ],
      practices: [
        'Use <code>shape="circle"</code> para avatares e ícones de perfil.',
        'Combine múltiplos skeletons com <code>count</code> para listas.',
      ],
    },

    modal: {
      badges: ['standalone', 'layout', 'onpush', 'a11y'],
      description: 'Modal standalone com overlay, backdrop close, teclado e slots nomeados.',
      inputs: [
        { name: 'open', type: 'boolean', default: 'false', desc: 'Controla a visibilidade do modal.', required: true },
        { name: 'title', type: 'string', default: "''", desc: 'Título do modal.' },
        { name: 'subtitle', type: 'string', default: "''", desc: 'Subtítulo do modal.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Tamanho do modal.' },
        { name: 'closeOnBackdrop', type: 'boolean', default: 'true', desc: 'Fecha ao clicar no backdrop.' },
        { name: 'closeOnEscape', type: 'boolean', default: 'true', desc: 'Fecha ao pressionar Escape.' },
        { name: 'showCloseButton', type: 'boolean', default: 'true', desc: 'Exibe botão de fechar no header.' },
      ],
      outputs: [
        { name: 'closed', type: 'void', default: '-', desc: 'Emitido ao fechar o modal.' },
      ],
      slots: 'Content projection padrão para conteúdo principal. <code>[modal-actions]</code> para botões de ação.',
      a11y: [
        'Foco preso dentro do modal enquanto aberto.',
        '<code>Escape</code> fecha o modal.',
        '<code>role="dialog"</code> e <code>aria-modal="true"</code>.',
      ],
      practices: [
        'Sempre forneça um botão de ação primária e um de cancelamento.',
        'Use <code>size="sm"</code> para confirmações simples e <code>size="lg"</code> para formulários.',
      ],
    },

    collapsible: {
      badges: ['standalone', 'layout', 'onpush'],
      description: 'Bloco expansível para seções de documentação e conteúdo progressivo.',
      inputs: [
        { name: 'title', type: 'string', default: "''", desc: 'Título exibido no cabeçalho.', required: true },
        { name: 'collapsed', type: 'boolean', default: 'false', desc: 'Estado recolhido (two-way via model).' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita expansão.' },
      ],
      outputs: [
        { name: 'collapsedChange', type: 'boolean', default: '-', desc: 'Emite ao alternar o estado (two-way via model).' },
      ],
      slots: 'Content projection para o corpo expansível. <code>[collapsible-actions]</code> para ações no cabeçalho.',
      a11y: [
        'Botão de toggle possui <code>aria-expanded</code>.',
        'Foco visível no cabeçalho interativo.',
      ],
      practices: [
        'Use para FAQs, detalhes técnicos ou configurações avançadas.',
        'Evite aninhar mais de 2 níveis de collapsible.',
      ],
    },

    code: {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Bloco de código com linguagem, borda opcional e ação de cópia.',
      inputs: [
        { name: 'code', type: 'string', default: "''", desc: 'Código a ser exibido.', required: true },
        { name: 'language', type: 'string', default: "''", desc: 'Linguagem para syntax highlighting.' },
        { name: 'framed', type: 'boolean', default: 'true', desc: 'Exibe borda e fundo estilo window frame.' },
      ],
      outputs: [],
      a11y: [
        'Botão de cópia possui <code>aria-label</code>.',
      ],
      practices: [
        'Use <code>framed="false"</code> para snippets inline em cards.',
        'Especifique <code>language</code> para melhor legibilidade.',
      ],
    },

    'toolbar-search': {
      badges: ['standalone', 'form', 'onpush'],
      description: 'Campo de busca pré-configurado para toolbars — wraps RetroInput com prefix $ e clearable.',
      inputs: [
        { name: 'value', type: 'string', default: "''", desc: 'Valor atual da busca.' },
        { name: 'placeholder', type: 'string', default: "'search...'", desc: 'Placeholder do campo.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'string', default: '-', desc: 'Emite ao digitar.' },
        { name: 'cleared', type: 'void', default: '-', desc: 'Emitido ao limpar o campo.' },
      ],
      a11y: [
        'Herda acessibilidade do RetroInput.',
      ],
      practices: [
        'Use em toolbars de grid e listas.',
        'Capture <code>cleared</code> para resetar filtros associados.',
      ],
    },

    'notif-item': {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Linha individual de notificação com badge de tipo, fonte, timestamp relativo e subtítulo.',
      inputs: [
        { name: 'type', type: 'NotifType', default: '-', desc: 'Tipo visual: event, build, alert.', required: true },
        { name: 'source', type: 'NotifSource', default: '-', desc: 'Fonte da notificação: webhook, email, system.', required: true },
        { name: 'timestamp', type: 'Date', default: '-', desc: 'Data/hora da notificação.', required: true },
        { name: 'title', type: 'string', default: "''", desc: 'Título da notificação.', required: true },
        { name: 'subtitle', type: 'string | undefined', default: 'undefined', desc: 'Subtítulo descritivo.' },
        { name: 'read', type: 'boolean', default: 'false', desc: 'Estado lido/não lido.' },
      ],
      outputs: [
        { name: 'itemRead', type: 'void', default: '-', desc: 'Emitido ao marcar como lido.' },
      ],
      a11y: [
        'Timestamp relativo possui <code>title</code> com data absoluta.',
        'Botão de marcar lido possui <code>aria-label</code>.',
      ],
      practices: [
        'Use dentro de <code>NotifStream</code> para painéis laterais.',
        'Mantenha títulos curtos — máximo 60 caracteres.',
      ],
    },

    'notif-stream': {
      badges: ['standalone', 'feedback', 'onpush', 'composable'],
      description: 'Painel lateral de notificações com slide-in, ações em lote e projeção de NotifItem.',
      inputs: [
        { name: 'open', type: 'boolean', default: 'false', desc: 'Controla a visibilidade do painel.', required: true },
      ],
      outputs: [
        { name: 'closed', type: 'void', default: '-', desc: 'Emitido ao fechar o painel.' },
      ],
      slots: 'Content projection para <code>NotifItem</code> ou conteúdo customizado.',
      a11y: [
        'Foco preso dentro do painel enquanto aberto.',
        '<code>Escape</code> fecha o painel.',
      ],
      practices: [
        'Instancie uma única vez na raiz da aplicação.',
        'Use <code>NotifService</code> para gerenciar o estado das notificações.',
      ],
    },

    'priority-indicator': {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Indicador de prioridade em estilo terminal: !!, !, •, · ou — por nível.',
      inputs: [
        { name: 'priority', type: 'Priority', default: "'none'", desc: 'Nível: critical, high, medium, low, none.', required: true },
      ],
      outputs: [],
      a11y: [
        '<code>aria-label</code> descreve o nível textualmente.',
      ],
      practices: [
        'Use em grids de tarefas para scan rápido.',
        'Não substitua label textual por este indicador sozinho.',
      ],
    },

    'visibility-chip': {
      badges: ['standalone', 'display', 'onpush'],
      description: 'Chip de visibilidade [PUB]/[PRIV]/[INT] com cor semântica por tipo.',
      inputs: [
        { name: 'visibility', type: 'Visibility', default: "'public'", desc: 'Tipo: public, private, internal.', required: true },
      ],
      outputs: [],
      a11y: [
        '<code>aria-label</code> descreve o tipo de visibilidade.',
      ],
      practices: [
        'Use ao lado do título de projetos ou repositórios.',
      ],
    },

    'retro-filter-bar': {
      badges: ['standalone', 'interactive', 'onpush', 'composable'],
      description: 'Barra de filtros genérica com single/multi-select, disabled por tab e slot [filter-end] para controles extras.',
      inputs: [
        { name: 'tabs', type: 'FilterTab[]', default: '[]', desc: 'Definição das abas de filtro.', required: true },
        { name: 'active', type: 'string', default: "''", desc: 'Chave ativa no modo single-select.' },
        { name: 'activeKeys', type: 'string[]', default: '[]', desc: 'Chaves ativas no modo multi-select.' },
        { name: 'multiSelect', type: 'boolean', default: 'false', desc: 'Habilita seleção múltipla.' },
      ],
      outputs: [
        { name: 'tabChange', type: 'string', default: '-', desc: 'Emitido ao trocar de aba no modo single.' },
        { name: 'keysChange', type: 'string[]', default: '-', desc: 'Emitido ao alterar seleção no modo multi.' },
      ],
      slots: '<code>[filter-end]</code> para projetar controles adicionais à direita.',
      a11y: [
        'Abas possuem <code>role="tab"</code> e <code>aria-selected</code>.',
        'Navegação por teclado com setas direcionais.',
      ],
      practices: [
        'Use <code>multiSelect</code> para filtros de status com múltiplos valores.',
        'Exiba contador de itens em <code>FilterTab.count</code> para contexto.',
      ],
    },

    'retro-grid-row': {
      badges: ['standalone', 'layout', 'onpush', 'composable'],
      description: 'Linha genérica de grid — projeta qualquer filho como célula e herda --grid-cols.',
      inputs: [
        { name: 'size', type: 'GridRowSize', default: "'md'", desc: 'Tamanho da linha: sm, md, lg.' },
      ],
      outputs: [],
      slots: 'Content projection para células da linha. Cada filho direto vira uma célula.',
      a11y: [
        'Use <code>role="row"</code> implicitamente via estrutura de grid.',
      ],
      practices: [
        'Use dentro de <code>DataGrid</code> para linhas simples.',
        'Não adicione padding diretamente nos filhos — use tokens de espaçamento.',
      ],
    },

    'retro-expandable-row': {
      badges: ['standalone', 'layout', 'onpush', 'composable'],
      description: 'Linha expansível com painel de detalhe animado — herda --grid-cols e usa model(expanded).',
      inputs: [
        { name: 'expanded', type: 'boolean', default: 'false', desc: 'Estado expandido.' },
        { name: 'expandOnClick', type: 'boolean', default: 'true', desc: 'Expande ao clicar em qualquer parte da linha.' },
      ],
      outputs: [
        { name: 'expandedChange', type: 'boolean', default: '-', desc: 'Emite ao alternar o estado.' },
      ],
      slots: 'Content projection para células. <code>[detail]</code> para conteúdo expandido.',
      a11y: [
        'Botão de toggle possui <code>aria-expanded</code>.',
        'Foco visível no controle de expansão.',
      ],
      practices: [
        'Use <code>expandOnClick="false"</code> quando houver ações na linha.',
        'Mantenha o painel de detalhes curto — máximo 3 linhas.',
      ],
    },

    'retro-paginator': {
      badges: ['standalone', 'interactive', 'onpush', 'a11y'],
      description: 'Barra de paginação com navegação de páginas, janela inteligente de números e seletor de page size.',
      inputs: [
        { name: 'page', type: 'number', default: '0', desc: 'Página atual (0-indexed).' },
        { name: 'pageSize', type: 'number', default: '10', desc: 'Itens por página.' },
        { name: 'total', type: 'number', default: '0', desc: 'Total de itens.' },
        { name: 'pageSizeOptions', type: 'number[]', default: '[5, 10, 25, 50]', desc: 'Opções de page size.' },
        { name: 'showPageSize', type: 'boolean', default: 'true', desc: 'Exibe seletor de page size.' },
        { name: 'size', type: "'sm' | 'md'", default: "'sm'", desc: 'Tamanho do paginator.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita navegação.' },
      ],
      outputs: [
        { name: 'pageChange', type: 'number', default: '-', desc: 'Emite ao trocar de página.' },
        { name: 'pageSizeChange', type: 'number', default: '-', desc: 'Emite ao alterar page size.' },
      ],
      a11y: [
        'Links de página possuem <code>aria-label</code> descritivo.',
        'Estado ativo indicado por <code>aria-current="page"</code>.',
      ],
      practices: [
        'Sempre sincronize <code>page</code> ao alterar <code>pageSize</code> (reset para 0).',
        'Use <code>pageSizeOptions</code> compatíveis com o backend.',
      ],
    },

    'retro-status-bar': {
      badges: ['standalone', 'layout', 'onpush'],
      description: 'Barra de status fixa com versão, itens de sistema e atalhos de teclado.',
      inputs: [
        { name: 'version', type: 'string', default: "''", desc: 'Versão do sistema exibida à esquerda.' },
        { name: 'items', type: 'StatusItem[]', default: '[]', desc: 'Itens de status (label + value).' },
        { name: 'shortcuts', type: 'StatusShortcut[]', default: '[]', desc: 'Atalhos de teclado exibidos à direita.' },
      ],
      outputs: [],
      a11y: [
        'Atalhos possuem <code>aria-label</code> com descrição da ação.',
      ],
      practices: [
        'Mantenha a barra visível em todas as páginas da aplicação.',
        'Atualize <code>items</code> dinamicamente para status de conexão.',
      ],
    },

    'retro-data-grid': {
      badges: ['standalone', 'layout', 'interactive', 'onpush', 'composable'],
      description: 'Grid de dados com sort, busca, filtros por checkbox, regras avançadas (column+op+value), redimensionamento de colunas e visibilidade dinâmica.',
      inputs: [
        { name: 'title', type: 'string', default: "''", desc: 'Título do grid.' },
        { name: 'subtitle', type: 'string', default: "''", desc: 'Subtítulo do grid.' },
        { name: 'columns', type: 'GridColumn[]', default: '[]', desc: 'Definição das colunas.', required: true },
        { name: 'rowCount', type: 'number', default: '0', desc: 'Número total de linhas (para layout de skeleton).' },
        { name: 'addLabel', type: 'string', default: "''", desc: 'Label do botão de adicionar.' },
        { name: 'searchable', type: 'boolean', default: 'false', desc: 'Habilita busca global.' },
        { name: 'resizable', type: 'boolean', default: 'false', desc: 'Habilita redimensionamento de colunas.' },
        { name: 'columnPicker', type: 'boolean', default: 'false', desc: 'Habilita picker de visibilidade de colunas.' },
        { name: 'filterRulesEnabled', type: 'boolean', default: 'false', desc: 'Habilita regras de filtro avançadas.' },
        { name: 'searchQuery', type: 'string', default: "''", desc: 'Valor da busca global.' },
        { name: 'sortState', type: 'SortState', default: '{}', desc: 'Estado atual de ordenação.' },
        { name: 'columnFilters', type: 'ColumnFilterState', default: '{}', desc: 'Filtros por coluna (checkbox).' },
        { name: 'filterOptionsMap', type: 'FilterOptionsMap', default: '{}', desc: 'Opções disponíveis para filtros por coluna.' },
        { name: 'filterRules', type: 'FilterRule[]', default: '[]', desc: 'Regras de filtro avançadas.' },
        { name: 'hiddenCols', type: 'Set<string>', default: 'new Set()', desc: 'Colunas ocultas.' },
        { name: 'colWidths', type: 'Record<string, number>', default: '{}', desc: 'Larguras customizadas de colunas (em px).' },
      ],
      outputs: [
        { name: 'addClick', type: 'void', default: '-', desc: 'Emitido ao clicar em adicionar.' },
        { name: 'searchChange', type: 'string', default: '-', desc: 'Emitido ao alterar busca global.' },
        { name: 'sortChange', type: 'string', default: '-', desc: 'Emitido ao alterar ordenação.' },
        { name: 'columnFilterChange', type: '{ field: string; values: string[] }', default: '-', desc: 'Emitido ao alterar filtro de coluna.' },
        { name: 'filterRuleAdd', type: 'void', default: '-', desc: 'Emitido ao adicionar regra de filtro.' },
        { name: 'filterRuleRemove', type: 'string', default: '-', desc: 'Emitido ao remover regra (por id).' },
        { name: 'filterRuleUpdate', type: '{ id: string } & Partial<FilterRule>', default: '-', desc: 'Emitido ao atualizar regra.' },
        { name: 'filterRuleClear', type: 'void', default: '-', desc: 'Emitido ao limpar todas as regras.' },
        { name: 'colVisibilityToggle', type: 'string', default: '-', desc: 'Emitido ao alternar visibilidade de coluna.' },
        { name: 'colVisibilityShowAll', type: 'void', default: '-', desc: 'Emitido ao mostrar todas as colunas.' },
        { name: 'colWidthChange', type: '{ key: string; width: number }', default: '-', desc: 'Emitido ao redimensionar coluna.' },
      ],
      slots: 'Content projection para linhas via <code>GridRow</code> ou <code>ExpandableRow</code>. <code>[grid-filter]</code> para filtros customizados.',
      a11y: [
        'Cabeçalho de coluna possui <code>role="columnheader"</code> e <code>aria-sort</code>.',
        'Busca global possui <code>aria-label</code>.',
      ],
      practices: [
        'Use <code>createRetroTable</code> para gerenciar estado de sort/filtro/paginação.',
        'Defina <code>width</code> em <code>GridColumn</code> como <code>minmax(0, 1fr)</code> para colunas fluidas.',
      ],
    },

    terminal: {
      badges: ['standalone', 'interactive', 'onpush'],
      description: 'Terminal interativo com histórico, tab completion, typewriter, cursor de bloco e comandos registráveis.',
      inputs: [
        { name: 'prompt', type: 'string', default: "'user@retro:~$ '", desc: 'Texto do prompt.' },
        { name: 'greeting', type: 'string[]', default: "['Retro Terminal v0.1.0', \"Type 'help' for available commands.\"]", desc: 'Mensagens de boas-vindas exibidas ao iniciar.' },
        { name: 'commands', type: 'TerminalCommand[]', default: '[]', desc: 'Comandos registráveis disponíveis.' },
        { name: 'typewriterSpeed', type: 'number', default: '16', desc: 'Velocidade do efeito typewriter (ms/char). 0 = instantâneo.' },
        { name: 'autofocus', type: 'boolean', default: 'true', desc: 'Foca automaticamente ao renderizar.' },
        { name: 'maxLines', type: 'number', default: '500', desc: 'Número máximo de linhas no histórico.' },
        { name: 'windowTitle', type: 'string', default: "'terminal'", desc: 'Título exibido na barra da janela do terminal.' },
      ],
      outputs: [
        { name: 'commandRun', type: '{ cmd: string; args: string[] }', default: '-', desc: 'Emitido ao executar um comando.' },
      ],
      a11y: [
        'Input do terminal possui <code>aria-label</code>.',
        'Saída do terminal usa <code>aria-live="polite"</code> para anúncios.',
      ],
      practices: [
        'Registre comandos via array <code>TerminalCommand[]</code> para reutilização.',
        'Use <code>typewriterSpeed="0"</code> para respostas instantâneas em testes.',
      ],
    },

    segmented: {
      badges: ['standalone', 'form', 'cva', 'onpush', 'a11y'],
      description: 'Seletor segmentado compatível com CVA — alterna entre opções de texto em layout row ou col.',
      inputs: [
        { name: 'options', type: 'string[]', default: '[]', desc: 'Opções exibidas.', required: true },
        { name: 'value', type: 'string', default: "''", desc: 'Opção selecionada.' },
        { name: 'direction', type: "'row' | 'col'", default: "'row'", desc: 'Direção do layout.' },
        { name: 'ariaLabel', type: 'string', default: "''", desc: 'Label acessível para leitores de tela.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'string', default: '-', desc: 'Emite ao selecionar uma opção.' },
      ],
      cva: ['Suporta <code>ngModel</code> e <code>formControl</code> via ControlValueAccessor.'],
      a11y: [
        'Usa <code>role="radiogroup"</code> com <code>aria-checked</code> por opção.',
        'Navegação por teclado com setas direcionais.',
      ],
      practices: [
        'Use para poucas opções mutuamente exclusivas (3–5).',
        'Prefira <code>direction="col"</code> em sidebars estreitas.',
      ],
    },

    'button-group': {
      badges: ['standalone', 'layout', 'onpush', 'composable'],
      description: 'Wrapper semântico que agrupa botões adjacentes removendo bordas internas duplicadas.',
      inputs: [],
      outputs: [],
      slots: 'Content projection para botões agrupados.',
      a11y: [
        'Agrupa botões relacionados semanticamente.',
      ],
      practices: [
        'Use para ações adjacentes de mesmo nível hierárquico.',
        'Misture variantes dentro do grupo para indicar ação principal vs. secundária.',
      ],
    },

    'api-table': {
      badges: ['standalone', 'display', 'onpush', 'composable'],
      description: 'Tabela de referência de API — renderiza cabeçalhos tipados (input/output/method) e projeta linhas via ng-content.',
      inputs: [
        { name: 'type', type: "'input' | 'output' | 'method'", default: "'input'", desc: 'Tipo de API a documentar.', required: true },
        { name: 'gap', type: 'boolean', default: 'false', desc: 'Adiciona margem superior entre tabelas.' },
        { name: 'headers', type: 'string[]', default: '[]', desc: 'Cabeçalhos customizados (override automático).' },
      ],
      outputs: [],
      slots: 'Content projection para linhas da tabela via <code>&lt;tr&gt;</code>.',
      a11y: [
        'Tabela usa marcação semântica <code>&lt;table&gt;</code>.',
      ],
      practices: [
        'Use <code>type="input"</code> para inputs, <code>type="output"</code> para outputs, <code>type="method"</code> para métodos.',
        'Adicione <code>gap="true"</code> entre tabelas consecutivas para respiro visual.',
      ],
    },

    'retro-tabs': {
      badges: ['standalone', 'interactive', 'onpush', 'a11y'],
      description: 'Barra de abas estilo terminal com disabled, icon, badge por aba, navegação por teclado (← → Home End) e cinco variantes visuais.',
      inputs: [
        { name: 'tabs', type: 'RetroTab[]', default: '[]', desc: 'Definição das abas.', required: true },
        { name: 'active', type: 'string', default: "''", desc: 'ID da aba ativa (two-way via model).' },
        { name: 'variant', type: 'WindowVariant', default: "'default'", desc: 'Variante visual: default, terminal, system, alert, ghost.' },
      ],
      outputs: [
        { name: 'activeChange', type: 'string', default: '-', desc: 'Emitido ao trocar de aba (two-way via model).' },
      ],
      slots: 'Content projection para o painel de conteúdo da aba ativa.',
      a11y: [
        'Abas possuem <code>role="tab"</code>, <code>aria-selected</code> e <code>aria-disabled</code>.',
        'Navegação por teclado: ← → move entre abas, Home/End para início/fim.',
      ],
      practices: [
        'Use <code>variant="terminal"</code> para painéis de configuração ou logs.',
        'Forneça <code>icon</code> e <code>badge</code> para scan rápido do estado das abas.',
      ],
    },

    'retro-section': {
      badges: ['standalone', 'layout', 'onpush', 'composable'],
      description: 'Contêiner estilo fieldset com label na borda — versão leve do window frame para agrupar conteúdo internamente.',
      inputs: [
        { name: 'label', type: 'string', default: "''", desc: 'Texto exibido na borda superior.', required: true },
        { name: 'variant', type: 'SectionVariant', default: "'default'", desc: 'Variante visual: default, terminal, system, alert, ghost.' },
      ],
      outputs: [],
      slots: 'Content projection para o conteúdo interno.',
      a11y: [
        'Label associado semanticamente ao contêiner.',
      ],
      practices: [
        'Use para agrupar campos de formulário relacionados.',
        'Prefira Section quando não precisar de controles de janela ou footer.',
      ],
    },
  };

  // ─────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    const allIds = this.flatStoryItems().map((item) => item.id);
    const queryStory = this.route.snapshot.queryParamMap.get('story') as StoryId | null;
    const savedStory = localStorage.getItem(`${this.storagePrefix}.active`) as StoryId | null;
    const initialStory = [queryStory, savedStory].find(
      (storyId): storyId is StoryId => !!storyId && allIds.includes(storyId),
    );

    const savedUi = this.readObject(localStorage.getItem(`${this.storagePrefix}.ui`));
    const queryTab = this.route.snapshot.queryParamMap.get('tab');

    for (const storyId of allIds) {
      this.restoreStoryState(storyId, this.readObject(localStorage.getItem(this.storyStorageKey(storyId))));
    }

    if (initialStory) {
      this.activeStory.set(initialStory);
    }

    if (queryTab === 'preview' || queryTab === 'code') {
      this.activeTab.set(queryTab);
    } else if (savedUi && (savedUi.activeTab === 'preview' || savedUi.activeTab === 'code')) {
      this.activeTab.set(savedUi.activeTab);
    }

    if (savedUi && (savedUi.activeDocTab === 'usage' || savedUi.activeDocTab === 'api' || savedUi.activeDocTab === 'meta')) {
      this.activeDocTab.set(savedUi.activeDocTab);
    }

    if (
      savedUi
      && (savedUi.previewBackground === 'panel' || savedUi.previewBackground === 'light' || savedUi.previewBackground === 'dark')
    ) {
      this.previewBackground.set(savedUi.previewBackground);
    }

    if (
      savedUi
      && typeof savedUi.previewWidth === 'number'
    ) {
      this.previewWidth.set(this.coercePreviewDimension(savedUi.previewWidth, 320, 1400));
    }

    if (
      savedUi
      && typeof savedUi.previewHeight === 'number'
    ) {
      this.previewHeight.set(this.coercePreviewDimension(savedUi.previewHeight, 220, 960));
    }

    if (savedUi && typeof savedUi.sidebarCollapsed === 'boolean') {
      this.sidebarCollapsed.set(savedUi.sidebarCollapsed);
    }

    if (savedUi && typeof savedUi.storyControlsCollapsed === 'boolean') {
      this.storyControlsCollapsed.set(savedUi.storyControlsCollapsed);
    }

    this.hydrated.set(true);
    this.syncUrlState();
  }

  protected setActiveStory(id: StoryId): void {
    this.activeStory.set(id);
    this.activeTab.set('preview');
    this.previewFullscreen.set(false);
    this.syncUrlState();
  }

  protected setActiveTab(tab: StoryTab): void {
    this.activeTab.set(tab);
    this.syncUrlState();
  }

  protected setActiveDocTab(tab: DocTab): void {
    this.activeDocTab.set(tab);
  }

  protected setPreviewBackground(background: PreviewBackground): void {
    this.previewBackground.set(background);
  }

  protected setPreviewWidth(value: string): void {
    this.previewWidth.set(this.coercePreviewDimension(Number(value), 320, 1400));
  }

  protected setPreviewHeight(value: string): void {
    this.previewHeight.set(this.coercePreviewDimension(Number(value), 220, 960));
  }

  protected resetPreviewSize(): void {
    this.previewWidth.set(960);
    this.previewHeight.set(560);
  }

  protected syncPreviewFrameSize(): void {
    const element = this.previewViewportElement()?.nativeElement;

    if (!element || this.activeTab() !== 'preview') {
      return;
    }

    this.previewWidth.set(this.coercePreviewDimension(element.offsetWidth, 320, 1400));
    this.previewHeight.set(this.coercePreviewDimension(element.offsetHeight, 220, 960));
  }

  protected togglePreviewFullscreen(): void {
    this.previewFullscreen.update((value) => !value);
  }

  protected onStorySearchChange(value: string): void {
    this.storySearch.set(value);
  }

  protected clearStorySearch(): void {
    this.storySearch.set('');
    this.storySearchInput()?.focus();
  }

  protected focusStorySearch(): void {
    if (this.sidebarCollapsed()) {
      this.sidebarCollapsed.set(false);
    }

    queueMicrotask(() => this.storySearchInput()?.focus());
  }

  @HostListener('document:keydown', ['$event'])
  protected handleKeyboardShortcuts(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.focusStorySearch();
      return;
    }

    if (this.isTypingTarget(event.target)) {
      return;
    }

    const key = event.key.toLowerCase();

    if (key === 'j') {
      event.preventDefault();
      this.moveStorySelection(1);
      return;
    }

    if (key === 'k') {
      event.preventDefault();
      this.moveStorySelection(-1);
      return;
    }

    if (key === 'p') {
      event.preventDefault();
      this.setActiveTab('preview');
      return;
    }

    if (key === 'c') {
      event.preventDefault();
      this.setActiveTab('code');
      return;
    }
  }

  private moveStorySelection(direction: 1 | -1): void {
    const ids = this.filteredStoryIds();

    if (ids.length === 0) {
      return;
    }

    const currentIndex = ids.indexOf(this.activeStory());
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + direction + ids.length) % ids.length;

    this.setActiveStory(ids[nextIndex]);
  }

  private isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return !!target.closest('input, textarea, select, [contenteditable="true"]');
  }

  private coercePreviewDimension(value: number, min: number, max: number): number {
    if (!Number.isFinite(value)) {
      return min;
    }

    return Math.max(min, Math.min(max, Math.round(value)));
  }

  private syncUrlState(): void {
    if (!this.hydrated()) {
      return;
    }

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        story: this.activeStory(),
        tab: this.activeTab(),
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private storyStorageKey(storyId: StoryId): string {
    return `${this.storagePrefix}.knobs.${storyId}`;
  }

  private readObject(raw: string | null): any {
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw);
      return typeof parsed === 'object' && parsed !== null ? parsed : null;
    } catch {
      return null;
    }
  }

  private getStoryState(storyId: StoryId): Record<string, unknown> {
    switch (storyId) {
      case 'win':
        return {
          title: this.winTitle(),
          subtitle: this.winSubtitle(),
          variant: this.winVariant(),
          padding: this.winPadding(),
          status: this.winStatus(),
          scrollable: this.winScrollable(),
          loading: this.winLoading(),
          footer: this.winFooter(),
          ctrlMinimize: this.winCtrlMinimize(),
          ctrlMaximize: this.winCtrlMaximize(),
          ctrlClose: this.winCtrlClose(),
        };
      case 'button':
        return {
          label: this.btnLabel(),
          variant: this.btnVariant(),
          tone: this.btnTone(),
          size: this.btnSize(),
          icon: this.btnIcon(),
          iconPos: this.btnIconPos(),
          badge: this.btnBadge(),
          href: this.btnHref(),
          download: this.btnDownload(),
          disabled: this.btnDisabled(),
          loading: this.btnLoading(),
          fullWidth: this.btnFullWidth(),
        };
      case 'input':
        return {
          value: this.inputValue(),
          placeholder: this.inputPlaceholder(),
          type: this.inputType(),
          size: this.inputSize(),
          prefix: this.inputPrefix(),
          suffix: this.inputSuffix(),
          disabled: this.inputDisabled(),
          readonly: this.inputReadonly(),
          invalid: this.inputInvalid(),
          errorMessage: this.inputErrorMessage(),
          helpText: this.inputHelpText(),
          clearable: this.inputClearable(),
          fullWidth: this.inputFullWidth(),
        };
      case 'select':
        return {
          value: this.selectValue(),
          size: this.selectSize(),
          disabled: this.selectDisabled(),
        };
      case 'range':
        return {
          value: this.rangeValue(),
          min: this.rangeMin(),
          max: this.rangeMax(),
          step: this.rangeStep(),
          disabled: this.rangeDisabled(),
        };
      case 'checkbox':
        return {
          checked: this.checkboxChecked(),
          label: this.checkboxLabel(),
          size: this.checkboxSize(),
          disabled: this.checkboxDisabled(),
          readonly: this.checkboxReadonly(),
          invalid: this.checkboxInvalid(),
          indeterminate: this.checkboxIndeterminate(),
        };
      case 'kbd':
        return {
          comboMode: this.kbdComboMode(),
          singleKey: this.kbdSingleKey(),
          comboKeys: this.kbdComboKeys(),
          comboInput: this.kbdComboInput(),
        };
      case 'pill':
        return {
          status: this.pillStatus(),
          size: this.pillSize(),
        };
      case 'dot':
        return {
          status: this.dotStatus(),
          size: this.dotSize(),
          pulse: this.dotPulse(),
        };
      case 'tag':
        return {
          label: this.tagLabel(),
          variant: this.tagVariant(),
          size: this.tagSize(),
          icon: this.tagIcon(),
          removable: this.tagRemovable(),
          disabled: this.tagDisabled(),
        };
      case 'stat':
        return {
          label: this.statLabel(),
          value: this.statValue(),
          sublabel: this.statSublabel(),
          tone: this.statTone(),
          trend: this.statTrend() ?? null,
        };
      case 'progress':
        return {
          value: this.progressValue(),
          mode: this.progressMode(),
          tone: this.progressTone(),
          label: this.progressLabel(),
          unit: this.progressUnit(),
          showValue: this.progressShowVal(),
          animated: this.progressAnimated(),
        };
      case 'ascii':
        return {
          value: this.asciiValue(),
          width: this.asciiWidth(),
          filledChar: this.asciiFilledChar(),
          emptyChar: this.asciiEmptyChar(),
          showValue: this.asciiShowValue(),
        };
      case 'toast':
        return {
          message: this.toastMessage(),
          type: this.toastType(),
          withDetails: this.toastWithDetails(),
          life: this.toastLife(),
          sticky: this.toastSticky(),
          position: this.toastPosition(),
          maxVisible: this.toastMaxVisible(),
          detailCode: this.toastDetailCode(),
          detailService: this.toastDetailService(),
          detailHttp: this.toastDetailHttp(),
          detailTrace: this.toastDetailTrace(),
          detailStack: this.toastDetailStack(),
          detailActionLabel: this.toastDetailActionLabel(),
          detailActionUrl: this.toastDetailActionUrl(),
        };
      case 'message':
        return {
          severity: this.msgSeverity(),
          variant: this.msgVariant(),
          text: this.msgText(),
          closable: this.msgClosable(),
          icon: this.msgIcon(),
        };
      case 'skeleton':
        return {
          width: this.skelWidth(),
          height: this.skelHeight(),
          shape: this.skelShape(),
          animation: this.skelAnimation(),
          count: this.skelCount(),
        };
      case 'modal':
        return {
          title: this.modalTitle(),
          subtitle: this.modalSubtitle(),
          size: this.modalSize(),
          closeOnBackdrop: this.modalCloseOnBackdrop(),
          showCloseButton: this.modalShowCloseButton(),
        };
      case 'collapsible':
        return {
          title: this.collapsibleTitle(),
          collapsed: this.collapsibleCollapsed(),
          disabled: this.collapsibleDisabled(),
        };
      case 'code':
        return { language: this.codeLanguage(), framed: this.codeFramed() };
      case 'toolbar-search':
        return { placeholder: this.toolbarSearchPlaceholder() };
      case 'notif-item':
        return {
          type: this.notifItemType(), source: this.notifItemSource(),
          title: this.notifItemTitle(), subtitle: this.notifItemSubtitle(),
          read: this.notifItemRead(),
        };
      case 'notif-stream':
        return {};
      case 'priority-indicator':
        return { priority: this.priorityKnob() };
      case 'visibility-chip':
        return { visibility: this.visibilityKnob() };
      case 'retro-filter-bar':
        return { active: this.filterBarActive() };
      case 'retro-grid-row':
        return {};
      case 'retro-expandable-row':
        return {};
      case 'retro-paginator':
        return {};
      case 'retro-status-bar':
        return {};
      case 'retro-data-grid':
        return {};
      case 'terminal':
        return {
          prompt: this.termPrompt(),
          typewriterSpeed: this.termTypewriterSpeed(),
        };
      case 'segmented':
        return {
          options: this.segOptions(),
          value: this.segValue(),
          direction: this.segDir(),
        };
      case 'button-group':
        return {};
      case 'api-table':
        return {};
      case 'retro-tabs':
        return {
          variant:      this.tabsVariant(),
          count:        this.tabsCount(),
          disabledIdx:  this.tabsDisabledIdx(),
          showIcon:     this.tabsShowIcon(),
          showBadge:    this.tabsShowBadge(),
        };
      case 'retro-section':
        return { variant: this.sectionVariant() };
      default:
        return {};
    }
  }

  private restoreStoryState(storyId: StoryId, state: any): void {
    if (!state) {
      return;
    }

    switch (storyId) {
      case 'win':
        if (typeof state.title === 'string') this.winTitle.set(state.title);
        if (typeof state.subtitle === 'string') this.winSubtitle.set(state.subtitle);
        if (state.variant === 'default' || state.variant === 'terminal' || state.variant === 'system' || state.variant === 'alert' || state.variant === 'ghost') this.winVariant.set(state.variant);
        if (state.padding === 'none' || state.padding === 'sm' || state.padding === 'md' || state.padding === 'lg') this.winPadding.set(state.padding);
        if (state.status === '' || state.status === 'idle' || state.status === 'active' || state.status === 'loading' || state.status === 'error') this.winStatus.set(state.status);
        if (typeof state.scrollable === 'boolean') this.winScrollable.set(state.scrollable);
        if (typeof state.loading === 'boolean') this.winLoading.set(state.loading);
        if (typeof state.footer === 'string') this.winFooter.set(state.footer);
        if (typeof state.ctrlMinimize === 'boolean') this.winCtrlMinimize.set(state.ctrlMinimize);
        if (typeof state.ctrlMaximize === 'boolean') this.winCtrlMaximize.set(state.ctrlMaximize);
        if (typeof state.ctrlClose === 'boolean') this.winCtrlClose.set(state.ctrlClose);
        break;
      case 'button':
        if (typeof state.label === 'string') this.btnLabel.set(state.label);
        if (state.variant === 'primary' || state.variant === 'secondary' || state.variant === 'ghost') this.btnVariant.set(state.variant);
        if (state.tone === 'default' || state.tone === 'success' || state.tone === 'warning' || state.tone === 'danger') this.btnTone.set(state.tone);
        if (state.size === 'sm' || state.size === 'md' || state.size === 'lg') this.btnSize.set(state.size);
        if (typeof state.icon === 'string') this.btnIcon.set(state.icon);
        if (state.iconPos === 'left' || state.iconPos === 'right') this.btnIconPos.set(state.iconPos);
        if (typeof state.badge === 'string') this.btnBadge.set(state.badge);
        if (typeof state.href === 'string') this.btnHref.set(state.href);
        if (typeof state.download === 'string') this.btnDownload.set(state.download);
        if (typeof state.disabled === 'boolean') this.btnDisabled.set(state.disabled);
        if (typeof state.loading === 'boolean') this.btnLoading.set(state.loading);
        if (typeof state.fullWidth === 'boolean') this.btnFullWidth.set(state.fullWidth);
        break;
      case 'input':
        if (typeof state.value === 'string') this.inputValue.set(state.value);
        if (typeof state.placeholder === 'string') this.inputPlaceholder.set(state.placeholder);
        if (state.type === 'text' || state.type === 'search' || state.type === 'number' || state.type === 'email' || state.type === 'password') this.inputType.set(state.type);
        if (state.size === 'sm' || state.size === 'md' || state.size === 'lg') this.inputSize.set(state.size);
        if (typeof state.prefix === 'string') this.inputPrefix.set(state.prefix);
        if (typeof state.suffix === 'string') this.inputSuffix.set(state.suffix);
        if (typeof state.disabled === 'boolean') this.inputDisabled.set(state.disabled);
        if (typeof state.readonly === 'boolean') this.inputReadonly.set(state.readonly);
        if (typeof state.invalid === 'boolean') this.inputInvalid.set(state.invalid);
        if (typeof state.errorMessage === 'string') this.inputErrorMessage.set(state.errorMessage);
        if (typeof state.helpText === 'string') this.inputHelpText.set(state.helpText);
        if (typeof state.clearable === 'boolean') this.inputClearable.set(state.clearable);
        if (typeof state.fullWidth === 'boolean') this.inputFullWidth.set(state.fullWidth);
        break;
      case 'select':
        if (typeof state.value === 'string') this.selectValue.set(state.value);
        if (state.size === 'sm' || state.size === 'md') this.selectSize.set(state.size);
        if (typeof state.disabled === 'boolean') this.selectDisabled.set(state.disabled);
        break;
      case 'range':
        if (typeof state.value === 'number') this.rangeValue.set(state.value);
        if (typeof state.min === 'number') this.rangeMin.set(state.min);
        if (typeof state.max === 'number') this.rangeMax.set(state.max);
        if (typeof state.step === 'number') this.rangeStep.set(state.step);
        if (typeof state.disabled === 'boolean') this.rangeDisabled.set(state.disabled);
        break;
      case 'checkbox':
        if (typeof state.checked === 'boolean') this.checkboxChecked.set(state.checked);
        if (typeof state.label === 'string') this.checkboxLabel.set(state.label);
        if (state.size === 'sm' || state.size === 'md' || state.size === 'lg') this.checkboxSize.set(state.size);
        if (typeof state.disabled === 'boolean') this.checkboxDisabled.set(state.disabled);
        if (typeof state.readonly === 'boolean') this.checkboxReadonly.set(state.readonly);
        if (typeof state.invalid === 'boolean') this.checkboxInvalid.set(state.invalid);
        if (typeof state.indeterminate === 'boolean') this.checkboxIndeterminate.set(state.indeterminate);
        break;
      case 'kbd':
        if (typeof state.comboMode === 'boolean') this.kbdComboMode.set(state.comboMode);
        if (typeof state.singleKey === 'string') this.kbdSingleKey.set(state.singleKey);
        if (Array.isArray(state.comboKeys) && state.comboKeys.every((value: any) => typeof value === 'string')) this.kbdComboKeys.set([...state.comboKeys]);
        if (typeof state.comboInput === 'string') this.kbdComboInput.set(state.comboInput);
        break;
      case 'pill':
        if (typeof state.status === 'string') this.pillStatus.set(state.status);
        if (state.size === 'sm' || state.size === 'md' || state.size === 'lg') this.pillSize.set(state.size);
        break;
      case 'dot':
        if (typeof state.status === 'string') this.dotStatus.set(state.status);
        if (state.size === 'sm' || state.size === 'md' || state.size === 'lg') this.dotSize.set(state.size);
        if (typeof state.pulse === 'boolean') this.dotPulse.set(state.pulse);
        break;
      case 'tag':
        if (typeof state.label === 'string') this.tagLabel.set(state.label);
        if (state.variant === 'default' || state.variant === 'primary' || state.variant === 'success' || state.variant === 'warning' || state.variant === 'danger') this.tagVariant.set(state.variant);
        if (state.size === 'sm' || state.size === 'md') this.tagSize.set(state.size);
        if (typeof state.icon === 'string') this.tagIcon.set(state.icon);
        if (typeof state.removable === 'boolean') this.tagRemovable.set(state.removable);
        if (typeof state.disabled === 'boolean') this.tagDisabled.set(state.disabled);
        break;
      case 'stat':
        if (typeof state.label === 'string') this.statLabel.set(state.label);
        if (typeof state.value === 'string' || typeof state.value === 'number') this.statValue.set(state.value);
        if (typeof state.sublabel === 'string') this.statSublabel.set(state.sublabel);
        if (state.tone === 'default' || state.tone === 'success' || state.tone === 'warning' || state.tone === 'danger') this.statTone.set(state.tone);
        if (state.trend === null || state.trend === 'up' || state.trend === 'down' || state.trend === 'neutral') this.statTrend.set(state.trend ?? undefined);
        break;
      case 'progress':
        if (typeof state.value === 'number') this.progressValue.set(state.value);
        if (state.mode === 'determinate' || state.mode === 'indeterminate') this.progressMode.set(state.mode);
        if (state.tone === 'default' || state.tone === 'success' || state.tone === 'warning' || state.tone === 'danger') this.progressTone.set(state.tone);
        if (typeof state.label === 'string') this.progressLabel.set(state.label);
        if (typeof state.unit === 'string') this.progressUnit.set(state.unit);
        if (typeof state.showValue === 'boolean') this.progressShowVal.set(state.showValue);
        if (typeof state.animated === 'boolean') this.progressAnimated.set(state.animated);
        break;
      case 'ascii':
        if (typeof state.value === 'number') this.asciiValue.set(state.value);
        if (typeof state.width === 'number') this.asciiWidth.set(state.width);
        if (typeof state.filledChar === 'string') this.asciiFilledChar.set(state.filledChar);
        if (typeof state.emptyChar === 'string') this.asciiEmptyChar.set(state.emptyChar);
        if (typeof state.showValue === 'boolean') this.asciiShowValue.set(state.showValue);
        break;
      case 'toast':
        if (typeof state.message === 'string') this.toastMessage.set(state.message);
        if (state.type === 'event' || state.type === 'success' || state.type === 'warning' || state.type === 'error') this.toastType.set(state.type);
        if (typeof state.withDetails === 'boolean') this.toastWithDetails.set(state.withDetails);
        if (typeof state.life === 'number') this.toastLife.set(state.life);
        if (typeof state.sticky === 'boolean') this.toastSticky.set(state.sticky);
        if (
          state.position === 'bottom-right'
          || state.position === 'bottom-left'
          || state.position === 'top-right'
          || state.position === 'top-left'
          || state.position === 'top-center'
          || state.position === 'bottom-center'
        ) this.toastPosition.set(state.position);
        if (typeof state.maxVisible === 'number') this.toastMaxVisible.set(state.maxVisible);
        if (typeof state.detailCode === 'string') this.toastDetailCode.set(state.detailCode);
        if (typeof state.detailService === 'string') this.toastDetailService.set(state.detailService);
        if (typeof state.detailHttp === 'string') this.toastDetailHttp.set(state.detailHttp);
        if (typeof state.detailTrace === 'string') this.toastDetailTrace.set(state.detailTrace);
        if (typeof state.detailStack === 'string') this.toastDetailStack.set(state.detailStack);
        if (typeof state.detailActionLabel === 'string') this.toastDetailActionLabel.set(state.detailActionLabel);
        if (typeof state.detailActionUrl === 'string') this.toastDetailActionUrl.set(state.detailActionUrl);
        break;
      case 'message':
        if (state.severity === 'info' || state.severity === 'success' || state.severity === 'warning' || state.severity === 'error') this.msgSeverity.set(state.severity);
        if (state.variant === 'filled' || state.variant === 'outlined' || state.variant === 'ghost') this.msgVariant.set(state.variant);
        if (typeof state.text === 'string') this.msgText.set(state.text);
        if (typeof state.closable === 'boolean') this.msgClosable.set(state.closable);
        if (typeof state.icon === 'string') this.msgIcon.set(state.icon);
        break;
      case 'skeleton':
        if (typeof state.width === 'string') this.skelWidth.set(state.width);
        if (typeof state.height === 'string') this.skelHeight.set(state.height);
        if (state.shape === 'rectangle' || state.shape === 'circle') this.skelShape.set(state.shape);
        if (state.animation === 'wave' || state.animation === 'pulse' || state.animation === 'none') this.skelAnimation.set(state.animation);
        if (typeof state.count === 'number') this.skelCount.set(state.count);
        break;
      case 'modal':
        if (typeof state.title === 'string') this.modalTitle.set(state.title);
        if (typeof state.subtitle === 'string') this.modalSubtitle.set(state.subtitle);
        if (state.size === 'sm' || state.size === 'md' || state.size === 'lg') this.modalSize.set(state.size);
        if (typeof state.closeOnBackdrop === 'boolean') this.modalCloseOnBackdrop.set(state.closeOnBackdrop);
        if (typeof state.showCloseButton === 'boolean') this.modalShowCloseButton.set(state.showCloseButton);
        break;
      case 'collapsible':
        if (typeof state.title === 'string') this.collapsibleTitle.set(state.title);
        if (typeof state.collapsed === 'boolean') this.collapsibleCollapsed.set(state.collapsed);
        if (typeof state.disabled === 'boolean') this.collapsibleDisabled.set(state.disabled);
        break;
      case 'code':
        if (typeof state.language === 'string') this.codeLanguage.set(state.language);
        if (typeof state.framed === 'boolean') this.codeFramed.set(state.framed);
        break;
      case 'toolbar-search':
        if (typeof state.placeholder === 'string') this.toolbarSearchPlaceholder.set(state.placeholder);
        break;
      case 'notif-item':
        if (state.type === 'event' || state.type === 'build' || state.type === 'alert') this.notifItemType.set(state.type);
        if (state.source === 'webhook' || state.source === 'email' || state.source === 'system') this.notifItemSource.set(state.source);
        if (typeof state.title === 'string')    this.notifItemTitle.set(state.title);
        if (typeof state.subtitle === 'string') this.notifItemSubtitle.set(state.subtitle);
        if (typeof state.read === 'boolean')    this.notifItemRead.set(state.read);
        break;
      case 'notif-stream':
        break;
      case 'priority-indicator':
        if (['critical','high','medium','low','none'].includes(state.priority)) this.priorityKnob.set(state.priority);
        break;
      case 'visibility-chip':
        if (['public','private','internal'].includes(state.visibility)) this.visibilityKnob.set(state.visibility);
        break;
      case 'retro-filter-bar':
        if (typeof state.active === 'string') this.filterBarActive.set(state.active);
        break;
      case 'retro-grid-row':
        break;
      case 'retro-expandable-row':
        break;
      case 'retro-paginator':
        break;
      case 'retro-status-bar':
        break;
      case 'retro-data-grid':
        break;
      case 'terminal':
        if (typeof state.prompt === 'string') this.termPrompt.set(state.prompt);
        if (typeof state.typewriterSpeed === 'number') this.termTypewriterSpeed.set(state.typewriterSpeed);
        break;
      case 'segmented':
        if (Array.isArray(state.options) && state.options.every((o: any) => typeof o === 'string')) this.segOptions.set(state.options);
        if (typeof state.value === 'string') this.segValue.set(state.value);
        if (state.direction === 'row' || state.direction === 'col') this.segDir.set(state.direction);
        break;
      case 'button-group':
        break;
      case 'api-table':
        break;
      case 'retro-tabs':
        if (state.variant === 'default' || state.variant === 'terminal' || state.variant === 'system' || state.variant === 'alert' || state.variant === 'ghost') this.tabsVariant.set(state.variant);
        if (typeof state.count === 'number' && state.count >= 2 && state.count <= 8) this.tabsCount.set(state.count);
        if (typeof state.disabledIdx === 'number') this.tabsDisabledIdx.set(state.disabledIdx);
        if (typeof state.showIcon === 'boolean') this.tabsShowIcon.set(state.showIcon);
        if (typeof state.showBadge === 'boolean') this.tabsShowBadge.set(state.showBadge);
        break;
      case 'retro-section':
        if (state.variant === 'default' || state.variant === 'terminal' || state.variant === 'system' || state.variant === 'alert' || state.variant === 'ghost') this.sectionVariant.set(state.variant);
        break;
    }
  }

}
