# retro-ui

Angular 21 standalone component library with a retro terminal / CRT-monitor aesthetic.

## Visual Identity

`retro-ui` is built around a **retro/dark** visual language inspired by classic CRT monitors, amber/phosphor terminals, and early computing interfaces. Key design characteristics:

- **Monospace typography** — IBM Plex Mono, VT323, Cascadia Code
- **Chunky borders** — 2px solid borders with offset box shadows
- **Scanline overlays** — subtle CRT-style horizontal line patterns
- **Phosphor glow** — text-shadow effects on accent elements
- **Stepped animations** — retro `steps()` and discrete transitions
- **6 built-in themes** — Classic Amber, Phosphor Green, CRT Blue, Dark Amber, Synthwave, Solar Sepia

## Stack

- Angular 21 (standalone components, signals-first, zoneless-ready)
- TypeScript 5.9 (strict mode)
- SCSS with CSS custom properties (design tokens)
- Vitest (unit tests)
- ng-packagr (library build)

## UX/UI Principles

- **Consistency** — All components share the same border, shadow, and spacing language
- **Predictability** — States (hover, focus, active, disabled) behave uniformly across components
- **Affordance** — Interactive elements are clearly distinguishable via borders and shadows
- **Legibility** — Retro effects enhance rather than obscure readability
- **No excess** — Visual effects are restrained; scanlines and glow are subtle

## Accessibility

- Keyboard navigation on all interactive components
- Visible `:focus-visible` outlines with amber accent color
- ARIA roles, states, and properties where appropriate
- Semantic HTML elements (button, section, article, etc.)
- `type="button"` on all non-submit buttons
- Disabled states with proper `aria-disabled` and `cursor: not-allowed`
- Modal focus trap and escape-key dismissal
- Combobox pattern with `aria-activedescendant` on retro-select

## Prerequisites

- Node.js >= 20
- npm >= 10

## Install

```bash
npm install
```

## Build the library

```bash
ng build retro-ui
```

The build artifacts will be placed in `dist/retro-ui/`.

## Run tests

```bash
ng test retro-ui
```

## Consume locally

This library is consumed via local path mapping. Add to your `tsconfig.json`:

```json
"paths": {
  "@retro-ui": ["../retro-ui/dist/retro-ui"]
}
```

Then import components in your Angular app:

```typescript
import { RetroButtonComponent, RetroInputComponent } from '@retro-ui';
```

## What's inside

### Primitives / Atoms
- `retro-button` — Variant (primary/secondary/ghost), tone, size, loading, badge
- `retro-button-group` — Horizontal button grouping
- `retro-checkbox` — CVA-compatible, indeterminate, invalid state
- `retro-input` — CVA-compatible, prefix/suffix, clearable, error state
- `retro-select` — Custom dropdown, CVA-compatible, keyboard navigation
- `retro-range` — CVA-compatible, optional value display
- `retro-segmented` — Toggle group, CVA-compatible, row/col layout
- `retro-kbd` — Keyboard shortcut display
- `retro-tag` — Label tag with variant, removable, icon support
- `retro-code` — Syntax-highlighted code block with copy button

### Display / Molecules
- `retro-window` — Container with titlebar, variants (terminal/system/alert/ghost), controls
- `retro-section` — Lightweight bordered section with label
- `retro-modal` — Dialog with focus trap, backdrop click, escape dismissal
- `retro-collapsible` — Animated expand/collapse with grid-row technique
- `retro-tabs` — Tab list with keyboard navigation, variants, badges
- `retro-message` — Alert banners with severity, variant, closable
- `retro-progress` — Determinate/indeterminate, animated stripes
- `retro-skeleton` — Loading placeholders with wave/pulse animations
- `retro-toast` — Notification toasts with pause/resume, details, actions
- `ascii-bar` — ASCII-art progress bar
- `stat-box` — Metric display with trend indicator
- `status-dot` — Animated status indicator
- `status-pill` — Labeled status badge
- `priority-indicator` — Priority level symbol
- `visibility-chip` — Public/private/internal visibility badge

### Data / Tables
- `retro-data-grid` — Full-featured data table with sort, filter, resize, column picker
- `retro-grid-row` — Table row with density control
- `retro-expandable-row` — Expandable detail row
- `retro-paginator` — Smart pagination with ellipsis, page-size selector
- `retro-filter-bar` — Filter tabs with count badges, multi-select mode
- `api-table` — API documentation table
- `toolbar-search` — Search input with retro prefix

### Terminal
- `retro-terminal` — Interactive terminal emulator with command history, autocomplete
- `retro-notif-stream` — Notification feed with relative timestamps

### Theme
- `ThemeService` — Reactive theme switching via signal
- 6 built-in color schemes via CSS custom properties

## Current Limitations

- Consumed via local path mapping (not yet published as npm package)
- Test coverage is initial — form components have specs, visual components need more
- No i18n support — text content is in English, no translation mechanism
- No formal design token export (CSS variables are defined in `_tokens.scss`)

## Future Plans

- Publish as npm package or GitHub Package
- Expand test coverage to all components
- Add visual regression testing
- Consider i18n support for component text
- Add Storybook or similar documentation site

## Related repositories

- [retro-ui-showcase](../retro-ui-showcase) — interactive documentation and component playground
- [devboard](../devboard) — project management dashboard (consumer)
- [resume](../resume) — interactive portfolio (consumer)

## Notes

- This project does **not** use NgModules. Every component is `standalone`.
- All components use `ChangeDetectionStrategy.OnPush`.
- The library must be built (`ng build retro-ui`) before consumers can use it.
