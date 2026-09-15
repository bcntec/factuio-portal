import type { Metadata } from "next";
import { Chip } from "@/components/chip";
import { PricingCards } from "@/components/pricing-cards";
import { CompareTable } from "@/components/compare-table";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { pricingPage } from "@/content/pricing";
import { appUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: pricingPage.meta.title,
  description: pricingPage.meta.description,
};

export default function PricingPage() {
  return (
    <main>
      <header className="bg-card px-6 pb-14 pt-18 text-center">
        <div className="mx-auto max-w-[1120px]">
          <p className="bcn-eyebrow mb-3">{pricingPage.hero.eyebrow}</p>
          <h1 className="text-4xl text-navy md:text-5xl">{pricingPage.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{pricingPage.hero.sub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {pricingPage.hero.chips.map((chip) => (
              <Chip key={chip.text} tone={chip.tone}>{chip.text}</Chip>
            ))}
          </div>
        </div>
      </header>
      <section id="planes" className="mx-auto max-w-[1120px] px-6 py-14">
        <SectionHeading eyebrow={pricingPage.plans.eyebrow} title={pricingPage.plans.title} />
        <PricingCards />
      </section>
      <section id="compara" className="mx-auto max-w-[1120px] px-6 py-14">
        <SectionHeading eyebrow={pricingPage.compare.eyebrow} title={pricingPage.compare.title} />
        <CompareTable />
      </section>
      <section id="faq" className="mx-auto max-w-[1120px] px-6 py-14">
        <SectionHeading eyebrow={pricingPage.faq.eyebrow} title={pricingPage.faq.title} />
        <Faq tag="pricing" />
      </section>
      <CtaBand title={pricingPage.cta.title} text={pricingPage.cta.text} cta={{ label: pricingPage.cta.label, href: appUrl("/register") }} />
    </main>
  );
}
