export type IconName = "FileCheck2" | "FileText" | "Receipt" | "Repeat" | "Inbox" | "Smartphone" | "Building2" | "PenLine" | "Share2" | "Users" | "Eye" | "Link2" | "QrCode" | "Send" | "ShieldCheck" | "ScrollText";
export interface Feature { icon: IconName; title: string; text: string }
export interface Step { title: string; text: string }

export const home = {
  hero: {
    eyebrow: "Facturación VERI*FACTU",
    title: "Factura, cobra y cumple con Hacienda sin complicarte",
    sub: "Facturas VERI*FACTU y TicketBAI, presupuestos, albaranes y gastos en un solo sitio. Desde el móvil o el ordenador.",
    chips: [
      { tone: "mint", text: "✓ VERI*FACTU y TicketBAI incluidos" },
      { tone: "peach", text: "Sin permanencia" },
      { tone: "sky", text: "Prueba 30 días gratis" },
      { tone: "pink", text: "Soporte en español" },
    ] as { tone: "mint" | "peach" | "sky" | "pink"; text: string }[],
    primary: "Empieza gratis",
    secondary: "Ver precios",
  },
  dashboardMock: {
    company: "Estudio Marta SL · B63211494",
    invoiced: { label: "Facturado este mes", value: "12.480 €", delta: "▲ 18% vs mes anterior" },
    pending: { label: "Pendiente de cobro", value: "5.320 €" },
    overdue: { label: "Vencido", value: "1.140 €" },
    bars: [52, 64, 47, 71, 58, 86] as number[],
    barsExpenses: [34, 41, 38, 45, 52, 47] as number[],
    months: ["ABR", "MAY", "JUN", "JUL", "AGO", "SEP"] as string[],
  },
  features: [
    { icon: "FileCheck2", title: "Facturas VERI*FACTU y TicketBAI", text: "Firmadas, encadenadas y con QR. Enviadas a la AEAT o a la hacienda foral sin que hagas nada." },
    { icon: "FileText", title: "Presupuestos y albaranes", text: "Convierte un presupuesto aceptado en factura en un clic. PDFs firmados con tu plantilla." },
    { icon: "Receipt", title: "Gastos con escaneo de tickets", text: "Haz una foto y FactuIO extrae proveedor, base e IVA. Tu IVA soportado siempre al día." },
    { icon: "Repeat", title: "Recurrentes y remesas SEPA", text: "Cuotas mensuales que se emiten solas y se cobran por domiciliación." },
    { icon: "Inbox", title: "Bandeja de entrada con IA", text: "Reenvía un email o un PDF y aparece como borrador listo para revisar." },
    { icon: "Smartphone", title: "App móvil iOS y Android", text: "Emite, cobra y escanea gastos desde el móvil con la misma cuenta." },
  ] as Feature[],
  steps: [
    { title: "Regístrate con tu móvil", text: "Un código por SMS o email. Sin contraseñas que recordar." },
    { title: "Crea tu empresa y autoriza a FactuIO", text: "NIF, datos fiscales y la autorización para presentar tus facturas ante la AEAT." },
    { title: "Emite tu primera factura", text: "Con QR, firma y envío automático. Cóbrala online o por SEPA." },
  ] as Step[],
  compliance: {
    eyebrow: "Cumplimiento",
    title: "Hecho para la normativa española",
    text: "Cada factura se firma, se encadena con hash SHA-256 y se remite a la AEAT en el momento. Guardamos la evidencia de cada envío para que nunca tengas que demostrarlo tú.",
    seals: ["VERI*FACTU", "TicketBAI", "RGPD", "Firma delegada (Anexo I)"] as string[],
  },
  gestoriasTeaser: {
    eyebrow: "Para gestorías",
    title: "Todos tus clientes, una sola cuenta",
    bullets: ["Multiempresa con roles por cliente", "Firma delegada con consentimiento Anexo I", "Exportación al enlace contable de A3"] as string[],
    cta: "Descubre FactuIO para gestorías",
  },
  sections: {
    features: { eyebrow: "Funciones", title: "Todo lo que necesitas para facturar", sub: "Y nada de lo que no." },
    steps: { eyebrow: "Cómo funciona", title: "Tu primera factura en tres pasos" },
    pricing: { eyebrow: "Precios", title: "Un plan para cada etapa", link: "Ver todos los planes y la comparativa →" },
    faq: { eyebrow: "FAQ", title: "Preguntas frecuentes" },
  },
  cta: {
    title: "Emite tu primera factura en minutos",
    text: "Pruébalo 30 días gratis con todas las funciones del plan Pro. Sin tarjeta y sin permanencia.",
    label: "Empezar gratis",
  },
} as const;
