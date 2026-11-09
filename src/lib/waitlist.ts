/**
 * Alta en la lista de espera con doble confirmación de Brevo.
 * Solo se usa en el servidor (ruta /api/waitlist): la clave de Brevo nunca llega al navegador.
 */
export const WAITLIST_PROFILES = ["autonomo", "pyme", "gestoria"] as const;
export type WaitlistProfile = (typeof WAITLIST_PROFILES)[number];

/** Valor que se guarda en el atributo PERFIL del contacto en Brevo. */
export const PROFILE_LABELS: Record<WaitlistProfile, string> = {
  autonomo: "Autónomo",
  pyme: "Pyme",
  gestoria: "Gestoría",
};

/** Atributo de contacto en Brevo (tipo texto) donde se guarda el perfil. */
export const BREVO_PROFILE_ATTRIBUTE = "PERFIL";

export interface WaitlistInput { email: string; profile: WaitlistProfile }
export type WaitlistParseError = "bad_request" | "invalid_email" | "invalid_profile" | "consent_required";
export type WaitlistParseResult =
  | { ok: true; value: WaitlistInput }
  | { ok: true; spam: true }
  | { ok: false; error: WaitlistParseError };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseWaitlist(body: unknown): WaitlistParseResult {
  if (!body || typeof body !== "object") return { ok: false, error: "bad_request" };
  const b = body as Record<string, unknown>;
  // Campo trampa: invisible para personas; si viene relleno es un bot y se responde como si nada.
  if (typeof b.website === "string" && b.website.trim() !== "") return { ok: true, spam: true };
  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL_RE.test(email)) return { ok: false, error: "invalid_email" };
  const profile = b.profile;
  if (typeof profile !== "string" || !(WAITLIST_PROFILES as readonly string[]).includes(profile)) {
    return { ok: false, error: "invalid_profile" };
  }
  if (b.consent !== true) return { ok: false, error: "consent_required" };
  return { ok: true, value: { email, profile: profile as WaitlistProfile } };
}

export interface BrevoConfig { apiKey: string; listId: number; templateId: number; redirectionUrl: string }

/** Lee BREVO_API_KEY, BREVO_WAITLIST_LIST_ID y BREVO_DOI_TEMPLATE_ID; null si falta alguna o no es válida. */
export function readBrevoConfig(env: Record<string, string | undefined>, siteUrl: string): BrevoConfig | null {
  const apiKey = env.BREVO_API_KEY?.trim();
  const listId = Number(env.BREVO_WAITLIST_LIST_ID);
  const templateId = Number(env.BREVO_DOI_TEMPLATE_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0 || !Number.isInteger(templateId) || templateId <= 0) return null;
  return { apiKey, listId, templateId, redirectionUrl: `${siteUrl.replace(/\/+$/, "")}/lista-espera/confirmada/` };
}

export const BREVO_DOI_URL = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";

/** Pide a Brevo que envíe el correo de confirmación. El contacto entra en la lista al confirmar. */
export async function requestDoubleOptIn(input: WaitlistInput, cfg: BrevoConfig, fetchImpl: typeof fetch = fetch): Promise<boolean> {
  const res = await fetchImpl(BREVO_DOI_URL, {
    method: "POST",
    headers: { "api-key": cfg.apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email: input.email,
      attributes: { [BREVO_PROFILE_ATTRIBUTE]: PROFILE_LABELS[input.profile] },
      includeListIds: [cfg.listId],
      templateId: cfg.templateId,
      redirectionUrl: cfg.redirectionUrl,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (res.ok) return true;
  // Sin la clave ni el email en el log: solo el estado y el código de error de Brevo.
  let code = "";
  try { code = ((await res.json()) as { code?: string }).code ?? ""; } catch { /* cuerpo vacío */ }
  console.error(`[waitlist] Brevo DOI failed: HTTP ${res.status} ${code}`);
  return false;
}

/** Límite simple por IP en memoria: max peticiones por ventana. Suficiente para un único contenedor. */
export function createRateLimiter(max: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, number[]>();
  return (key: string): boolean => {
    const t = now();
    const recent = (hits.get(key) ?? []).filter((ts) => t - ts < windowMs);
    if (recent.length >= max) { hits.set(key, recent); return false; }
    recent.push(t);
    hits.set(key, recent);
    if (hits.size > 10_000) hits.clear();
    return true;
  };
}
