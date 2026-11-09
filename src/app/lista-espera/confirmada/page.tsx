import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.waitlist.confirmed.meta.title,
  description: site.waitlist.confirmed.meta.description,
  robots: { index: false },
};

export default function WaitlistConfirmedPage() {
  const c = site.waitlist.confirmed;
  return (
    <main className="mx-auto max-w-[1120px] px-6 py-24 text-center">
      <p className="bcn-wordmark text-3xl text-navy">factu<span className="bracket">io</span></p>
      <h1 className="mt-6 text-4xl text-navy md:text-5xl">{c.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{c.text}</p>
      <Link href="/" className="mt-8 inline-block rounded-lg bg-mint px-7 py-3 font-bold text-white hover:bg-mint-600">{site.notFound.back}</Link>
    </main>
  );
}
