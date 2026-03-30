import { PageHeader } from "../../shared/components/page-header";
import { useHealthCheck } from "./hooks/use-health-check";

export function HomePage() {
  const healthCheckQuery = useHealthCheck();

  return (
    <section className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Home"
        title="API connectivity check"
        description="Public landing page validating communication between the web app and the API."
      />
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
        <h2 className="text-lg font-semibold text-white">API health</h2>
        {healthCheckQuery.isPending ? (
          <p className="mt-2 text-sm text-slate-300">Checking API health...</p>
        ) : null}
        {healthCheckQuery.isError ? (
          <p className="mt-2 text-sm text-rose-300">Unable to load API health status.</p>
        ) : null}
        {healthCheckQuery.data ? (
          <p className="mt-2 text-sm text-slate-300">
            API respondeu com status <span className="font-medium text-white">{healthCheckQuery.data.status}</span> para o
            servico <span className="font-medium text-white">{healthCheckQuery.data.service}</span>.
          </p>
        ) : null}
      </section>
    </section>
  );
}
