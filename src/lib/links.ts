import { isSoon } from "@/lib/features";

function readAppUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL;
  if (!raw) throw new Error("NEXT_PUBLIC_APP_URL is not set");
  return raw.replace(/\/+$/, "");
}

/** Absolute link into the FactuIO web app, e.g. appUrl("/register"). */
export function appUrl(path: string): string {
  return `${readAppUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Ruta de la lista de espera del portal, con el prefijo de rutas si lo hay. */
export function waitlistHref(): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/lista-espera/`;
}

/** CTA de registro ("Empieza gratis"): la app si está abierta, si no la lista de espera. */
export function signupHref(path = "/register"): string {
  return isSoon("app") ? waitlistHref() : appUrl(path);
}

/** CTA de acceso ("Entrar"): la app si está abierta, si no la lista de espera. */
export function loginHref(): string {
  return isSoon("app") ? waitlistHref() : appUrl("/login");
}
