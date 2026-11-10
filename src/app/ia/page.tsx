import type { Metadata } from "next";
import Link from "next/link";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { Steps } from "@/components/steps";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { AiChatMock } from "@/components/ai-chat-mock";
import { McpCaseCard } from "@/components/mcp-case-card";
import { ia } from "@/content/ia";
import { signupHref } from "@/lib/links";

export const metadata: Metadata = { title: ia.meta.title, description: ia.meta.description };

export default function IaPage() {
  const v = ia;
  return (
    <main>
      <header className="bg-card">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="bcn-eyebrow mb-3">{v.hero.eyebrow}</p>
            <h1 className="text-4xl text-navy md:text-5xl">{v.hero.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{v.hero.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={signupHref("/register")} className="rounded-lg bg-mint px-7 py-3 font-bold text-white hover:bg-mint-600">{v.hero.primary}</a>
              <a href="#conectar" className="rounded-lg border-2 border-ink px-7 py-3 font-bold text-ink hover:bg-ink hover:text-white">{v.hero.secondary}</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">{v.hero.chips.map((c) => <Chip key={c.text} tone={c.tone}>{c.text}</Chip>)}</div>
          </div>
          <AiChatMock />
        </div>
      </header>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={v.ways.eyebrow} title={v.ways.title} />
        <FeatureGrid features={v.ways.items} />
      </section>

      <section id="casos" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={v.cases.eyebrow} title={v.cases.title} sub={v.cases.sub} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {v.cases.items.map((c) => <McpCaseCard key={c.id} item={c} labels={v.cases.labels} />)}
        </div>
      </section>

      <section className="bg-navy px-6 py-16 text-white">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="bcn-eyebrow mb-3 text-mint">{v.guardrails.eyebrow}</p>
            <h2 className="text-3xl text-white md:text-4xl">{v.guardrails.title}</h2>
          </div>
          <FeatureGrid features={v.guardrails.items} />
        </div>
      </section>

      <section id="conectar" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={v.connect.eyebrow} title={v.connect.title} />
        <Steps steps={v.connect.steps} />
        <div className="mx-auto mt-8 max-w-2xl">
          <p className="bcn-label mb-2">{v.connect.snippetTitle}</p>
          <pre className="overflow-x-auto rounded-xl bg-ink p-4 font-mono text-[13px] text-white"><code>{v.connect.snippet}</code></pre>
          <p className="mt-4 text-center"><Link href={v.connect.docsLink.href} className="font-bold text-electric hover:underline">{v.connect.docsLink.label}</Link></p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow="FAQ" title="Preguntas sobre la IA" />
        <Faq tag="ia" />
      </section>

      <CtaBand title={v.cta.title} text={v.cta.text} cta={{ label: v.cta.label, href: signupHref("/register") }} />
    </main>
  );
}
