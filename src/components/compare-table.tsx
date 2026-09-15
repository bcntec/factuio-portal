import { Check } from "lucide-react";
import clsx from "clsx";
import { compareLabels, compareRows, plans } from "@/content/pricing";

function Cell({ value }: { value: true | false | string }) {
  if (value === true) return <span aria-label={compareLabels.included} className="inline-grid size-6 place-items-center rounded-md bg-mint-pastel text-navy"><Check size={13} strokeWidth={3} /></span>;
  if (value === false) return <span className="font-bold text-line-strong">—</span>;
  return <span className="text-muted-foreground">{value}</span>;
}

export function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[640px] border-collapse text-[14.5px]">
        <thead>
          <tr>
            <th className="bcn-label p-4 text-left">{compareLabels.feature}</th>
            {plans.map((p) => <th key={p.id} className={clsx("bcn-label p-4 text-center", p.featured && "bg-mint-tint")}>{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {compareRows.map((row) => (
            <tr key={row.label} className="border-t border-border odd:bg-surface-row">
              <th scope="row" className="p-4 text-left font-semibold text-ink">{row.label}</th>
              {plans.map((p) => <td key={p.id} className={clsx("p-4 text-center", p.featured && "bg-mint-tint")}><Cell value={row.values[p.id]} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
