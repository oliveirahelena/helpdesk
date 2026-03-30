# AGENTS.md

## App Memory

- App: `@helpdesk/api`
- Type: Fastify API
- Language: TypeScript
- Main libraries:
  - Fastify 5
  - Zod
  - `@helpdesk/contracts`
  - `@helpdesk/database`

## Directory Notes

- Source code lives in `src/`
- App wiring is under `src/app`
- Route registration lives under `src/app/plugins`
- HTTP route handlers live under `src/app/routes`
- Domain modules live under `src/modules`
- Platform concerns live under `src/platform`

## API Conventions

- Shared request and response shapes should come from `@helpdesk/contracts` whenever possible.
- Keep Fastify route wiring thin and push reusable logic into module or platform layers.
- Validate external input and output with Zod-based contracts.
- `GET /health` is a public route and must not require authentication.

## Commands

- Dev: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`
- Typecheck: `bun run typecheck`
- Test: `bun run test`
- Integration test example: `bun run test:integration`

## Required Rule: Context7

- Every implementation that touches a library, framework, SDK, API, CLI tool, or cloud service must consult Context7 before coding.
- Minimum flow:
  1. Resolve the library ID.
  2. Query the docs with the actual implementation task.
  3. Implement from the current docs.
- This rule always applies to Fastify, Zod, Drizzle, PostgreSQL-related tooling, auth libraries, queue integrations, and any external service SDK added to the API.

