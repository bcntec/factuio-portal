import { home } from "@/content/home";

export function DashboardMock() {
  const m = home.dashboardMock;
  return (
    <div aria-hidden className="rounded-xl border border-border bg-card p-5 brutal-shadow-lg">
      <p className="mb-4 text-xs text-muted-foreground">{m.company}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-navy p-4 text-white sm:col-span-3">
          <p className="bcn-label !text-navy-muted">{m.invoiced.label}</p>
          <p className="bcn-num mt-1 text-3xl font-bold">{m.invoiced.value}</p>
          <p className="mt-1 text-xs text-navy-muted"><span className="font-bold text-mint">{m.invoiced.delta}</span></p>
        </div>
        <div className="rounded-xl bg-sky p-4"><p className="bcn-label">{m.pending.label}</p><p className="bcn-num mt-1 text-xl font-bold text-navy">{m.pending.value}</p></div>
        <div className="rounded-xl bg-peach p-4"><p className="bcn-label">{m.overdue.label}</p><p className="bcn-num mt-1 text-xl font-bold text-navy">{m.overdue.value}</p></div>
        <div className="flex h-24 items-stretch gap-2 rounded-xl border border-border p-3 sm:col-span-3">
          {m.bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
              <div className="flex w-full flex-1 items-end justify-center gap-0.5">
                <span className="w-2 rounded-t bg-mint" style={{ height: `${h}%` }} />
                <span className="w-2 rounded-t bg-peri opacity-75" style={{ height: `${m.barsExpenses[i]}%` }} />
              </div>
              <span className="text-[9px] font-bold text-muted-foreground">{m.months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
