/**
 * Origen del alta en la lista de espera. Un enlace como factuio.app/?origen=loft15 (o con utm_source)
 * se recuerda durante la visita, para que cuente aunque la persona entre por otra página y llegue
 * al formulario después.
 */
export const SOURCE_PARAMS = ["origen", "utm_source"] as const;
const STORAGE_KEY = "factuio.signup-source";

export function sourceFromSearch(search: string): string | null {
  const params = new URLSearchParams(search);
  for (const p of SOURCE_PARAMS) {
    const v = params.get(p)?.trim();
    if (v) return v;
  }
  return null;
}

/** Guarda el origen de la URL actual (si lo hay) para el resto de la visita. */
export function rememberSource(search: string): void {
  const s = sourceFromSearch(search);
  if (!s) return;
  try { sessionStorage.setItem(STORAGE_KEY, s); } catch { /* almacenamiento bloqueado: se usa solo la URL */ }
}

/** Origen a enviar: el de la URL actual o, si no trae, el recordado en la visita. */
export function currentSource(search: string): string | null {
  const fromUrl = sourceFromSearch(search);
  if (fromUrl) return fromUrl;
  try { return sessionStorage.getItem(STORAGE_KEY); } catch { return null; }
}
