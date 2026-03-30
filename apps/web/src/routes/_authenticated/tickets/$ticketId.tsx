import { createRoute } from "@tanstack/react-router";

import { authenticatedRoute } from "../route";

function TicketDetailPlaceholder() {
  return (
    <section className="rounded-2xl border border-dashed border-slate-700 p-6 text-slate-200">
      Ticket detail route is wired and waiting for Phase 3 UI.
    </section>
  );
}

export const ticketDetailRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/tickets/$ticketId",
  component: TicketDetailPlaceholder
});
