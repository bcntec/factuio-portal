import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Chip } from "@/components/chip";
import { CtaBand } from "@/components/cta-band";
import { IntegrationCard, IntegrationStatusPill } from "@/components/integration-card";
import { integraciones, type IntegrationStatus } from "@/content/integraciones";
import { site } from "@/content/site";
import { appUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: integraciones.meta.title,
  description: integraciones.meta.description,
};

const legendStatuses: IntegrationStatus[] = ["available", "beta", "soon"];

export default function IntegrationsPage() {
  const i = integraciones;
  return (
    <main>
      <header className="bg-card px-6 pb-14 pt-18 text-center">
        <div className="mx-auto max-w-[1120px]">
          <p className="bcn-eyebrow mb-3">{i.hero.eyebrow}</p>
          <h1 className="text-4xl text-navy md:text-5xl">{i.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{i.hero.sub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">{i.hero.chips.map((c) => <Chip key={c.text} tone={c.tone}>{c.text}</Chip>)}</div>
        </div>
      </header>

      <section className="mx-auto max-w-[1120px] px-6 pt-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="bcn-label">{i.legend.title}</p>
          {legendStatuses.map((status) => <IntegrationStatusPill key={status} status={status} />)}
        </div>
      </section>

      {i.categories.map((category) => (
        <section key={category.id} id={category.id} className="mx-auto max-w-[1120px] px-6 py-10">
          <div className="mb-6">
            <h2 className="text-2xl text-navy">{category.title}</h2>
            <p className="mt-1 text-muted-foreground">{category.text}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => <IntegrationCard key={item.id} item={item} />)}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1120px] px-6 py-14">
        <div className="grid gap-8 rounded-3xl bg-navy px-8 py-12 text-white md:grid-cols-2 md:items-center">
          <div>
            <p className="bcn-eyebrow mb-3 !text-mint">{i.developers.eyebrow}</p>
            <h2 className="text-3xl text-white">{i.developers.title}</h2>
            <Link href={i.developers.cta.href} className="mt-6 inline-block rounded-lg bg-mint px-6 py-3 font-bold text-white hover:bg-mint-600">{i.developers.cta.label}</Link>
          </div>
          <ul className="flex flex-col gap-3">
            {i.developers.bullets.map((b) => <li key={b} className="flex items-center gap-3 text-[15px]"><span className="grid size-6 place-items-center rounded-md bg-mint"><Check size={14} strokeWidth={3} aria-hidden="true" /></span>{b}</li>)}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-14">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center">
          <h2 className="text-2xl text-navy">{i.missing.title}</h2>
          <p className="mt-2 text-muted-foreground">{i.missing.text}</p>
          <a href={`mailto:${site.supportEmail}`} className="mt-6 inline-block rounded-lg border-2 border-ink px-6 py-3 font-bold text-ink hover:bg-ink hover:text-white">{i.missing.cta}</a>
        </div>
      </section>

      <CtaBand title={i.cta.title} text={i.cta.text} cta={{ label: i.cta.label, href: appUrl("/register") }} />
    </main>
  );
}
