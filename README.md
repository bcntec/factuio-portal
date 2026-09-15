# FactuIO Portal

Web pública de FactuIO (marketing + documentación): landing, precios, gestorías y docs. Sitio estático generado con Next.js (`output: "export"`) y desplegado en GitHub Pages.

## Stack

- Next.js 16 (App Router, export estático) + React 19
- Tailwind CSS 4 (tokens en `src/app/globals.css`)
- MDX (`@next/mdx`) para las páginas de documentación y legal
- Vitest + Testing Library para tests unitarios
- Playwright para e2e contra el `out/` ya construido
- ESLint 9 (flat config) con `eslint-config-next`

## Configuración local

```bash
cp .env.example .env.local
npm install
npm run dev        # http://localhost:7010
```

Variables de entorno (ver `.env.example`):

- `NEXT_PUBLIC_APP_URL` — URL pública de la app FactuIO (destino de los CTA "Empieza gratis" / "Entrar"). Obligatoria.
- `NEXT_PUBLIC_BASE_PATH` — prefijo de rutas. `/factuio-portal` en GitHub Pages (proyecto sin dominio propio), vacío (`""`) con dominio propio.
- `NEXT_PUBLIC_SITE_URL` — URL canónica del sitio (sitemap, Open Graph). Opcional: si no se fija, se deriva como `https://bcntec.github.io${NEXT_PUBLIC_BASE_PATH}`. Fijarla cuando el sitio tenga dominio propio.

## Comandos

```bash
npm run dev         # servidor de desarrollo, puerto 7010
npm test             # tests unitarios (vitest)
npm run lint         # eslint .
npm run build         # build estático -> out/
npm run serve         # sirve out/ en el puerto 7010 (requiere build previo)
npm run test:e2e      # playwright, contra out/ servido por webServer
```

El e2e (`playwright.config.ts`) levanta él mismo `npx serve out -l 7010` como `webServer` si no hay nada escuchando ahí (`reuseExistingServer: !process.env.CI`, así que en local reutiliza un server ya arrancado). Antes de correrlo hay que generar el build con las variables que esperan los specs:

```bash
NEXT_PUBLIC_APP_URL=https://app.test NEXT_PUBLIC_BASE_PATH= npm run build
npm run test:e2e
```

### Leg de `basePath` (`PW_BASE_PATH`)

Además del leg normal, hay un leg de e2e que verifica que los links internos son `basePath`-aware (ver `mdx-components.tsx` y `tests/e2e/base-path.spec.ts`). Cuando `PW_BASE_PATH` está definida, `playwright.config.ts` copia `out/` a `.pw-serve/<basePath>/` (así emula el subpath de GitHub Pages, que `serve` no puede montar directamente) y sirve `.pw-serve` como webroot; `use.baseURL` pasa a ser `<origin><basePath>/`. Ese leg solo corre `tests/e2e/base-path.spec.ts` (el resto de specs usan rutas absolutas sin prefijo y no son basePath-aware):

```bash
NEXT_PUBLIC_APP_URL=https://app.test NEXT_PUBLIC_BASE_PATH=/factuio-portal npm run build
PW_BASE_PATH=/factuio-portal PW_BASE_URL=http://localhost:7012 npx playwright test tests/e2e/base-path.spec.ts
```

`.pw-serve/` es un directorio temporal (está en `.gitignore`); no requiere limpieza manual, se recrea en cada run.

## Convenciones del proyecto

- **Todo el copy vive en `src/content/*.ts` y en archivos MDX** (`src/app/**/*.mdx`). Los componentes (`src/components/`) no llevan texto de usuario hardcodeado: importan las constantes de `src/content/`.
- **Sin colores hex en componentes.** Los tokens de color viven en `src/app/globals.css`; los componentes usan clases de Tailwind (`bg-mint`, `text-navy`, etc.), nunca valores `#rrggbb` inline.
- **Los precios son placeholder.** Los importes en `src/content/pricing.ts` son provisionales hasta que se decida el pricing final (ver spec de diseño en [`../factuio-docs/superpowers/specs/2026-09-15-portal-website-design.md`](../factuio-docs/superpowers/specs/2026-09-15-portal-website-design.md) y el plan en [`../factuio-docs/superpowers/plans/2026-09-15-portal-website.md`](../factuio-docs/superpowers/plans/2026-09-15-portal-website.md)).
- **Las páginas legales (`/legal/privacidad`, `/legal/terminos`, `/legal/cookies`) son borradores pendientes de revisión legal.** Llevan el aviso `site.legalDraftNotice` y no deben tratarse como texto legal definitivo.
- **Menú móvil (`site-nav.tsx`).** Es un `<details>` controlado: se cierra al pulsar un link dentro del panel, con Escape, y el `aria-label` del `summary` alterna entre `site.mobileMenuLabel` y `site.mobileMenuCloseLabel` según el estado.

## Despliegue

El deploy es automático vía GitHub Actions (`.github/workflows/pages.yml`) en cada push a `main`:

1. Job `test`: `npm ci`, `npm test`, `npm run lint`, build (`NEXT_PUBLIC_APP_URL=https://app.test`, `NEXT_PUBLIC_BASE_PATH=`), `npm run test:e2e`; luego un segundo build con `NEXT_PUBLIC_BASE_PATH=/factuio-portal` y `npx playwright test tests/e2e/base-path.spec.ts` (`PW_BASE_PATH=/factuio-portal`) — el leg de `basePath` descrito arriba.
2. Job `deploy` (solo en `main`, si `test` pasa; permisos `pages: write`/`id-token: write` acotados a este job): build con las variables reales (`vars.APP_URL`, `vars.BASE_PATH`, `vars.SITE_URL` configuradas en GitHub) y publicación a GitHub Pages.

Configuración manual (una sola vez, en el repo de GitHub):

- **Settings → Pages → Source:** `GitHub Actions`.
- **Settings → Variables → Actions:**
  - `APP_URL` — URL pública de la web app FactuIO (p. ej. `https://app.factuio.io`).
  - `BASE_PATH` — `/factuio-portal` si se sirve en `https://bcntec.github.io/factuio-portal/`, vacío si el sitio tiene dominio propio.
  - `SITE_URL` — opcional. URL canónica del sitio (sitemap, Open Graph); si no se define, se deriva de `https://bcntec.github.io` + `BASE_PATH`.

URL del sitio: `https://bcntec.github.io/factuio-portal/` (o el dominio propio configurado).

## Estructura

```
factuio-portal/
├── src/
│   ├── app/            # rutas (App Router): /, /precios, /gestorias, /docs/**, /legal/**, 404
│   ├── components/     # componentes de UI, sin copy hardcodeado
│   ├── content/        # copy y datos: site.ts, pricing.ts, faq.ts, docs-nav.ts, ...
│   └── lib/             # utilidades (p. ej. links.ts -> appUrl())
├── tests/e2e/            # specs de Playwright (routes, CTAs, responsive, base-path)
├── playwright.config.ts
└── .github/workflows/pages.yml
```
