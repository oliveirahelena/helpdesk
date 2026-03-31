import { z } from "zod";

const apiEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().int().positive().default(3001),
  WEB_APP_URL: z.url(),
  BETTER_AUTH_TRUSTED_ORIGINS: z.array(z.string().trim().min(1)),
  BETTER_AUTH_URL: z.url(),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(32),
  SENDGRID_API_KEY: z.string().min(1),
  SENDGRID_WEBHOOK_SECRET: z.string().min(1),
  AI_PROVIDER_API_KEY: z.string().min(1),
  LOG_LEVEL: z.string().default("info")
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export function loadApiEnv(source: NodeJS.ProcessEnv = process.env): ApiEnv {
  const nodeEnv = source.NODE_ENV ?? "development";
  const apiHost = source.API_HOST ?? "0.0.0.0";
  const apiPort = source.API_PORT ?? "3001";

  return apiEnvSchema.parse({
    NODE_ENV: nodeEnv,
    API_HOST: apiHost,
    API_PORT: apiPort,
    WEB_APP_URL: source.WEB_APP_URL ?? "http://localhost:5173",
    BETTER_AUTH_TRUSTED_ORIGINS: (source.BETTER_AUTH_TRUSTED_ORIGINS ??
      "http://localhost:*,http://127.0.0.1:*")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
    BETTER_AUTH_URL: source.BETTER_AUTH_URL ?? `http://localhost:${apiPort}`,
    DATABASE_URL: source.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/helpdesk",
    REDIS_URL: source.REDIS_URL ?? "redis://localhost:6379",
    BETTER_AUTH_SECRET:
      source.BETTER_AUTH_SECRET ??
      (nodeEnv === "test" ? "test-secret-key-with-at-least-32-chars" : undefined),
    SENDGRID_API_KEY: source.SENDGRID_API_KEY ?? "replace-me",
    SENDGRID_WEBHOOK_SECRET: source.SENDGRID_WEBHOOK_SECRET ?? "replace-me",
    AI_PROVIDER_API_KEY: source.AI_PROVIDER_API_KEY ?? "replace-me",
    LOG_LEVEL: source.LOG_LEVEL
  });
}
