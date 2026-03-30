import fp from "fastify-plugin";

export const observabilityPlugin = fp(async (app) => {
  app.log.info("observability scaffold registered");
});
