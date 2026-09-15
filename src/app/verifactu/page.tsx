import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { Steps } from "@/components/steps";
import { Timeline } from "@/components/timeline";
import { Callout } from "@/components/callout";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { verifactu } from "@/content/verifactu";
import { appUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: verifactu.meta.title,
  description: verifactu.meta.description,
};

export default function VerifactuPage() {
  const v = verifactu;
  return (
    <main>
      <header className="bg-card px-6 pb-14 pt-18 text-center">
        <div className="mx-auto max-w-[1120px]">
          <p className="bcn-eyebrow mb-3">{v.hero.eyebrow}</p>
          <h1 className="text-4xl text-navy md:text-5xl">{v.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{v.hero.sub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">{v.hero.chips.map((c) => <Chip key={c.text} tone={c.tone}>{c.text}</Chip>)}</div>
        </div>
      </header>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="bcn-eyebrow mb-3">{v.what.eyebrow}</p>
            <h2 className="text-3xl text-navy md:text-4xl">{v.what.title}</h2>
            <div className="mt-4 flex flex-col gap-3 text-[15px] text-muted-foreground">
              {v.what.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div aria-hidden="true" className="rounded-xl border border-border bg-card p-6 brutal-shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="bcn-label">Factura</p>
              <p className="bcn-num text-sm font-bold text-navy">FRA-2027-000142</p>
            </div>
            <div className="flex items-end justify-between gap-4 pt-4">
              <span className="size-24 shrink-0 rounded-lg bg-navy" />
              <p className="bcn-label text-right text-navy">VERI*FACTU</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={v.who.eyebrow} title={v.who.title} sub={v.who.intro} />
        <div className="mx-auto max-w-2xl">
          <Timeline milestones={v.who.milestones} />
          <Callout kind="warning">
            <ul className="flex flex-col gap-1.5">
              {v.who.exceptions.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </Callout>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={v.requirements.eyebrow} title={v.requirements.title} />
        <FeatureGrid features={v.requirements.items} />
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={v.how.eyebrow} title={v.how.title} />
        <Steps steps={v.how.steps} />
        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-mint-pastel bg-mint-tint p-6">
          <ul className="flex flex-col gap-2.5 text-[14.5px] text-ink">
            {v.how.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-mint"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={v.penalties.eyebrow} title={v.penalties.title} sub={v.penalties.text} />
        <div className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
          {v.penalties.figures.map((f) => (
            <div key={f.amount} className="rounded-xl border border-navy bg-navy p-7 text-center text-white brutal-shadow-lg">
              <p className="bcn-num text-4xl font-bold">{f.amount}</p>
              <p className="mt-2 text-sm text-navy-muted">{f.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">{v.penalties.note}</p>
      </section>

      <section className="bg-sky">
        <div className="mx-auto max-w-[1120px] px-6 py-14 text-center">
          <p className="bcn-eyebrow mb-3">{v.ticketbai.eyebrow}</p>
          <h2 className="text-3xl text-navy">{v.ticketbai.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-sky-ink">{v.ticketbai.text}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={v.faq.eyebrow} title={v.faq.title} />
        <Faq tag="verifactu" />
      </section>

      <CtaBand title={v.cta.title} text={v.cta.text} cta={{ label: v.cta.label, href: appUrl("/register") }} />
    </main>
  );
}
