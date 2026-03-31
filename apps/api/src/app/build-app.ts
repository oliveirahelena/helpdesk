import Fastify from "fastify";
import cors from "@fastify/cors";

import { loadApiEnv } from "../platform/config/env";
import { buildLoggerOptions } from "../platform/observability/logger";
import { authPlugin } from "./plugins/auth";
import { configPlugin } from "./plugins/config";
import { databasePlugin } from "./plugins/database";
import { observabilityPlugin } from "./plugins/observability";
import { routesPlugin } from "./plugins/routes";

function isAllowedWebOrigin(origin: string, configuredWebAppUrl: string) {
  if (origin === configuredWebAppUrl) {
    return true;
  }

  try {
    const originUrl = new URL(origin);

    return originUrl.protocol === "http:" && (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}

export async function buildApp() {
  const env = loadApiEnv();

  const app = Fastify({
    logger: buildLoggerOptions(env)
  });

  await app.register(cors, {
    origin: (origin, callback) => {
      if (!origin || isAllowedWebOrigin(origin, env.WEB_APP_URL)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS."), false);
    },
    credentials: true
  });
  await app.register(configPlugin);
  await app.register(databasePlugin);
  await app.register(observabilityPlugin);
  await app.register(authPlugin);
  await app.register(routesPlugin);

  return app;
}
