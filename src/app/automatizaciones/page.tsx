import type { Metadata } from "next";
import Link from "next/link";
import { Check, Inbox, Send } from "lucide-react";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaBand } from "@/components/cta-band";
import { automatizaciones, type ConnectorStatus } from "@/content/automatizaciones";
import { signupHref } from "@/lib/links";

export const metadata: Metadata = { title: automatizaciones.meta.title, description: automatizaciones.meta.description };

const statusClass: Record<ConnectorStatus, string> = { available: "bg-mint text-white", beta: "bg-sky text-navy", soon: "bg-peach text-navy" };

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 text-[15px] text-navy">
      {items.map((i) => <li key={i} className="flex items-start gap-2.5"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-mint text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{i}</li>)}
    </ul>
  );
}

export default function AutomationsPage() {
  const a = automatizaciones;
  return (
    <main>
      <header className="bg-card px-6 pb-14 pt-18 text-center">
        <div className="mx-auto max-w-[1120px]">
          <p className="bcn-eyebrow mb-3">{a.hero.eyebrow}</p>
          <h1 className="mx-auto max-w-3xl text-4xl text-navy md:text-5xl">{a.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{a.hero.sub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">{a.hero.chips.map((c) => <Chip key={c.text} tone={c.tone}>{c.text}</Chip>)}</div>
        </div>
      </header>

      <section id="recetas" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={a.recipes.eyebrow} title={a.recipes.title} sub={a.recipes.sub} />
        <FeatureGrid features={a.recipes.items} />
        <h3 className="mt-12 mb-5 text-xl text-navy">{a.recipes.moreTitle}</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {a.recipes.more.map((r) => (
            <article key={r.when} className="rounded-xl border border-border bg-card p-5">
              <span className={`rounded-md px-2 py-0.5 text-[12px] font-bold ${statusClass[r.status]}`}>{a.statusLabels[r.status]}</span>
              <p className="mt-3 text-[14px] text-muted-foreground"><strong className="text-navy">Cuando:</strong> {r.when}</p>
              <p className="mt-1 text-[14px] text-muted-foreground"><strong className="text-navy">Entonces:</strong> {r.then}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="gastos" className="scroll-mt-20 bg-card px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <SectionHeading eyebrow={a.expenseChannels.eyebrow} title={a.expenseChannels.title} sub={a.expenseChannels.sub} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {a.expenseChannels.items.map((c) => (
              <article key={c.id} className="rounded-xl border border-border bg-background p-5 brutal-shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg text-navy">{c.name}</h3>
                  <span className={`rounded-md px-2 py-0.5 text-[12px] font-bold ${statusClass[c.status]}`}>{a.statusLabels[c.status]}</span>
                </div>
                <p className="mt-2 text-[14px] text-muted-foreground">{c.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-[14px] text-muted-foreground">{a.expenseChannels.note}</p>
        </div>
      </section>

      <section id="conectores" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={a.connectors.eyebrow} title={a.connectors.title} />
        <div className="grid gap-5 md:grid-cols-2">
          {a.connectors.items.map((c) => (
            <article key={c.id} id={c.id} className="flex scroll-mt-20 flex-col rounded-xl border border-border bg-card p-6 brutal-shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl text-navy">{c.name}</h3>
                <span className={`rounded-md px-2 py-0.5 text-[12px] font-bold ${statusClass[c.status]}`}>{a.statusLabels[c.status]}</span>
              </div>
              <p className="mt-1 text-[15px] text-muted-foreground">{c.tagline}</p>
              <p className="mt-4 rounded-lg bg-mint-tint px-3.5 py-2.5 text-[14px] text-navy"><strong>Hoy: </strong>{c.today}</p>
              <div className="mt-4"><CheckList items={c.points} /></div>
              {c.link && <Link href={c.link.href} className="mt-auto pt-4 text-sm font-bold text-electric hover:underline">{c.link.label}</Link>}
            </article>
          ))}
        </div>
      </section>

      <section id="webhooks" className="scroll-mt-20 bg-navy px-6 py-16 text-white">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="bcn-eyebrow mb-3 text-mint">{a.webhooks.eyebrow}</p>
            <h2 className="text-3xl text-white md:text-4xl">{a.webhooks.title}</h2>
            <p className="mt-4 text-navy-muted">{a.webhooks.sub}</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/15">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead className="bg-white/5 text-[12px] uppercase tracking-wide text-navy-muted">
                <tr><th className="px-4 py-3">Evento</th><th className="px-4 py-3">Cuándo</th><th className="px-4 py-3">Para qué</th></tr>
              </thead>
              <tbody>
                {a.webhooks.events.map((e) => (
                  <tr key={e.name} className="border-t border-white/10">
                    <td className="px-4 py-3"><code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-mint">{e.name}</code></td>
                    <td className="px-4 py-3">{e.when}</td>
                    <td className="px-4 py-3 text-navy-muted">{e.idea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10"><FeatureGrid features={a.webhooks.security} /></div>
        </div>
      </section>

      <section id="correo" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={a.email.eyebrow} title={a.email.title} />
        <div className="grid gap-5 md:grid-cols-2">
          {[{ b: a.email.out, Icon: Send }, { b: a.email.in, Icon: Inbox }].map(({ b, Icon }) => (
            <article key={b.title} className="rounded-xl border border-border bg-card p-6 brutal-shadow-sm">
              <span className="mb-4 grid size-11 place-items-center rounded-lg bg-mint-tint text-electric"><Icon size={22} aria-hidden="true" /></span>
              <h3 className="mb-4 text-lg text-navy">{b.title}</h3>
              <CheckList items={b.items} />
            </article>
          ))}
        </div>
      </section>

      <section id="flujos" className="mx-auto max-w-[1120px] scroll-mt-20 px-6 py-16">
        <SectionHeading eyebrow={a.flows.eyebrow} title={a.flows.title} />
        <div className="grid gap-5 md:grid-cols-2">
          {a.flows.items.map((f) => (
            <article key={f.trigger} className="rounded-xl border border-border bg-card p-6 brutal-shadow-sm">
              <p className="bcn-label mb-2">{f.tool}</p>
              <p className="mb-4 text-[15px] font-bold text-navy">Cuando: <code className="rounded bg-mint-tint px-1.5 py-0.5 font-mono text-[13px] text-electric">{f.trigger}</code></p>
              <ol className="flex flex-col gap-2 text-[14px] text-muted-foreground">
                {f.steps.map((s, i) => <li key={s} className="flex items-start gap-2"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white">{i + 1}</span>{s}</li>)}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title={a.cta.title} text={a.cta.text} cta={{ label: a.cta.label, href: signupHref("/register") }} />
    </main>
  );
}
