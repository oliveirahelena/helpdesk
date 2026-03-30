import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from "@helpdesk/database/schema";

import type { ApiEnv } from "../config/env";
import type { AppDatabase } from "../db/connection";

export function createAuth(env: ApiEnv, db: AppDatabase) {
  return betterAuth({
    appName: "HelpDesk",
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema
    }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true
    }
  });
}
