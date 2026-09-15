export interface NavItem { label: string; href: string }
export interface FooterColumn { title: string; links: NavItem[] }

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://bcntec.github.io${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;
export const siteRoutes = ["/", "/precios/", "/gestorias/", "/docs/", "/docs/rol-tenant/", "/docs/rol-signer/", "/docs/api/", "/legal/privacidad/", "/legal/terminos/", "/legal/cookies/"];

export const site = {
  name: "FactuIO",
  company: "BCN-TEC",
  supportEmail: "soporte@bcntec.es",
  nav: [
    { label: "Producto", href: "/#funciones" },
    { label: "Precios", href: "/precios/" },
    { label: "Gestorías", href: "/gestorias/" },
    { label: "Docs", href: "/docs/" },
  ] as NavItem[],
  cta: { login: "Entrar", register: "Empieza gratis" },
  mobileMenuLabel: "Abrir menú",
  mobileMenuCloseLabel: "Cerrar menú",
  meta: {
    title: "FactuIO — Facturación VERI*FACTU para autónomos y gestorías",
    description: "Facturas VERI*FACTU y TicketBAI, presupuestos, albaranes y gastos en un solo sitio. Sin permanencia.",
  },
  legalDraftNotice: "Borrador pendiente de revisión legal.",
  notFound: {
    title: "Esta página no existe",
    back: "Volver al inicio",
  },
  footer: {
    tagline: "Facturación VERI*FACTU para autónomos y gestorías.",
    columns: [
      { title: "Producto", links: [
        { label: "Funciones", href: "/#funciones" },
        { label: "Precios", href: "/precios/" },
        { label: "Gestorías", href: "/gestorias/" },
      ] },
      { title: "Recursos", links: [
        { label: "Documentación", href: "/docs/" },
        { label: "API", href: "/docs/api/" },
      ] },
      { title: "Legal", links: [
        { label: "Privacidad", href: "/legal/privacidad/" },
        { label: "Términos", href: "/legal/terminos/" },
        { label: "Cookies", href: "/legal/cookies/" },
      ] },
    ] as FooterColumn[],
    legalNote: "Precios con IVA no incluido.",
  },
} as const;
