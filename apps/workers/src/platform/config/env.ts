import { z } from "zod";

const workersEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  REDIS_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1)
});

export function loadWorkersEnv(source: NodeJS.ProcessEnv = process.env) {
  return workersEnvSchema.parse({
    NODE_ENV: source.NODE_ENV,
    REDIS_URL: source.REDIS_URL ?? "redis://localhost:6379",
    DATABASE_URL: source.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/helpdesk"
  });
}
