import { StatCard } from "@helpdesk/ui";

import { PageHeader } from "../../shared/components/page-header";

const stats = [
  { label: "Open Tickets", value: "128", detail: "Placeholder analytics fed by future contracts." },
  { label: "Inbox SLA", value: "94%", detail: "Routing and queue readiness already scaffolded." },
  { label: "Agents Online", value: "12", detail: "Auth boundary exists, RBAC lands in the next phase." }
];

export function DashboardPage() {
  return (
    <section className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Operational foundation ready for ticket workflows"
        description="Authenticated workspace scaffold for ticket operations, routing and future dashboard data."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}
