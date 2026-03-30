import { createRoute, Outlet } from "@tanstack/react-router";

import { AuthBoundary } from "../../app/providers/auth-boundary";
import { rootRoute } from "../__root";

function AuthenticatedLayout() {
  return (
    <AuthBoundary>
      <div className="flex flex-col gap-6">
        <Outlet />
      </div>
    </AuthBoundary>
  );
}

export const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_authenticated",
  component: AuthenticatedLayout
});
