import { describe, expect, test } from "vitest";

import { buildWorkerApp } from "./worker-app";

describe("buildWorkerApp", () => {
  test("registers placeholder queues", () => {
    const app = buildWorkerApp();

    expect(app.workers).toHaveLength(5);
    expect(app.env.REDIS_URL).toContain("redis://");
  });
});
