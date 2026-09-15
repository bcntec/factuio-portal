export interface NavItem { label: string; href: string }
export interface FooterColumn { title: string; links: NavItem[] }

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
  footer: {
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
