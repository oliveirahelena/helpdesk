import { describe, expect, test } from "vitest";

import { createDatabaseClient } from "./client";

describe("createDatabaseClient", () => {
  test("creates client and db handles", () => {
    const result = createDatabaseClient({
      databaseUrl: "postgres://postgres:postgres@localhost:5432/helpdesk",
      enableLogger: false
    });

    expect(result.client).toBeDefined();
    expect(result.db).toBeDefined();
  });
});
