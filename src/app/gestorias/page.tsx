import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Chip } from "@/components/chip";
import { FeatureGrid } from "@/components/feature-grid";
import { Steps } from "@/components/steps";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { gestorias } from "@/content/gestorias";
import { formatEur, plans, pricingLabels } from "@/content/pricing";
import { appUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: gestorias.meta.title,
  description: gestorias.meta.description,
};

export default function AdvisorsPage() {
  const g = gestorias;
  const plan = plans.find((p) => p.id === "gestoria")!;
  return (
    <main>
      <header className="bg-card px-6 pb-14 pt-18 text-center">
        <div className="mx-auto max-w-[1120px]">
          <p className="bcn-eyebrow mb-3">{g.hero.eyebrow}</p>
          <h1 className="text-4xl text-navy md:text-5xl">{g.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{g.hero.sub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">{g.hero.chips.map((c) => <Chip key={c.text} tone={c.tone}>{c.text}</Chip>)}</div>
        </div>
      </header>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={g.sections.benefits.eyebrow} title={g.sections.benefits.title} />
        <FeatureGrid features={g.benefits} />
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={g.sections.steps.eyebrow} title={g.sections.steps.title} />
        <Steps steps={g.steps} />
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="mx-auto max-w-md rounded-xl border border-navy bg-navy p-7 text-white brutal-shadow-lg">
          <h2 className="bcn-label !text-white">{plan.name}</h2>
          <p className="mt-1 text-sm text-navy-muted">{plan.tagline}</p>
          <p className="mt-5 flex items-baseline gap-1.5"><span className="text-sm opacity-70">{pricingLabels.from}</span><span className="bcn-num text-4xl font-bold">{formatEur(plan.monthly)}</span><span className="text-sm opacity-70">{pricingLabels.perMonth}</span></p>
          <a href={appUrl(`/register?plan=${plan.id}`)} className="my-5 block rounded-lg bg-mint px-6 py-3 text-center font-bold text-white hover:bg-mint-600">{plan.cta}</a>
          <ul className="flex flex-col gap-2 text-[14.5px]">
            {plan.features.map((f) => <li key={f} className="flex items-start gap-2.5"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-mint"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{f}</li>)}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={g.sections.faq.eyebrow} title={g.sections.faq.title} />
        <Faq tag="gestoria" />
      </section>
      <CtaBand title={g.cta.title} text={g.cta.text} cta={{ label: g.cta.label, href: appUrl("/register?plan=gestoria") }} />
    </main>
  );
}
