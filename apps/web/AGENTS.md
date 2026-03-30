# AGENTS.md

## App Memory

- App: `@helpdesk/web`
- Type: React web application
- Build tool: Vite
- Language: TypeScript
- Main libraries:
  - React 19
  - TanStack Router
  - TanStack Query
  - Zod
  - `@helpdesk/ui`
  - `@helpdesk/contracts`

## Directory Notes

- Source code lives in `src/`
- Routes live in `src/routes`
- Shared app providers live in `src/app/providers`
- Feature code should stay grouped under `src/features`
- Shared UI glue code lives under `src/shared`

## Route Conventions

- Public routes must stay separate from authenticated routes.
- Authenticated route layout is defined under `src/routes/_authenticated`.
- Do not place public pages under authenticated route wrappers.
- Home (`/`) and dashboard (`/dashboard`) are different pages and should not share the same page component unless explicitly intended.

## Data and Contracts

- Prefer shared contracts from `@helpdesk/contracts`.
- Validate API responses with shared Zod schemas where practical.
- Prefer small API boundary functions plus dedicated React Query hooks.

## Commands

- Dev: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`
- Typecheck: `bun run typecheck`
- Test: `bun run test`

## Required Rule: Context7

- Every implementation that touches a library, framework, SDK, API, CLI tool, or cloud service must consult Context7 before coding.
- Minimum flow:
  1. Resolve the library ID.
  2. Query the docs with the actual implementation task.
  3. Implement from the current docs.
- This rule always applies to React, Vite, TanStack Router, TanStack Query, Vitest, Playwright, and any UI or routing library used in this app.

