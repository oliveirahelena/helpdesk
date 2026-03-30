import fp from "fastify-plugin";

import { createAuthFoundationProof } from "../../platform/auth/foundation";

declare module "fastify" {
  interface FastifyInstance {
    authFoundation: ReturnType<typeof createAuthFoundationProof>;
  }
}

export const authPlugin = fp(async (app) => {
  app.decorate("authFoundation", createAuthFoundationProof(app.appEnv));
});
