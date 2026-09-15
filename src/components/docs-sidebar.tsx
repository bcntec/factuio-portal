"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { docsNav, docsNavLabel } from "@/content/docs-nav";

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <nav aria-label={docsNavLabel} className="flex flex-col gap-1">
      <p className="bcn-label mb-2">{docsNavLabel}</p>
      {docsNav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}
            className={clsx("rounded-lg px-3 py-2 text-sm font-semibold", active ? "bg-mint-tint text-electric" : "text-ink hover:bg-surface")}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
