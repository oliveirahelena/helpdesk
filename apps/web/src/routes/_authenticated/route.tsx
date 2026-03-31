import { createRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "../../features/auth/auth-state";
import { rootRoute } from "../__root";

function AuthenticatedLayout() {
  return (
    <div className="flex flex-col gap-6">
      <Outlet />
    </div>
  );
}

export const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_authenticated",
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (!session) {
      throw redirect({
        to: "/login"
      });
    }
  },
  component: AuthenticatedLayout
});
