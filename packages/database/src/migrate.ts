import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { createDatabaseClient } from "./client";

const migrationsFolder = join(dirname(fileURLToPath(import.meta.url)), "migrations");
const databaseUrl = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/helpdesk";

async function main() {
  const database = createDatabaseClient({
    databaseUrl,
    enableLogger: false
  });

  await database.client.connect();

  try {
    await migrate(database.db, {
      migrationsFolder
    });
  } finally {
    await database.client.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
