import { Plus } from "lucide-react";
import { faq, type FaqTag } from "@/content/faq";

export function Faq({ tag }: { tag: FaqTag }) {
  const items = faq.filter((i) => i.tags.includes(tag));
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-xl border border-border bg-card open:brutal-shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-bold text-navy">
            {item.q}
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-sky text-peri transition-transform group-open:rotate-45"><Plus size={16} /></span>
          </summary>
          <p className="px-5 pb-5 text-[15px] text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
