# retro-ui-showcase

Interactive showcase and documentation app for the `retro-ui` component library.

## Stack

- Angular 21 (standalone components, signals, lazy loading)
- TypeScript 5.9 (strict mode)
- SCSS
- Vitest (unit tests)

## Prerequisites

- Node.js >= 20
- npm >= 10

## Install

```bash
npm install
```

**Important:** the `retro-ui` library must be built first:

```bash
cd ../retro-ui
ng build retro-ui
```

## Run locally

```bash
ng serve
```

Navigate to `http://localhost:4200/`.

## Build

```bash
ng build
```

## Test

```bash
ng test
```

## Local dependency

This app consumes `@retro-ui` via TypeScript path mapping:

```json
"paths": {
  "@retro-ui": ["../retro-ui/dist/retro-ui"]
}
```

The library must be rebuilt after any change to `retro-ui`.

## Related repositories

- [retro-ui](../retro-ui) — the component library
- [devboard](../devboard) — project management dashboard
- [resume](../resume) — interactive portfolio
