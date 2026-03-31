import { Link, useRouter } from "@tanstack/react-router";

import { authClient } from "../../features/auth/auth-state";

export function AppNavbar() {
  const router = useRouter();
  const sessionQuery = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    await router.invalidate();
    await router.navigate({ to: "/login" });
  }

  return (
    <header className="sticky top-0 z-10 rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white">
            HelpDesk
          </Link>
          <span className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200">
            Support Ops
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          {sessionQuery.isPending ? <span>Loading session...</span> : null}
          {sessionQuery.data ? (
            <>
              <span>
                Signed in as <span className="font-medium text-white">{sessionQuery.data.user.name}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  void handleSignOut();
                }}
                className="rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Sign out
              </button>
            </>
          ) : null}
          {!sessionQuery.isPending && !sessionQuery.data ? (
            <Link
              to="/login"
              className="rounded-full border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 font-medium text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/20"
            >
              Login
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
