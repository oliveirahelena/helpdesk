import { buildApp } from "./build-app";

export async function startServer() {
  const app = await buildApp();

  await app.listen({
    host: process.env.API_HOST ?? "0.0.0.0",
    port: Number(process.env.API_PORT ?? "3001")
  });

  return app;
}
