import { createDatabaseClient } from "@helpdesk/database";
import type { DatabaseInstance } from "@helpdesk/database";

import type { ApiEnv } from "../config/env";

export type AppDatabase = DatabaseInstance;

export function createPlatformDatabase(env: ApiEnv) {
  return createDatabaseClient({
    databaseUrl: env.DATABASE_URL,
    enableLogger: env.NODE_ENV !== "production"
  });
}
