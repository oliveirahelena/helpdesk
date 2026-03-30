import fp from "fastify-plugin";

import type { DatabaseInstance } from "@helpdesk/database";

import { createPlatformDatabase } from "../../platform/db/connection";

export type ApiDatabase = DatabaseInstance;

declare module "fastify" {
  interface FastifyInstance {
    db: ApiDatabase;
  }
}

export const databasePlugin = fp(async (app) => {
  const database = createPlatformDatabase(app.appEnv);

  await database.client.connect();

  app.decorate("db", database.db);

  app.addHook("onClose", async () => {
    await database.client.end();
  });
});
