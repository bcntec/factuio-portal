import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { DeclarationView } from "@/components/declaration-view";
import { currentDeclaration, declarationPage as p, declarationTextHref } from "@/content/declaracion-responsable";

export const metadata: Metadata = { title: p.meta.title, description: p.meta.description };

// Public, pre-contract copy of the declaración responsable (art. 13.2 RD 1007/2023; art. 15.3 Orden
// HAC/1177/2024: "a disposición del comercializador y del cliente, tanto en el momento de su
// adquisición como posteriormente ... en un formato de uso ampliamente extendido y gratuito").
export default function DeclaracionResponsablePage() {
  const current = currentDeclaration();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="bcn-eyebrow mb-3">{p.eyebrow}</p>
      <h1 className="mb-4 text-4xl text-navy">{p.title}</h1>
      <p className="mb-6 text-[15px] text-muted-foreground">{p.intro}</p>
      {current ? (
        <>
          <p className="bcn-label mb-3">{p.versionLabel} {current.version} · {p.issuedLabel} {current.issued_on}</p>
          <DeclarationView declaration={current} />
          <p className="mt-4">
            <a href={declarationTextHref(current)} download className="font-semibold text-electric hover:underline">{p.download}</a>
          </p>
        </>
      ) : (
        <Callout kind="warning">{p.notIssued}</Callout>
      )}
      <p className="mt-6"><Link href="/declaracion-responsable/historico/" className="font-semibold text-electric hover:underline">{p.archiveLink}</Link></p>
    </main>
  );
}
