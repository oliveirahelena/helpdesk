import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from "@helpdesk/database/schema";

import type { ApiEnv } from "../config/env";
import type { AppDatabase } from "../db/connection";

type CreateAuthOptions = {
  disableEmailPasswordSignUp?: boolean;
};

export function createAuth(env: ApiEnv, db: AppDatabase, options: CreateAuthOptions = {}) {
  const disableEmailPasswordSignUp = options.disableEmailPasswordSignUp ?? true;

  return betterAuth({
    appName: "HelpDesk",
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.WEB_APP_URL, ...env.BETTER_AUTH_TRUSTED_ORIGINS],
    database: drizzleAdapter(db, {
      provider: "pg",
      schema
    }),
    user: {
      additionalFields: {
        role: {
          type: ["admin", "agent"],
          required: false,
          defaultValue: "agent",
          input: false
        }
      }
    },
    emailAndPassword: {
      enabled: true,
      disableSignUp: disableEmailPasswordSignUp
    }
  });
}
