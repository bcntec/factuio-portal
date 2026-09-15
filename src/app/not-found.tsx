import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1120px] px-6 py-24 text-center">
      <p className="bcn-wordmark text-3xl text-navy">factu<span className="bracket">io</span></p>
      <h1 className="mt-6 text-3xl text-navy">{site.notFound.title}</h1>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-mint px-6 py-3 font-bold text-white hover:bg-mint-600">{site.notFound.back}</Link>
    </main>
  );
}
