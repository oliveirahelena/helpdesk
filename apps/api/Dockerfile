FROM oven/bun:1
WORKDIR /app

COPY . .
RUN bun install
RUN bun run --cwd apps/api build

CMD ["bun", "run", "--cwd", "apps/api", "src/server.ts"]
