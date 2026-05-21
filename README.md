# TV Recommend

[![pipeline status](https://gitlab.com/rimssboui/tv-recommend-app/badges/main/pipeline.svg)](https://gitlab.com/rimssboui/tv-recommend-app/-/commits/main)

A small Angular app for browsing trending movies and TV shows, powered by the [TMDB](https://www.themoviedb.org/) API. Built as a portfolio piece showcasing modern Angular (standalone components, the new control-flow syntax, lazy-loaded routes) and PrimeNG's design tokens for the dark theme.

<img width="1800" alt="Home view" src="https://github.com/user-attachments/assets/bcd4f083-7c15-4b33-9b30-068184874413" />

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Angular 19 (standalone components, `@if`/`@for` control flow, lazy routes) |
| Language | TypeScript 5.6 (strict + `strictTemplates`) |
| UI | PrimeNG 19 (Aura theme preset), PrimeFlex grid, Material Symbols icons |
| Tooling | ESLint 9 (flat config) + @angular-eslint, Karma + Jasmine, Angular CLI |
| Data | [TMDB v3 REST API](https://developer.themoviedb.org/reference/intro/getting-started) |

## Getting started

### 1. Prerequisites

- Node.js 20+
- A free [TMDB v3 API key](https://www.themoviedb.org/settings/api)

### 2. Configure your API key

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
# then open src/environments/environment.ts and paste your key into `apiKey`
```

`environment.ts` is git-ignored, so your key never leaves your machine.

### 3. Run

```bash
npm install
npm start            # http://localhost:4200
```

## Scripts

| Command         | What it does |
| --------------- | ----------------------------------------- |
| `npm start`     | Dev server on http://localhost:4200 with HMR |
| `npm run build` | Production build into `dist/tv-recommend-app/` |
| `npm run lint`  | ESLint over `src/**/*.{ts,html}` |
| `npm test`      | Run unit tests in headless Chrome |

## Project layout

```
src/
├── app/
│   ├── app.component.ts        # root shell (header + <router-outlet> + footer)
│   ├── app.config.ts           # standalone providers: router, http, PrimeNG, animations
│   ├── app.routes.ts           # lazy-loaded page routes
│   ├── components/             # reusable presentational pieces (item, slider, items-banner, video-player)
│   ├── pages/                  # top-level routes (home, movies, tvshows, categories, movie-details)
│   ├── shared/                 # cross-page bits (header, footer)
│   ├── services/               # HTTP services (movies, tvshow) — all use the env-driven base URL + API key
│   └── models/                 # TS interfaces for TMDB DTOs
├── environments/               # environment.example.ts (template), environment.ts (gitignored)
├── styles/                     # global SCSS partials (variables, normalize)
└── styles.scss                 # global entrypoint
```

## Notes

- **Standalone components everywhere** — no `NgModule`. The router uses `loadComponent` for code-split pages.
- **Templates use the new control flow** (`@if`, `@for`, `@switch`, `@empty`) — no `*ngIf`/`*ngFor`.
- **Services use `inject()`** instead of constructor DI.
- **Theme**: PrimeNG's Aura preset with a dark color scheme (`<html class="app-dark">` in `index.html`).

## License

MIT.

## Author

[Rim Sboui](https://gitlab.com/rimssboui) · [GitHub mirror](https://github.com/reemsb/tv-recommend-app)
