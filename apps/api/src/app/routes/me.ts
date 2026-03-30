import type { FastifyPluginAsync } from "fastify";

export const meRoute: FastifyPluginAsync = async (app) => {
  app.get("/api/me", { preHandler: app.requireAuth }, async (request, reply) => {
    return reply.send(request.authSession);
  });
};
