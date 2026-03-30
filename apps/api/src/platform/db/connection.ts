import { createDatabaseClient } from "@helpdesk/database";

import type { ApiEnv } from "../config/env";

export function createPlatformDatabase(env: ApiEnv) {
  return createDatabaseClient({
    databaseUrl: env.DATABASE_URL,
    enableLogger: env.NODE_ENV !== "production"
  });
}
