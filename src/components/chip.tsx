import clsx from "clsx";

const tones = { mint: "bg-mint-tint", peach: "bg-peach", sky: "bg-sky", pink: "bg-pink" } as const;

export function Chip({ tone, children }: { tone: keyof typeof tones; children: React.ReactNode }) {
  return <span className={clsx("rounded-lg px-3.5 py-1.5 text-[13px] font-bold text-navy", tones[tone])}>{children}</span>;
}
