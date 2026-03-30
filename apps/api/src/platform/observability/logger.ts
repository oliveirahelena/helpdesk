import type { ApiEnv } from "../config/env";

export function buildLoggerOptions(env: ApiEnv) {
  return {
    level: env.LOG_LEVEL
  };
}
