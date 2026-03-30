import { describe, expect, test } from "vitest";

import { buildApp } from "../build-app";

describe("POST /api/auth/sign-up/email", () => {
  test("creates a user with email and password backed by database sessions", async () => {
    const app = await buildApp();
    const email = `bare-minimum-${Date.now()}@example.com`;

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/sign-up/email",
      payload: {
        email,
        password: "ChangeMe123!",
        name: "Bare Minimum"
      }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      user: {
        email,
        name: "Bare Minimum"
      }
    });

    expect(response.cookies.some((cookie) => cookie.name.includes("better-auth"))).toBe(true);

    await app.close();
  });
});
