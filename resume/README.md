# resume

Interactive portfolio and resume app built with Angular 21 and the `retro-ui` design system.

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

## Architecture

- `ResumePageComponent` and `ResumeNowPlayingComponent` are domain-specific to this app.
- Generic visual components come from `@retro-ui`.
- `ThemeService` is imported from `@retro-ui`.
- `GithubUserService` fetches public GitHub stats for the portfolio.

## Local dependency

This app consumes `@retro-ui` via TypeScript path mapping:

```json
"paths": {
  "@retro-ui": ["../retro-ui/dist/retro-ui"],
  "@app/*": ["src/app/*"]
}
```

The library must be rebuilt after any change to `retro-ui`.

## Related repositories

- [retro-ui](../retro-ui) — the component library
- [retro-ui-showcase](../retro-ui-showcase) — interactive component playground
- [devboard](../devboard) — project management dashboard
