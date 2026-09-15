"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { annualBadge, billingNote, formatEur, plans, pricingLabels } from "@/content/pricing";
import { appUrl } from "@/lib/links";

type Billing = "monthly" | "annual";

export function PricingCards({ compact = false }: { compact?: boolean }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <div>
      {!compact && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <div role="group" aria-label={pricingLabels.billingPeriodLabel} className="inline-flex rounded-lg bg-surface-2 p-1">
            {(["monthly", "annual"] as Billing[]).map((b) => (
              <button key={b} type="button" aria-pressed={billing === b} onClick={() => setBilling(b)}
                className={clsx("rounded-md px-5 py-2 text-[15px] font-bold", billing === b ? "bg-navy text-white" : "text-muted-foreground")}>
                {b === "monthly" ? pricingLabels.monthly : pricingLabels.annual}
              </button>
            ))}
          </div>
          <span className="rounded-lg bg-mint-pastel px-3 py-1 text-xs font-extrabold text-navy">{annualBadge}</span>
        </div>
      )}
      <div className={clsx("grid gap-5", compact ? "md:grid-cols-3" : "mx-auto max-w-md md:max-w-none md:grid-cols-3")}>
        {plans.map((p) => {
          const price = billing === "monthly" ? p.monthly : p.annualMonthly;
          return (
            <article key={p.id} className={clsx("relative flex flex-col rounded-xl border p-7",
              p.featured ? "border-navy bg-navy text-white brutal-shadow-lg" : "border-border bg-card")}>
              {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-mint px-3 py-1 text-xs font-extrabold text-white">{pricingLabels.featuredBadge}</span>}
              <h3 className="bcn-label !text-inherit">{p.name}</h3>
              <p className={clsx("mt-1 text-sm", p.featured ? "text-navy-muted" : "text-muted-foreground")}>{p.tagline}</p>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-sm font-semibold opacity-70">{pricingLabels.from}</span>
                <span data-testid={`price-${p.id}`} className="bcn-num text-4xl font-bold">{formatEur(price)}</span>
                <span className="text-sm opacity-70">{pricingLabels.perMonth}</span>
              </p>
              {!compact && <p className="mt-0.5 min-h-5 text-[13px] opacity-70">{billingNote[billing]}</p>}
              <a href={appUrl(`/register?plan=${p.id}`)}
                className={clsx("my-5 rounded-lg px-6 py-3 text-center font-bold",
                  p.featured ? "bg-mint text-white hover:bg-mint-600" : "border-2 border-ink text-ink hover:bg-ink hover:text-white")}>
                {p.cta}
              </a>
              {!compact && (
                <>
                  <p className="mb-2 text-[13.5px] font-extrabold">{p.featuresTitle}</p>
                  <ul className="flex flex-col gap-2 text-[14.5px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className={clsx("mt-0.5 grid size-5 shrink-0 place-items-center rounded-md", p.featured ? "bg-mint text-white" : "bg-mint-pastel text-navy")}><Check size={12} strokeWidth={3} aria-hidden="true" /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
