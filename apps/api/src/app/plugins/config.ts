import fp from "fastify-plugin";

import { loadApiEnv } from "../../platform/config/env";

declare module "fastify" {
  interface FastifyInstance {
    appEnv: ReturnType<typeof loadApiEnv>;
  }
}

export const configPlugin = fp(async (app) => {
  app.decorate("appEnv", loadApiEnv());
});
