import Link from "next/link";
import { Check } from "lucide-react";
import { home } from "@/content/home";

export function GestoriasTeaser() {
  const g = home.gestoriasTeaser;
  return (
    <section className="mx-auto max-w-[1120px] px-6 py-14">
      <div className="grid gap-8 rounded-3xl bg-navy px-8 py-12 text-white md:grid-cols-2 md:items-center">
        <div>
          <p className="bcn-eyebrow mb-3 !text-mint">{g.eyebrow}</p>
          <h2 className="text-3xl text-white">{g.title}</h2>
          <Link href="/gestorias/" className="mt-6 inline-block rounded-lg bg-mint px-6 py-3 font-bold text-white hover:bg-mint-600">{g.cta}</Link>
        </div>
        <ul className="flex flex-col gap-3">
          {g.bullets.map((b) => <li key={b} className="flex items-center gap-3 text-[15px]"><span className="grid size-6 place-items-center rounded-md bg-mint"><Check size={14} strokeWidth={3} aria-hidden="true" /></span>{b}</li>)}
        </ul>
      </div>
    </section>
  );
}
