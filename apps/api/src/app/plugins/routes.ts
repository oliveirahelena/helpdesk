import fp from "fastify-plugin";

import { healthRoute } from "../routes/health";
import { meRoute } from "../routes/me";

export const routesPlugin = fp(async (app) => {
  await app.register(healthRoute);
  await app.register(meRoute);
});
