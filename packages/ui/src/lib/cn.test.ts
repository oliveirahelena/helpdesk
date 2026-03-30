import { describe, expect, test } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  test("joins truthy class names", () => {
    expect(cn("a", false, "b", undefined, "c")).toBe("a b c");
  });
});
