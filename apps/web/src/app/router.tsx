import { createRouter } from "@tanstack/react-router";

import { dashboardRoute } from "../routes/_authenticated/dashboard";
import { authenticatedRoute } from "../routes/_authenticated/route";
import { ticketDetailRoute } from "../routes/_authenticated/tickets/$ticketId";
import { ticketsRoute } from "../routes/_authenticated/tickets/index";
import { usersRoute } from "../routes/_authenticated/users/index";
import { homeRoute } from "../routes/home";
import { rootRoute } from "../routes/__root";

const routeTree = rootRoute.addChildren([
  homeRoute,
  authenticatedRoute.addChildren([dashboardRoute, ticketsRoute, ticketDetailRoute, usersRoute])
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStructuralSharing: true,
  defaultPendingComponent: () => <div className="text-slate-300">Loading foundation...</div>,
  defaultNotFoundComponent: () => <div className="text-slate-300">Route not found.</div>
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
