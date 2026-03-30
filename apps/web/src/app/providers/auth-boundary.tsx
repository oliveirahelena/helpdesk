import type { PropsWithChildren } from "react";

interface AuthBoundaryProps extends PropsWithChildren {
  isAuthenticated?: boolean;
}

export function AuthBoundary({ children, isAuthenticated = true }: AuthBoundaryProps) {
  if (!isAuthenticated) {
    return <div className="p-6 text-slate-200">Authentication wiring is ready, login flow arrives in Phase 2.</div>;
  }

  return <>{children}</>;
}
