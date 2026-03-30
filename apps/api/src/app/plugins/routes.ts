import fp from "fastify-plugin";

import { healthRoute } from "../routes/health";

export const routesPlugin = fp(async (app) => {
  await app.register(healthRoute);
});
