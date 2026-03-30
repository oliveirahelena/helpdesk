import type { FastifyInstance } from "fastify";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from "@helpdesk/database/schema";

type InternalUserInput = {
  email: string;
  password: string;
  name: string;
};

export async function createInternalUser(app: FastifyInstance, input: InternalUserInput) {
  const auth = betterAuth({
    appName: "HelpDesk",
    baseURL: app.appEnv.BETTER_AUTH_URL,
    secret: app.appEnv.BETTER_AUTH_SECRET,
    database: drizzleAdapter(app.db, {
      provider: "pg",
      schema
    }),
    emailAndPassword: {
      enabled: true
    }
  });

  const response = await auth.handler(
    new Request(new URL("/api/auth/sign-up/email", app.appEnv.BETTER_AUTH_URL), {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(input)
    })
  );

  if (!response.ok) {
    throw new Error(`Failed to create internal user: ${response.status} ${await response.text()}`);
  }
}
