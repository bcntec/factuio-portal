import { DocsSidebar } from "@/components/docs-sidebar";
import { ComingSoon } from "@/components/coming-soon";
import { site } from "@/content/site";
import { isSoon } from "@/lib/features";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  if (isSoon("docs")) return <ComingSoon title={site.soon.pages.docs.title} text={site.soon.pages.docs.text} />;
  return (
    <main className="mx-auto grid max-w-[1120px] gap-10 px-6 py-12 md:grid-cols-[220px_1fr]">
      <aside className="md:sticky md:top-24 md:self-start"><DocsSidebar /></aside>
      <article className="min-w-0">{children}</article>
    </main>
  );
}
