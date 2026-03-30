import Fastify from "fastify";
import cors from "@fastify/cors";

import { loadApiEnv } from "../platform/config/env";
import { buildLoggerOptions } from "../platform/observability/logger";
import { authPlugin } from "./plugins/auth";
import { configPlugin } from "./plugins/config";
import { databasePlugin } from "./plugins/database";
import { observabilityPlugin } from "./plugins/observability";
import { routesPlugin } from "./plugins/routes";

export async function buildApp() {
  const env = loadApiEnv();

  const app = Fastify({
    logger: buildLoggerOptions(env)
  });

  await app.register(cors, {
    origin: true
  });
  await app.register(configPlugin);
  await app.register(databasePlugin);
  await app.register(observabilityPlugin);
  await app.register(authPlugin);
  await app.register(routesPlugin);

  return app;
}
