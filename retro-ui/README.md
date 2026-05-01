# retro-ui

Angular 21 standalone component library with a retro terminal / phosphor-monitor aesthetic.

## Stack

- Angular 21 (standalone components, signals-first, zoneless-ready)
- TypeScript 5.9 (strict mode)
- SCSS
- Vitest (unit tests)
- ng-packagr (library build)

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

## What's inside

- 30+ standalone UI components (buttons, inputs, selects, modals, tables, terminal, etc.)
- Theme service with 6 built-in color schemes
- CSS custom properties (tokens) for theming
- Accessibility features (keyboard navigation, ARIA, focus traps)

## Related repositories

- [retro-ui-showcase](../retro-ui-showcase) — interactive documentation and component playground
- [devboard](../devboard) — project management dashboard (consumer)
- [resume](../resume) — interactive portfolio (consumer)

## Notes

- This project does **not** use NgModules. Every component is `standalone`.
- The library must be built (`ng build retro-ui`) before consumers can use it.
