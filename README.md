# HelpDesk Phase 1 Foundation

Monorepo base da Phase 1 do HelpDesk, alinhada ao PRD e à technical spec.

## Stack

- Bun workspaces + Turborepo
- React 19 + Vite + TanStack Router + TanStack Query
- Fastify 5
- BullMQ + Redis
- Drizzle ORM + PostgreSQL
- Vitest + Playwright

## Estrutura

- `apps/web`: shell autenticado placeholder e dashboard inicial
- `apps/api`: API modular com `/health` e wiring de auth
- `apps/workers`: bootstrap de filas placeholder
- `packages/contracts`: contratos Zod compartilhados
- `packages/database`: client e schema Drizzle
- `packages/ui`: primitives reutilizáveis
- `packages/config`: configs compartilhadas

## Setup local

1. Instale dependências com `bun install`.
2. Copie `.env.example` para `.env`.
3. Suba infra local com `bun run docker:up`.
4. Rode o workspace com `bun run dev`.

## Comandos

- `bun run build`
- `bun run lint`
- `bun run typecheck`
- `bun run test`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:e2e -- --list`

## Deploy foundation

- `apps/web`: bundle estático
- `apps/api`: imagem Docker separada
- `apps/workers`: imagem Docker separada

Os workflows em `.github/workflows` preparam CI e stubs de deploy para `staging` e `production`.
