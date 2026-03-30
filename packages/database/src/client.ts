import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schema";

export interface DatabaseClientConfig {
  databaseUrl: string;
  enableLogger: boolean;
}

export function createDatabaseClient(config: DatabaseClientConfig) {
  const client = new Client({
    connectionString: config.databaseUrl
  });

  const db = drizzle(client, {
    schema,
    logger: config.enableLogger
  });

  return { client, db };
}
