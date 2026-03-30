import { createRoute } from "@tanstack/react-router";

import { authenticatedRoute } from "../route";

function UsersPlaceholder() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
      Users route scaffolded for admin and agent management.
    </section>
  );
}

export const usersRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/users",
  component: UsersPlaceholder
});
