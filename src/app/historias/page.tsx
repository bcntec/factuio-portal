import type { Metadata } from "next";
import { Chip } from "@/components/chip";
import { SectionHeading } from "@/components/section-heading";
import { StoryCard } from "@/components/story-card";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { historias } from "@/content/historias";
import { appUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: historias.meta.title,
  description: historias.meta.description,
};

export default function StoriesPage() {
  const h = historias;
  return (
    <main>
      <header className="bg-card px-6 pb-14 pt-18 text-center">
        <div className="mx-auto max-w-[1120px]">
          <p className="bcn-eyebrow mb-3">{h.hero.eyebrow}</p>
          <h1 className="text-4xl text-navy md:text-5xl">{h.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{h.hero.sub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">{h.hero.chips.map((c) => <Chip key={c.text} tone={c.tone}>{c.text}</Chip>)}</div>
        </div>
      </header>

      <section aria-label={h.hero.eyebrow} className="mx-auto flex max-w-[1120px] flex-col gap-8 px-6 py-16">
        {h.stories.map((story, i) => <StoryCard key={story.id} story={story} flip={i % 2 === 1} />)}
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <SectionHeading eyebrow={h.sections.faq.eyebrow} title={h.sections.faq.title} />
        <Faq tag="historias" />
      </section>

      <CtaBand title={h.cta.title} text={h.cta.text} cta={{ label: h.cta.label, href: appUrl("/register") }} />
    </main>
  );
}
