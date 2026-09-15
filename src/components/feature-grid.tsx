import * as icons from "lucide-react";
import type { Feature } from "@/content/home";

export function FeatureGrid({ features }: { features: readonly Feature[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {features.map((f) => {
        const Icon = icons[f.icon];
        return (
          <article key={f.title} className="rounded-xl border border-border bg-card p-6 brutal-shadow-sm">
            <span className="mb-4 grid size-11 place-items-center rounded-lg bg-mint-tint text-electric"><Icon size={22} /></span>
            <h3 className="text-lg text-navy">{f.title}</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">{f.text}</p>
          </article>
        );
      })}
    </div>
  );
}
