# AGENTS.md

## Project Memory

### Overview

- Project: `helpdesk`
- Repository type: monorepo
- Package manager: `bun@1.2.18`
- Workspace orchestration: Turborepo
- Workspace layout:
  - `apps/web`: React web app
  - `apps/api`: Fastify API
  - `apps/workers`: background workers
  - `packages/contracts`: shared Zod contracts
  - `packages/database`: Drizzle database layer
  - `packages/ui`: shared UI components
  - `packages/config`: shared configuration

### Main Stack

- Frontend: React 19, Vite, TanStack Router, TanStack Query, Zod
- API: Fastify 5
- Workers: BullMQ, Redis
- Database: PostgreSQL, Drizzle ORM
- Testing: Vitest, Playwright
- Language: TypeScript

### Important Commands

- Install dependencies: `bun install`
- Start all apps: `bun run dev`
- Build all workspaces: `bun run build`
- Lint all workspaces: `bun run lint`
- Typecheck all workspaces: `bun run typecheck`
- Run all tests: `bun run test`
- Run unit tests: `bun run test:unit`
- Run integration tests: `bun run test:integration`
- Run e2e tests: `bun run test:e2e`
- Start local infra: `bun run docker:up`
- Stop local infra: `bun run docker:down`

### App Notes

- `apps/web`
  - Uses React + Vite.
  - Routing is built with TanStack Router.
  - Server state uses TanStack Query.
- `apps/api`
  - Uses Fastify.
  - Exposes `GET /health`.
  - Shares response contracts through `@helpdesk/contracts`.
- `apps/workers`
  - Uses BullMQ with Redis.
- `packages/contracts`
  - Shared schemas and DTO contracts should be the source of truth between apps.

## Working Rules

### Context7 Requirement

- Every implementation task must use the Context7 MCP to consult the most current documentation before coding when the work involves any library, framework, SDK, API, CLI tool, or cloud service.
- This applies even when the technology is already familiar.
- Minimum workflow:
  1. Resolve the library ID with Context7.
  2. Query the docs with the actual task context.
  3. Implement based on the current documentation returned.
- This rule covers, at minimum: React, Vite, TanStack Router, TanStack Query, Fastify, Drizzle, BullMQ, Zod, Playwright, Vitest, PostgreSQL tooling, and any external SDK or service added later.

### Implementation Guidance

- Prefer shared contracts from `packages/contracts` instead of duplicating request or response types.
- Keep web routes and page components separated by responsibility.
- Keep authenticated and public route trees distinct.
- Validate API payloads with shared Zod schemas whenever practical.
- Prefer focused tests close to the changed workspace.

### Repository Conventions

- Web code lives under `apps/web/src`.
- API code lives under `apps/api/src`.
- Worker code lives under `apps/workers/src`.
- Shared packages should be reused before introducing new local abstractions.

