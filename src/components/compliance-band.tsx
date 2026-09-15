import { ShieldCheck } from "lucide-react";
import { home } from "@/content/home";

export function ComplianceBand() {
  const c = home.compliance;
  return (
    <section className="bg-mint-tint">
      <div className="mx-auto grid max-w-[1120px] items-center gap-8 px-6 py-14 md:grid-cols-2">
        <div>
          <p className="bcn-eyebrow mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl text-navy">{c.title}</h2>
          <p className="mt-3 text-[15px] text-ink-2">{c.text}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {c.seals.map((s) => (
            <li key={s} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-navy"><ShieldCheck size={18} className="text-electric" />{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
