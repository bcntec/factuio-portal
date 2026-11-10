import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProductJsonLd } from "@/components/product-jsonld";
import { FeatureGrid } from "@/components/feature-grid";
import { Steps } from "@/components/steps";
import { ComplianceBand } from "@/components/compliance-band";
import { GestoriasTeaser } from "@/components/gestorias-teaser";
import { PricingCards } from "@/components/pricing-cards";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { home } from "@/content/home";
import { signupHref } from "@/lib/links";
import { isSoon } from "@/lib/features";

export default function HomePage() {
  return (
    <main>
      <ProductJsonLd />
      <Hero />
      <section id="funciones" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={home.sections.features.eyebrow} title={home.sections.features.title} sub={home.sections.features.sub} />
        <FeatureGrid features={home.features} />
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="grid items-center gap-10 rounded-3xl bg-navy p-8 text-white md:grid-cols-[1.1fr_1fr] md:p-12">
          <div>
            <p className="bcn-eyebrow mb-3 text-mint">{home.aiTeaser.eyebrow}</p>
            <h2 className="text-3xl text-white md:text-4xl">{home.aiTeaser.title}</h2>
            <p className="mt-4 text-navy-muted">{home.aiTeaser.text}</p>
            <Link href="/ia/" className="mt-6 inline-block rounded-lg bg-mint px-6 py-3 font-bold text-white hover:bg-mint-600">{home.aiTeaser.cta}</Link>
          </div>
          <ul className="flex flex-col gap-3">
            {home.aiTeaser.prompts.map((p) => <li key={p} className="rounded-xl bg-white/10 px-4 py-3 text-[15px]">{p}</li>)}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={home.sections.steps.eyebrow} title={home.sections.steps.title} />
        <Steps steps={home.steps} />
      </section>
      <ComplianceBand />
      <GestoriasTeaser />
      {!isSoon("precios") && (
        <section className="mx-auto max-w-[1120px] px-6 py-16">
          <SectionHeading eyebrow={home.sections.pricing.eyebrow} title={home.sections.pricing.title} />
          <PricingCards compact />
          <p className="mt-6 text-center"><Link href="/precios/" className="font-bold text-electric hover:underline">{home.sections.pricing.link}</Link></p>
        </section>
      )}
      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={home.sections.faq.eyebrow} title={home.sections.faq.title} />
        <Faq tag="home" />
      </section>
      <CtaBand title={home.cta.title} text={home.cta.text} cta={{ label: home.cta.label, href: signupHref("/register") }} />
    </main>
  );
}
