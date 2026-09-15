import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto grid max-w-[1120px] gap-10 px-6 py-12 md:grid-cols-[220px_1fr]">
      <aside className="md:sticky md:top-24 md:self-start"><DocsSidebar /></aside>
      <article className="min-w-0">{children}</article>
    </main>
  );
}
