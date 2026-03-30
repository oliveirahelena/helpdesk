import type { FastifyPluginAsync } from "fastify";

import { healthCheckResponseSchema } from "@helpdesk/contracts/api/health";

export const healthRoute: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => {
    return healthCheckResponseSchema.parse({
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString()
    });
  });
};
