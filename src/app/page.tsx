import Link from "next/link";
import { Hero } from "@/components/hero";
import { FeatureGrid } from "@/components/feature-grid";
import { Steps } from "@/components/steps";
import { ComplianceBand } from "@/components/compliance-band";
import { GestoriasTeaser } from "@/components/gestorias-teaser";
import { PricingCards } from "@/components/pricing-cards";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { home } from "@/content/home";
import { appUrl } from "@/lib/links";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section id="funciones" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={home.sections.features.eyebrow} title={home.sections.features.title} sub={home.sections.features.sub} />
        <FeatureGrid features={home.features} />
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={home.sections.steps.eyebrow} title={home.sections.steps.title} />
        <Steps steps={home.steps} />
      </section>
      <ComplianceBand />
      <GestoriasTeaser />
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={home.sections.pricing.eyebrow} title={home.sections.pricing.title} />
        <PricingCards compact />
        <p className="mt-6 text-center"><Link href="/precios/" className="font-bold text-electric hover:underline">{home.sections.pricing.link}</Link></p>
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={home.sections.faq.eyebrow} title={home.sections.faq.title} />
        <Faq tag="home" />
      </section>
      <CtaBand title={home.cta.title} text={home.cta.text} cta={{ label: home.cta.label, href: appUrl("/register") }} />
    </main>
  );
}
