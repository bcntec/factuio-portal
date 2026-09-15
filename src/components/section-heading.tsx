export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="bcn-eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-3xl text-navy md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}
