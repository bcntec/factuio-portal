import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-[1120px] gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <p className="bcn-wordmark text-xl text-navy">factu<span className="bracket">io</span></p>
          <p className="mt-2 text-sm text-muted-foreground">Facturación VERI*FACTU para autónomos y gestorías.</p>
        </div>
        {site.footer.columns.map((col) => (
          <div key={col.title}>
            <p className="bcn-label mb-3">{col.title}</p>
            <ul className="flex flex-col gap-2 text-sm">
              {col.links.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-electric">{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-5 text-center text-[13px] text-muted-foreground">
        © {new Date().getFullYear()} {site.company} · {site.footer.legalNote}
      </div>
    </footer>
  );
}
