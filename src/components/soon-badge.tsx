export function SoonBadge({ label = "Pronto" }: { label?: string }) {
  return <span className="ml-1.5 rounded-md bg-peach px-1.5 py-0.5 align-middle text-[11px] font-extrabold uppercase tracking-wide text-navy">{label}</span>;
}
