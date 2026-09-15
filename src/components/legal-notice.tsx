import { site } from "@/content/site";

export function LegalNotice() {
  return <p role="note" className="mb-6 rounded-xl border border-[var(--bcn-peach-line)] bg-peach px-5 py-3 text-sm font-semibold text-peach-ink">{site.legalDraftNotice}</p>;
}
