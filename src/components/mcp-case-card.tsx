import { Hand, MessageSquare } from "lucide-react";
import type { McpCase } from "@/content/ia";

export function McpCaseCard({ item, labels }: { item: McpCase; labels: { tools: string; write: string; human: string } }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6 brutal-shadow-sm">
      <p className="bcn-label mb-3">{item.who}</p>
      <p className="flex gap-2 text-[15px] font-bold text-navy">
        <MessageSquare size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-peri" />
        <span>«{item.prompt}»</span>
      </p>
      <p className="bcn-label mt-5 mb-2">{labels.tools}</p>
      <ol className="flex flex-col gap-1.5" aria-label={labels.tools}>
        {item.steps.map((s) => (
          <li key={s.tool} className="text-[13px] text-muted-foreground">
            <code className="rounded bg-mint-tint px-1.5 py-0.5 font-mono text-[12px] text-electric">{s.tool}</code>{" "}
            {s.note}
            {s.write && <span className="ml-1.5 rounded bg-peach px-1.5 py-0.5 text-[12px] font-bold text-navy">{labels.write}</span>}
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-lg bg-muted px-3.5 py-2.5 text-[14px] text-navy">{item.answer}</p>
      <p className="mt-auto flex gap-2 pt-4 text-[13px] text-muted-foreground">
        <Hand size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
        <span><strong className="text-navy">{labels.human}:</strong> {item.human}</span>
      </p>
    </article>
  );
}
