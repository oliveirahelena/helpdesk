import { Worker } from "bullmq";

import { createDatabaseClient } from "@helpdesk/database";

import { loadWorkersEnv } from "../platform/config/env";
import { createQueueConnection } from "../platform/queue/connection";
import { queueDefinitions } from "../platform/queue/definitions";
import { runPlaceholderProcessor } from "../processors/placeholder-processor";

export function buildWorkerApp() {
  const env = loadWorkersEnv();
  const connection = createQueueConnection(env.REDIS_URL);
  const database = createDatabaseClient({
    databaseUrl: env.DATABASE_URL,
    enableLogger: env.NODE_ENV !== "production"
  });

  const workers = queueDefinitions.map(
    (definition) =>
      new Worker(
        definition.name,
        async (job) => runPlaceholderProcessor(definition.name, job.data),
        {
          connection,
          concurrency: definition.concurrency,
          autorun: false
        }
      )
  );

  return {
    env,
    connection,
    database,
    workers,
    async start() {
      for (const worker of workers) {
        void worker.run();
      }
    },
    async stop() {
      await Promise.all(workers.map((worker) => worker.close()));
      await connection.quit();
      await database.client.end().catch(() => undefined);
    }
  };
}
