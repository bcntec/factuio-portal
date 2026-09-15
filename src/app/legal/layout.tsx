import { LegalNotice } from "@/components/legal-notice";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <article className="mx-auto max-w-3xl px-6 py-12"><LegalNotice />{children}</article>;
}
