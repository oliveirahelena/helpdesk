import { describe, expect, test } from "vitest";

import { buildApp } from "../build-app";

describe("GET /health", () => {
  test("returns the shared health contract", async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/health"
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      status: "ok",
      service: "api"
    });

    await app.close();
  });
});
