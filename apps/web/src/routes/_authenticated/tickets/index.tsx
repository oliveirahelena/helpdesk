import { createRoute } from "@tanstack/react-router";

import { TicketsPlaceholder } from "../../../features/tickets/components/tickets-placeholder";
import { authenticatedRoute } from "../route";

export const ticketsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/tickets",
  component: TicketsPlaceholder
});
