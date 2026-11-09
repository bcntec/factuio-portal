import type { Metadata } from "next";
import { site } from "@/content/site";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: site.waitlist.meta.title,
  description: site.waitlist.meta.description,
};

export default function WaitlistPage() {
  const w = site.waitlist;
  return (
    <main className="mx-auto max-w-[1120px] px-6 py-24 text-center">
      <p className="bcn-eyebrow mb-3">{w.eyebrow}</p>
      <h1 className="text-4xl text-navy md:text-5xl">{w.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{w.text}</p>
      <div className="mx-auto mt-10 max-w-md"><WaitlistForm /></div>
    </main>
  );
}
