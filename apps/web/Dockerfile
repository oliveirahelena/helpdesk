FROM oven/bun:1 AS build
WORKDIR /app

COPY . .
RUN bun install
RUN bun run --cwd apps/web build

FROM nginx:1.29-alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
