function readAppUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL;
  if (!raw) throw new Error("NEXT_PUBLIC_APP_URL is not set");
  return raw.replace(/\/+$/, "");
}

/** Absolute link into the FactuIO web app, e.g. appUrl("/register"). */
export function appUrl(path: string): string {
  return `${readAppUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Prefix for static assets referenced by absolute path (public/). */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
