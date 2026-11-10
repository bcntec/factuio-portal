"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { ProfileOptions } from "@/components/profile-options";
import { currentSource } from "@/lib/signup-source";

type Status = "idle" | "sending" | "done";
type ErrorKey = keyof typeof site.waitlist.errors;

const apiPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/waitlist/`;
const profileKeys = ["autonomo", "pyme", "gestoria", "comunidad"] as const;

/** `source` fija el origen (páginas de socio); si no, se toma de ?origen= / utm_source. */
export function WaitlistForm({ source }: { source?: string } = {}) {
  const w = site.waitlist;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ErrorKey | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          profile: data.get("profile"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          source: source ?? currentSource(window.location.search),
        }),
      });
      if (res.ok) { setStatus("done"); return; }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error && body.error in w.errors ? (body.error as ErrorKey) : "generic");
    } catch {
      setError("generic");
    }
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="text-2xl text-navy">{w.success.title}</h2>
        <p className="mt-2 text-muted-foreground">{w.success.text}</p>
      </div>
    );
  }

  const field = "mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-3 text-ink focus:border-electric focus:outline-none";
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-xl border border-border bg-card p-8 text-left">
      <label className="text-sm font-bold text-navy">
        {w.form.email}
        <input name="email" type="email" required autoComplete="email" placeholder={w.form.emailPlaceholder} className={field} />
      </label>
      <ProfileOptions
        name="profile"
        legend={w.form.profile}
        options={profileKeys.map((k) => ({ value: k, label: w.form.profiles[k] }))}
      />
      {/* Campo trampa para bots: oculto a personas y lectores de pantalla. */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input name="consent" type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-[var(--bcn-mint)]" />
        <span>{w.form.consentBefore}<Link href="/legal/privacidad/" className="font-bold text-electric hover:underline">{w.form.consentLink}</Link>{w.form.consentAfter}</span>
      </label>
      {error && <p role="alert" className="text-sm font-semibold text-negative-ink">{w.errors[error]}</p>}
      <button type="submit" disabled={status === "sending"} className="rounded-lg bg-mint px-7 py-3 font-bold text-white hover:bg-mint-600 disabled:opacity-60">
        {status === "sending" ? w.form.sending : w.form.submit}
      </button>
    </form>
  );
}
