import type { Metadata } from "next";
import Link from "next/link";
import { DeclarationView } from "@/components/declaration-view";
import { declarationBundle, declarationPage, declarationTextHref } from "@/content/declaracion-responsable";

const a = declarationPage.archive;

export const metadata: Metadata = { title: a.meta.title, description: a.meta.description };

// Archive of every published version's declaration (AEAT FAQ: se recomienda que todas las
// certificaciones sean accesibles públicamente aunque la versión ya no esté disponible).
export default function HistoricoDeclaracionesPage() {
  const { versions, current } = declarationBundle;
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-4 text-4xl text-navy">{a.title}</h1>
      <p className="mb-6 text-[15px] text-muted-foreground">{a.intro}</p>
      {versions.length === 0 ? (
        <p className="text-[15px]">{a.empty}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {versions.map((d) => (
            <li key={d.version} className="rounded-xl border border-border p-4">
              <p className="font-semibold text-navy">
                {declarationPage.versionLabel} {d.version} · {declarationPage.issuedLabel} {d.issued_on}
                {d.version === current && <span className="bcn-label ml-2">{a.current}</span>}
              </p>
              <p className="mt-1"><a href={declarationTextHref(d)} download className="text-sm font-semibold text-electric hover:underline">{declarationPage.download}</a></p>
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold">{a.show}</summary>
                <div className="mt-3"><DeclarationView declaration={d} /></div>
              </details>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6"><Link href="/declaracion-responsable/" className="font-semibold text-electric hover:underline">{a.back}</Link></p>
    </main>
  );
}
