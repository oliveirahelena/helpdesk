import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AppShell } from "@helpdesk/ui";

import { AppProviders } from "../app/providers/app-providers";

function RootComponent() {
  return (
    <AppProviders>
      <AppShell>
        <Outlet />
      </AppShell>
    </AppProviders>
  );
}

export const rootRoute = createRootRoute({
  component: RootComponent
});
