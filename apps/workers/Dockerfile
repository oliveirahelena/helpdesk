FROM oven/bun:1
WORKDIR /app

COPY . .
RUN bun install
RUN bun run --cwd apps/workers build

CMD ["bun", "run", "--cwd", "apps/workers", "src/index.ts"]
