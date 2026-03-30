import { describe, expect, test } from "vitest";

import { createInternalUser } from "./auth-test-helpers";
import { buildApp } from "../build-app";

describe("auth routes", () => {
  test("rejects public email/password sign-up", async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-up/email",
      payload: {
        email: `bare-minimum-${Date.now()}@example.com`,
        password: "ChangeMe123!",
        name: "Bare Minimum"
      }
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });

  test("allows email/password sign-in for an internally created user", async () => {
    const app = await buildApp();
    const email = `internal-admin-${Date.now()}@example.com`;
    const password = "ChangeMe123!";

    await createInternalUser(app, {
      email,
      password,
      name: "Internal Admin"
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in/email",
      payload: {
        email,
        password
      }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      user: {
        email,
        name: "Internal Admin"
      }
    });
    expect(response.cookies.some((cookie) => cookie.name.includes("better-auth"))).toBe(true);

    await app.close();
  });
});
