import { describe, expect, test } from "vitest";

import { createInternalUser } from "./auth-test-helpers";
import { buildApp } from "../build-app";

describe("GET /api/me", () => {
  test("returns 401 when there is no session", async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/api/me"
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toMatchObject({
      error: "Unauthorized"
    });

    await app.close();
  });

  test("returns the current session when authenticated", async () => {
    const app = await buildApp();
    const email = `me-route-${Date.now()}@example.com`;
    const password = "ChangeMe123!";

    await createInternalUser(app, {
      email,
      password,
      name: "Session User"
    });

    const signInResponse = await app.inject({
      method: "POST",
      url: "/api/auth/sign-in/email",
      payload: {
        email,
        password
      }
    });

    expect(signInResponse.statusCode).toBe(200);

    const cookieHeader = signInResponse.cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");

    const meResponse = await app.inject({
      method: "GET",
      url: "/api/me",
      headers: {
        cookie: cookieHeader
      }
    });

    expect(meResponse.statusCode).toBe(200);
    expect(meResponse.json()).toMatchObject({
      user: {
        email,
        name: "Session User"
      },
      session: {
        userId: expect.any(String)
      }
    });

    await app.close();
  });
});
