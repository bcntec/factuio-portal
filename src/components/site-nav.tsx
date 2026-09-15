"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import clsx from "clsx";
import { site } from "@/content/site";
import { appUrl } from "@/lib/links";

function isActive(pathname: string, href: string): boolean {
  const clean = href.split("#")[0];
  return clean !== "/" && pathname.startsWith(clean);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = site.nav.map((item) => {
    const active = isActive(pathname, item.href);
    return (
      <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}
        className={clsx("text-[15px] font-semibold hover:text-peri", active ? "text-electric" : "text-ink")}>
        {item.label}
      </Link>
    );
  });
  const ctas = (
    <>
      <a href={appUrl("/login")} className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-white">{site.cta.login}</a>
      <a href={appUrl("/register")} className="rounded-lg bg-mint px-4 py-2 text-sm font-bold text-white hover:bg-mint-600">{site.cta.register}</a>
    </>
  );
  return (
    <nav className="sticky top-0 z-20 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <Link href="/" className="bcn-wordmark text-xl text-navy">factu<span className="bracket">io</span></Link>
        <div className="hidden items-center gap-6 md:flex">{links}{ctas}</div>
        <details className="relative md:hidden" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
          <summary className="list-none rounded-lg p-2 hover:bg-surface" aria-label={open ? site.mobileMenuCloseLabel : site.mobileMenuLabel} aria-expanded={open}><Menu size={22} aria-hidden="true" /></summary>
          {open && (
            <div onClick={() => setOpen(false)} className="absolute right-0 mt-2 flex w-56 flex-col gap-3 rounded-xl border border-border bg-card p-4 brutal-shadow-lg">{links}{ctas}</div>
          )}
        </details>
      </div>
    </nav>
  );
}
