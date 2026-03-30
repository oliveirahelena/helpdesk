import { z } from "zod";

const apiEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  SENDGRID_API_KEY: z.string().min(1),
  SENDGRID_WEBHOOK_SECRET: z.string().min(1),
  AI_PROVIDER_API_KEY: z.string().min(1),
  LOG_LEVEL: z.string().default("info")
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export function loadApiEnv(source: NodeJS.ProcessEnv = process.env): ApiEnv {
  return apiEnvSchema.parse({
    NODE_ENV: source.NODE_ENV,
    API_HOST: source.API_HOST,
    API_PORT: source.API_PORT,
    DATABASE_URL: source.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/helpdesk",
    REDIS_URL: source.REDIS_URL ?? "redis://localhost:6379",
    BETTER_AUTH_SECRET: source.BETTER_AUTH_SECRET ?? "replace-me",
    SENDGRID_API_KEY: source.SENDGRID_API_KEY ?? "replace-me",
    SENDGRID_WEBHOOK_SECRET: source.SENDGRID_WEBHOOK_SECRET ?? "replace-me",
    AI_PROVIDER_API_KEY: source.AI_PROVIDER_API_KEY ?? "replace-me",
    LOG_LEVEL: source.LOG_LEVEL
  });
}
