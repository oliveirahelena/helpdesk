interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</span>
      <h1 className="text-4xl font-semibold text-white">{title}</h1>
      <p className="max-w-3xl text-sm text-slate-300">{description}</p>
    </header>
  );
}
