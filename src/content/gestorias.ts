import type { Feature, Step } from "@/content/home";

export const gestorias = {
  meta: {
    title: "Gestorías",
    description: "FactuIO para despachos: multiempresa, firma delegada con Anexo I, exportación a A3 y portal de cliente.",
  },
  hero: {
    eyebrow: "Para gestorías y despachos",
    title: "Todos tus clientes, una sola cuenta",
    sub: "Emite y presenta en nombre de tus clientes con su autorización, controla quién ve qué y pásalo todo a tu programa de contabilidad.",
    chips: [
      { tone: "mint", text: "Empresas ilimitadas" },
      { tone: "sky", text: "Firma delegada con Anexo I" },
      { tone: "peach", text: "Exportación A3" },
    ] as { tone: "mint" | "peach" | "sky" | "pink"; text: string }[],
  },
  benefits: [
    { icon: "Building2", title: "Multiempresa con roles por cliente", text: "Cada cliente es una empresa con sus usuarios y permisos. Tú ves todo el porfolio; ellos, solo lo suyo." },
    { icon: "PenLine", title: "Firma delegada con consentimiento", text: "Tu cliente firma la autorización (Anexo I) y tú emites y presentas en su nombre. Sin certificados que mover." },
    { icon: "Share2", title: "Exportación al enlace contable de A3", text: "Ventas y compras en formato SUENLACE.DAT listas para a3ASESOR, a3eco y a3con." },
    { icon: "Users", title: "Portal de cliente y API", text: "Tus clientes suben tickets y facturas recibidas desde su portal o su móvil; tú lo recibes ordenado." },
    { icon: "Eye", title: "Visibilidad de todo el porfolio", text: "Qué facturas faltan por presentar, qué gastos por revisar y qué autorizaciones caducan." },
    { icon: "Calculator", title: "Modelos 303 y 130 de toda la cartera", text: "Una bandeja con los modelos de cada cliente, calculados desde sus facturas y gastos, listos para presentar." },
  ] as Feature[],
  steps: [
    { title: "Invita a tu cliente", text: "Recibe un email, entra con su móvil y ve solo su empresa." },
    { title: "Firma la autorización", text: "Acepta el Anexo I desde su cuenta. Queda registrado con fecha y evidencia." },
    { title: "Emite y presenta en su nombre", text: "Facturas, gastos y modelos trimestrales desde tu panel." },
  ] as Step[],
  sections: {
    benefits: { eyebrow: "Ventajas", title: "Pensado para llevar muchas empresas" },
    steps: { eyebrow: "Cómo funciona", title: "Alta de un cliente en tres pasos" },
    faq: { eyebrow: "FAQ", title: "Preguntas de gestorías" },
  },
  cta: {
    title: "Lleva tu despacho a FactuIO",
    text: "Prueba el plan Gestoría 30 días gratis con tus primeros clientes.",
    label: "Empezar gratis",
  },
} as const;
