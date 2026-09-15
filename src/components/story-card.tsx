import clsx from "clsx";
import Link from "next/link";
import { Check } from "lucide-react";
import { Chip } from "@/components/chip";
import { IntegrationStatusPill } from "@/components/integration-card";
import { historias, type Story } from "@/content/historias";
import { appUrl } from "@/lib/links";

const ctaClass = "inline-block rounded-lg bg-mint px-6 py-3 text-center font-bold text-white hover:bg-mint-600";

export function StoryCard({ story, flip = false }: { story: Story; flip?: boolean }) {
  const l = historias.labels;
  const solutionId = `${story.id}-solution`;
  const modulesId = `${story.id}-modules`;
  return (
    <article id={story.id} className="grid gap-8 rounded-xl border border-border bg-card p-7 brutal-shadow-sm md:grid-cols-[3fr_2fr] md:gap-12 md:p-10">
      <div className={clsx(flip && "md:order-2")}>
        <div className="flex flex-wrap items-center gap-2.5">
          <Chip tone={story.tone}>{story.profile}</Chip>
          {story.status && <IntegrationStatusPill status={story.status} />}
        </div>
        <h2 className="mt-4 text-2xl text-navy md:text-3xl">{story.title}</h2>
        <p className="bcn-label mt-6">{l.situation}</p>
        <p className="mt-2 text-[15px] text-muted-foreground">{story.situation}</p>
        <p id={solutionId} className="bcn-label mt-6">{l.solution}</p>
        <ul aria-labelledby={solutionId} className="mt-2 flex flex-col gap-2.5 text-[15px] text-ink">
          {story.solution.map((s) => (
            <li key={s} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-mint text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className={clsx("flex flex-col justify-between gap-6 rounded-xl bg-surface p-6", flip && "md:order-1")}>
        <div>
          <p id={modulesId} className="bcn-label">{l.modules}</p>
          <ul aria-labelledby={modulesId} className="mt-3 flex flex-wrap gap-2">
            {story.modules.map((m) => <li key={m} className="bcn-pill bg-card text-ink">{m}</li>)}
          </ul>
        </div>
        {story.cta.app
          ? <a href={appUrl(story.cta.href)} className={ctaClass}>{story.cta.label}</a>
          : <Link href={story.cta.href} className={ctaClass}>{story.cta.label}</Link>}
      </div>
    </article>
  );
}
