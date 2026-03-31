import { z } from "zod";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from "@helpdesk/database/schema";

import { loadApiEnv } from "../platform/config/env";
import { createPlatformDatabase } from "../platform/db/connection";

const adminSeedEnvSchema = z.object({
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_NAME: z.string().min(1).default("System Admin")
});

async function main() {
  const env = loadApiEnv();
  const adminEnv = adminSeedEnvSchema.parse({
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_NAME: process.env.ADMIN_NAME
  });

  const database = createPlatformDatabase(env);

  await database.client.connect();

  try {
    const existingAdmin = await database.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, adminEnv.ADMIN_EMAIL)
    });

    if (existingAdmin) {
      await database.client.query("UPDATE users SET role = $1 WHERE email = $2", ["admin", adminEnv.ADMIN_EMAIL]);
      console.log(`Admin user already exists for ${adminEnv.ADMIN_EMAIL}`);
      return;
    }

    const auth = betterAuth({
      appName: "HelpDesk",
      baseURL: env.BETTER_AUTH_URL,
      secret: env.BETTER_AUTH_SECRET,
      database: drizzleAdapter(database.db, {
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
        disableSignUp: false
      }
    });

    const response = await auth.handler(
      new Request(new URL("/api/auth/sign-up/email", env.BETTER_AUTH_URL), {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: adminEnv.ADMIN_EMAIL,
          password: adminEnv.ADMIN_PASSWORD,
          name: adminEnv.ADMIN_NAME,
          role: "admin"
        })
      })
    );

    if (!response.ok) {
      throw new Error(`Admin seed failed with ${response.status}: ${await response.text()}`);
    }

    await database.client.query("UPDATE users SET role = $1 WHERE email = $2", ["admin", adminEnv.ADMIN_EMAIL]);

    console.log(`Admin user created for ${adminEnv.ADMIN_EMAIL}`);
  } finally {
    await database.client.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
