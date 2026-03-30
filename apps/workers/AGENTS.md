# AGENTS.md

## App Memory

- App: `@helpdesk/workers`
- Type: background worker application
- Language: TypeScript
- Main libraries:
  - BullMQ
  - ioredis
  - Zod
  - `@helpdesk/contracts`
  - `@helpdesk/database`

## Directory Notes

- Source code lives in `src/`
- Worker bootstrap code should stay near the application entrypoints.
- Queue and job logic should be organized to keep orchestration separate from business logic.

## Worker Conventions

- Reuse shared contracts and database packages instead of redefining cross-app types.
- Keep queue bootstrap, worker lifecycle, and job handlers clearly separated.
- Treat Redis and queue configuration as infrastructure boundaries, not business logic.

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
- This rule always applies to BullMQ, ioredis, Redis-related tooling, worker runtime libraries, and any external infrastructure SDK used by the workers.

