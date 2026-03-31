import { createRoute, redirect } from "@tanstack/react-router";

import { authClient } from "../features/auth/auth-state";
import { LoginPage } from "../features/auth/login-page";
import { rootRoute } from "./__root";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  component: LoginPage
});
