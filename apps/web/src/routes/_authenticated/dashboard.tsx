import { createRoute } from "@tanstack/react-router";

import { DashboardPage } from "../../features/dashboard/dashboard-page";
import { authenticatedRoute } from "./route";

export const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/dashboard",
  component: DashboardPage
});
