import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { WaitlistForm } from "@/components/waitlist-form";
import { partnerBySlug, partners } from "@/content/partners";

export const dynamicParams = false;

export function generateStaticParams() {
  return partners.map((p) => ({ partner: p.slug }));
}

type Props = { params: Promise<{ partner: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = partnerBySlug((await params).partner);
  if (!p) return {};
  return { title: `${p.title} — FactuIO`, description: p.text, robots: { index: false, follow: true } };
}

export default async function PartnerPage({ params }: Props) {
  const p = partnerBySlug((await params).partner);
  if (!p) notFound();
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <main className="mx-auto max-w-[1120px] px-6 py-20 text-center">
      <div className="flex items-center justify-center gap-5" aria-label={`FactuIO × ${p.name}`}>
        <Image src={`${base}/brand/factuio-logo.png`} alt="FactuIO" width={118} height={44} priority />
        <span aria-hidden className="text-2xl font-light text-ink-3">×</span>
        {p.logo
          ? <Image src={`${base}${p.logo.src}`} alt={p.name} width={p.logo.width} height={p.logo.height} className="h-16 w-auto" priority />
          : <span className="text-2xl font-bold text-navy">{p.name}</span>}
      </div>
      {/* El título no se ve (los logos ya lo dicen), pero queda para lectores de pantalla y buscadores. */}
      <h1 className="sr-only">{p.title}</h1>
      <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">{p.text}</p>
      <div className="mx-auto mt-10 max-w-md"><WaitlistForm source={p.slug} /></div>
    </main>
  );
}
