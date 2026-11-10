export interface NavItem { label: string; href: string }
export interface FooterColumn { title: string; links: NavItem[] }

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://factuio.app").replace(/\/+$/, "");
export const siteRoutes = ["/", "/precios/", "/gestorias/", "/integraciones/", "/automatizaciones/", "/ia/", "/verifactu/", "/historias/", "/docs/", "/docs/rol-tenant/", "/docs/rol-signer/", "/docs/api/", "/docs/mcp/", "/docs/modelo-390-con-ia/", "/legal/privacidad/", "/legal/terminos/", "/legal/cookies/", "/declaracion-responsable/", "/declaracion-responsable/historico/", "/lista-espera/"];

export const site = {
  name: "FactuIO",
  company: "FactuIO",
  supportEmail: "soporte@factuio.app",
  nav: [
    { label: "Producto", href: "/#funciones" },
    { label: "IA", href: "/ia/" },
    { label: "Precios", href: "/precios/" },
    { label: "Gestorías", href: "/gestorias/" },
    { label: "Integraciones", href: "/integraciones/" },
    { label: "Automatizaciones", href: "/automatizaciones/" },
    { label: "VeriFactu", href: "/verifactu/" },
    { label: "Historias", href: "/historias/" },
  ] as NavItem[],
  cta: { login: "Entrar", register: "Empieza gratis" },
  soon: {
    chip: "Próximamente",
    cta: "Apúntate a la lista de espera",
    pages: {
      precios: { title: "Precios, muy pronto", text: "Estamos cerrando los planes. Apúntate a la lista de espera y te avisamos en cuanto estén publicados." },
      historias: { title: "Historias de uso, muy pronto", text: "Estamos preparando casos reales de autónomos, pymes y gestorías que facturan con FactuIO." },
      docs: { title: "Documentación, muy pronto", text: "Estamos terminando las guías de uso y la referencia de la API." },
    },
  },
  waitlist: {
    meta: { title: "Lista de espera — FactuIO", description: "Apúntate a la lista de espera de FactuIO." },
    eyebrow: "Lista de espera",
    title: "Apúntate a la lista de espera",
    text: "FactuIO abre por tandas. Déjanos tu correo y te avisamos cuando tengas acceso.",
    form: {
      email: "Correo electrónico",
      emailPlaceholder: "tu@empresa.es",
      profile: "¿Cómo vas a usar FactuIO?",
      profiles: { autonomo: "Soy autónomo", pyme: "Tengo una pyme", gestoria: "Soy una gestoría", comunidad: "Somos una comunidad o asociación" },
      consentBefore: "He leído la ",
      consentLink: "política de privacidad",
      consentAfter: " y quiero recibir el aviso de acceso y las novedades del lanzamiento de FactuIO.",
      submit: "Apuntarme",
      sending: "Enviando…",
    },
    success: { title: "Revisa tu correo", text: "Te hemos enviado un enlace para confirmar tu correo. Hasta que lo pulses no quedas apuntado." },
    errors: {
      invalid_email: "Revisa el correo electrónico.",
      invalid_profile: "Elige cómo vas a usar FactuIO.",
      consent_required: "Necesitamos que aceptes la política de privacidad.",
      rate_limited: "Demasiados intentos. Prueba de nuevo en unos minutos.",
      generic: "No hemos podido apuntarte ahora mismo. Prueba de nuevo en unos minutos.",
    },
    confirmed: {
      meta: { title: "Correo confirmado — FactuIO", description: "Ya estás en la lista de espera de FactuIO." },
      title: "¡Ya estás en la lista!",
      text: "Gracias por confirmar tu correo. Te escribiremos en cuanto tengas acceso a FactuIO.",
    },
  },
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
        { label: "Integraciones", href: "/integraciones/" },
      ] },
      { title: "Recursos", links: [
        { label: "VeriFactu", href: "/verifactu/" },
        { label: "Historias de uso", href: "/historias/" },
      ] },
      { title: "Legal", links: [
        { label: "Privacidad", href: "/legal/privacidad/" },
        { label: "Términos", href: "/legal/terminos/" },
        { label: "Cookies", href: "/legal/cookies/" },
        { label: "Declaración responsable", href: "/declaracion-responsable/" },
      ] },
    ] as FooterColumn[],
    legalNote: "Precios con IVA no incluido.",
  },
} as const;
