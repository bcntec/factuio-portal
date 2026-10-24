import type { Declaration, DeclarationSection } from "@/content/declaracion-responsable";

function Section({ s }: { s: DeclarationSection }) {
  return (
    <div className="py-3">
      <dt className="font-semibold">{s.label === null ? `${s.key})` : `${s.key}) ${s.label}`}</dt>
      {s.value !== null && <dd className="mt-1 whitespace-pre-line">{s.value}</dd>}
      {s.items?.map((it) => (
        <dd key={it.label} className="mt-2">
          <p className="font-medium">- {it.label}</p>
          <p className="whitespace-pre-line">{it.value}</p>
        </dd>
      ))}
    </div>
  );
}

/** The declaration exactly as issued (art. 15.1 content and order); no copy of its own. */
export function DeclarationView({ declaration }: { declaration: Declaration }) {
  return (
    <article lang="es" className="rounded-xl border border-border bg-card p-6 text-[15px] leading-relaxed brutal-shadow-sm">
      <h2 className="mb-2 text-lg font-bold text-navy">{declaration.title}</h2>
      <dl className="divide-y divide-border">
        {declaration.sections.map((s) => <Section key={s.key} s={s} />)}
      </dl>
      {declaration.annex.length > 0 && (
        <>
          <h3 className="mt-6 text-base font-bold text-navy">ANEXO</h3>
          <dl className="divide-y divide-border">
            {declaration.annex.map((s) => <Section key={s.key} s={s} />)}
          </dl>
        </>
      )}
    </article>
  );
}
