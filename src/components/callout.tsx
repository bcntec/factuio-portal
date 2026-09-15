import clsx from "clsx";

const kinds = {
  info: "bg-sky border-[var(--bcn-sky-line)] text-sky-ink",
  success: "bg-mint-tint border-mint-pastel text-electric",
  warning: "bg-peach border-[var(--bcn-peach-line)] text-peach-ink",
  danger: "bg-negative-tint border-negative-line text-negative-ink",
} as const;

export function Callout({ kind, title, children }: { kind: keyof typeof kinds; title?: string; children: React.ReactNode }) {
  return (
    <div role="note" className={clsx("my-5 rounded-xl border px-5 py-4 text-[15px]", kinds[kind])}>
      {title && <p className="mb-1 font-bold">{title}</p>}
      <div className="[&>p]:m-0">{children}</div>
    </div>
  );
}
