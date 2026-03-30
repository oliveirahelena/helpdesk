import { render, screen } from "@testing-library/react";
import { RouterProvider } from "@tanstack/react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { router } from "./router";

describe("web foundation router", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("renders the public home with api health", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          status: "ok",
          service: "api",
          timestamp: "2026-03-30T12:00:00.000Z"
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    );

    router.navigate({ to: "/" });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/API connectivity check/i)).toBeInTheDocument();
    expect(await screen.findByText(/API respondeu com status/i)).toBeInTheDocument();
  });
});
