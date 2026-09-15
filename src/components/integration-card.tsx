import clsx from "clsx";
import { integrationStatusLabels, type Integration, type IntegrationStatus } from "@/content/integraciones";

const statusTone: Record<IntegrationStatus, string> = {
  available: "bg-mint-pastel text-navy",
  beta: "bg-sky text-sky-ink",
  soon: "bg-peach text-peach-ink",
};

export function IntegrationStatusPill({ status }: { status: IntegrationStatus }) {
  return <span className={clsx("bcn-pill", statusTone[status])}>{integrationStatusLabels[status]}</span>;
}

export function IntegrationCard({ item }: { item: Integration }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 brutal-shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden className="bcn-num grid size-11 shrink-0 place-items-center rounded-lg bg-navy text-sm font-bold text-white">{item.mark}</span>
        <IntegrationStatusPill status={item.status} />
      </div>
      <div>
        <h3 className="text-base text-navy">{item.name}</h3>
        <p className="text-[13px] text-muted-foreground">{item.vendor}</p>
      </div>
      <p className="text-[14.5px] text-ink-2">{item.text}</p>
    </article>
  );
}
