import { fireEvent, render, screen } from "@testing-library/react";
import { RouterProvider } from "@tanstack/react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

const {
  mockUseSession,
  mockGetSession,
  mockSignInEmail,
  mockSignOut
} = vi.hoisted(() => ({
  mockUseSession: vi.fn(),
  mockGetSession: vi.fn(),
  mockSignInEmail: vi.fn(),
  mockSignOut: vi.fn()
}));

vi.mock("../features/auth/auth-state", () => ({
  authClient: {
    useSession: mockUseSession,
    getSession: mockGetSession,
    signIn: {
      email: mockSignInEmail
    },
    signOut: mockSignOut
  }
}));

import { router } from "./router";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

describe("web foundation router", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseSession.mockReset();
    mockGetSession.mockReset();
    mockSignInEmail.mockReset();
    mockSignOut.mockReset();
  });

  test("renders the public home with api health", async () => {
    mockUseSession.mockReturnValue({
      data: null,
      isPending: false
    });
    mockGetSession.mockResolvedValue({ data: null });

    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const request = input instanceof Request ? input : new Request(input);
      const pathname = new URL(request.url).pathname;

      if (pathname.endsWith("/health")) {
        return jsonResponse({
          status: "ok",
          service: "api",
          timestamp: "2026-03-30T12:00:00.000Z"
        });
      }

      throw new Error(`Unhandled request for ${pathname}`);
    });

    await router.navigate({ to: "/" });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/API connectivity check/i)).toBeInTheDocument();
    expect(await screen.findByText(/API respondeu com status/i)).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /login/i })).toBeInTheDocument();
  });

  test("shows the signed-in user name in the navigation bar", async () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: "user-1",
          name: "System Admin",
          email: "admin@example.com"
        },
        session: {
          id: "session-1",
          expiresAt: "2026-04-01T00:00:00.000Z"
        }
      },
      isPending: false
    });
    mockGetSession.mockResolvedValue({
      data: {
        user: {
          id: "user-1",
          name: "System Admin",
          email: "admin@example.com"
        }
      }
    });

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        status: "ok",
        service: "api",
        timestamp: "2026-03-30T12:00:00.000Z"
      })
    );

    await router.navigate({ to: "/" });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/Signed in as/i)).toBeInTheDocument();
    expect(await screen.findByText(/System Admin/i)).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /sign out/i })).toBeInTheDocument();
  });

  test("redirects protected routes to the login page when there is no session", async () => {
    mockUseSession.mockReturnValue({
      data: null,
      isPending: false
    });
    mockGetSession.mockResolvedValue({ data: null });

    await router.navigate({ to: "/dashboard" });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/Sign in to access the operator workspace/i)).toBeInTheDocument();
  });

  test("signs in from the login page and redirects to the dashboard", async () => {
    let currentSession: null | {
      user: { id: string; name: string; email: string };
      session: { id: string; expiresAt: string };
    } = null;

    mockUseSession.mockImplementation(() => ({
      data: currentSession,
      isPending: false
    }));
    mockGetSession.mockImplementation(async () => ({
      data: currentSession
    }));
    mockSignInEmail.mockImplementation(async () => {
      currentSession = {
        user: {
          id: "user-1",
          name: "System Admin",
          email: "admin@example.com"
        },
        session: {
          id: "session-1",
          expiresAt: "2026-04-01T00:00:00.000Z"
        }
      };

      return { error: null };
    });

    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const request = input instanceof Request ? input : new Request(input);
      const pathname = new URL(request.url).pathname;

      if (pathname.endsWith("/health")) {
        return jsonResponse({
          status: "ok",
          service: "api",
          timestamp: "2026-03-30T12:00:00.000Z"
        });
      }

      throw new Error(`Unhandled request for ${pathname}`);
    });

    await router.navigate({ to: "/login" });

    render(<RouterProvider router={router} />);

    fireEvent.change(await screen.findByLabelText(/email/i), {
      target: { value: "admin@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" }
    });
    fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(await screen.findByText(/Operational foundation ready/i)).toBeInTheDocument();
    expect(mockSignInEmail).toHaveBeenCalledWith({
      email: "admin@example.com",
      password: "password123"
    });
  });
});
