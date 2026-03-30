import { describe, expect, test } from "vitest";

import { healthCheckResponseSchema } from "./health";

describe("healthCheckResponseSchema", () => {
  test("accepts the API health contract", () => {
    const result = healthCheckResponseSchema.safeParse({
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString()
    });

    expect(result.success).toBe(true);
  });
});
