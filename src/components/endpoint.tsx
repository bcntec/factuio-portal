import clsx from "clsx";

const methods = {
  GET: "bg-sky text-sky-ink",
  POST: "bg-mint-pastel text-navy",
  PUT: "bg-peach text-peach-ink",
  DELETE: "bg-negative-tint text-negative-ink",
} as const;

export function Endpoint({ method, path }: { method: keyof typeof methods; path: string }) {
  return (
    <p className="my-4 flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm">
      <span className={clsx("rounded-md px-2 py-0.5 text-xs font-bold", methods[method])}>{method}</span>
      <code>{path}</code>
    </p>
  );
}
