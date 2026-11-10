/**
 * Feature flags del portal. Cada sección está "live" o "soon" (Próximamente).
 * Por defecto todas están en "soon"; se activan en el build con
 * NEXT_PUBLIC_FEATURES_LIVE=precios,historias,docs,app,login (lista separada por comas).
 * "app" = los CTAs "Entrar"/"Empieza gratis" llevan a la web app; en "soon" llevan a la lista de espera.
 * "login" = el botón "Entrar" se muestra; en "soon" no aparece.
 */
export type FeatureKey = "precios" | "historias" | "docs" | "app" | "login";
export type FeatureState = "live" | "soon";

const FEATURE_KEYS: readonly FeatureKey[] = ["precios", "historias", "docs", "app", "login"];

function liveSet(): Set<string> {
  // Acceso literal para que Next inyecte la variable en el build.
  const raw = process.env.NEXT_PUBLIC_FEATURES_LIVE ?? "";
  return new Set(raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean));
}

export function featureState(key: FeatureKey): FeatureState {
  return liveSet().has(key) ? "live" : "soon";
}

export function isSoon(key: FeatureKey): boolean {
  return featureState(key) === "soon";
}

/** Sección (precios/historias/docs) a la que pertenece una ruta interna, o null. */
export function featureForHref(href: string): FeatureKey | null {
  const path = href.split("#")[0].split("?")[0];
  for (const key of FEATURE_KEYS) {
    if (key !== "app" && key !== "login" && (path === `/${key}` || path.startsWith(`/${key}/`))) return key;
  }
  return null;
}

/** true si la ruta interna pertenece a una sección en "soon". */
export function isSoonHref(href: string): boolean {
  const key = featureForHref(href);
  return key !== null && isSoon(key);
}
