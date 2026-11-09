import Link from "next/link";
import { Chip } from "@/components/chip";
import { site } from "@/content/site";
import { signupHref } from "@/lib/links";

export function ComingSoon({ title, text }: { title: string; text: string }) {
  return (
    <main className="mx-auto max-w-[1120px] px-6 py-24 text-center">
      <Chip tone="peach">{site.soon.chip}</Chip>
      <h1 className="mt-6 text-4xl text-navy md:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={signupHref()} className="rounded-lg bg-mint px-7 py-3 font-bold text-white hover:bg-mint-600">{site.soon.cta}</a>
        <Link href="/" className="rounded-lg border-2 border-ink px-7 py-3 font-bold text-ink hover:bg-ink hover:text-white">{site.notFound.back}</Link>
      </div>
    </main>
  );
}
