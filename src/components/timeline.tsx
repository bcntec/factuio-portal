interface Milestone {
  date: string;
  title: string;
  text: string;
}

export function Timeline({ milestones }: { milestones: readonly Milestone[] }) {
  return (
    <ol className="flex flex-col gap-8 border-l-2 border-mint-pastel pl-6">
      {milestones.map((m) => (
        <li key={m.title} className="relative">
          <span aria-hidden="true" className="absolute -left-[29px] top-1 size-3 rounded-lg bg-mint" />
          <p className="bcn-num font-bold text-electric">{m.date}</p>
          <h3 className="mt-1 text-lg text-navy">{m.title}</h3>
          <p className="mt-1 text-[15px] text-muted-foreground">{m.text}</p>
        </li>
      ))}
    </ol>
  );
}
