import Link from "next/link";
import { Chip } from "@/components/chip";
import { DashboardMock } from "@/components/dashboard-mock";
import { home } from "@/content/home";
import { appUrl } from "@/lib/links";

export function Hero() {
  const h = home.hero;
  return (
    <header className="bg-card">
      <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <p className="bcn-eyebrow mb-3">{h.eyebrow}</p>
          <h1 className="text-4xl text-navy md:text-5xl">{h.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{h.sub}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={appUrl("/register")} className="rounded-lg bg-mint px-7 py-3 font-bold text-white hover:bg-mint-600">{h.primary}</a>
            <Link href="/precios/" className="rounded-lg border-2 border-ink px-7 py-3 font-bold text-ink hover:bg-ink hover:text-white">{h.secondary}</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">{h.chips.map((c) => <Chip key={c.text} tone={c.tone}>{c.text}</Chip>)}</div>
        </div>
        <DashboardMock />
      </div>
    </header>
  );
}
