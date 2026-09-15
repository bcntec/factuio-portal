import type { Step } from "@/content/home";

export function Steps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-xl border border-border bg-card p-6">
          <span className="bcn-num mb-3 grid size-9 place-items-center rounded-lg bg-peach font-bold text-navy">{i + 1}</span>
          <h3 className="text-lg text-navy">{s.title}</h3>
          <p className="mt-2 text-[15px] text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
