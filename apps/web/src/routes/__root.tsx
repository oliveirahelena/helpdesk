import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AppShell } from "@helpdesk/ui";

import { AppProviders } from "../app/providers/app-providers";
import { AppNavbar } from "../shared/components/app-navbar";

function RootComponent() {
  return (
    <AppProviders>
      <AppShell>
        <AppNavbar />
        <Outlet />
      </AppShell>
    </AppProviders>
  );
}

export const rootRoute = createRootRoute({
  component: RootComponent
});
