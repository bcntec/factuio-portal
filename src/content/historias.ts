import type { PlanId } from "@/content/pricing";
import type { IntegrationStatus } from "@/content/integraciones";

export type StoryTone = "mint" | "peach" | "sky" | "pink";

export interface Story {
  id: string;
  /** Short profile label shown as a chip, e.g. "Autónoma". */
  profile: string;
  tone: StoryTone;
  title: string;
  /** The situation before FactuIO, two or three sentences. */
  situation: string;
  /** How FactuIO solves it, one line per bullet. */
  solution: string[];
  /** Product modules involved, shown as small pills. */
  modules: string[];
  /** Plan suggested for this profile; omitted when the profile pays nothing. */
  plan?: PlanId;
  cta: { label: string; href: string; app?: boolean };
  /** Set when the story depends on an integration that is not available yet; rendered with the integration status pill. */
  status?: Exclude<IntegrationStatus, "available">;
}

export const historias = {
  meta: {
    title: "Historias de uso",
    description: "Cómo usan FactuIO una autónoma, una pyme con equipo, un negocio con cuotas, una gestoría, el cliente de una gestoría y una tienda online.",
  },
  hero: {
    eyebrow: "Historias de uso",
    title: "Así se usa FactuIO en el día a día",
    sub: "Seis situaciones reales de autónomos, pymes y gestorías, y cómo las resuelve FactuIO sin cambiar tu forma de trabajar.",
    chips: [
      { tone: "mint", text: "Autónomos" },
      { tone: "sky", text: "Pymes con equipo" },
      { tone: "peach", text: "Gestorías y sus clientes" },
      { tone: "pink", text: "Tiendas online" },
    ] as { tone: StoryTone; text: string }[],
  },
  labels: {
    situation: "La situación",
    solution: "Cómo lo resuelve FactuIO",
    modules: "Lo que usa",
  },
  stories: [
    {
      id: "autonoma",
      profile: "Autónoma que empieza",
      tone: "mint",
      title: "Marta, diseñadora, emite su primera factura sin certificado digital",
      situation: "Acaba de darse de alta y necesita facturar a su primer cliente. No tiene certificado digital ni quiere aprender qué es VERI*FACTU.",
      solution: [
        "Se registra con su móvil y un código. Sin contraseña.",
        "Da de alta su empresa y autoriza a FactuIO a firmar y presentar por ella.",
        "Emite la factura con QR y envío a la AEAT, y la cobra con un enlace de pago.",
      ],
      modules: ["Facturas VERI*FACTU", "Firma delegada", "Cobro online", "App móvil"],
      plan: "freelance",
      cta: { label: "Empezar con el plan Freelance", href: "/register?plan=freelance", app: true },
    },
    {
      id: "pyme",
      profile: "Pyme con equipo",
      tone: "sky",
      title: "Un estudio de arquitectura pasa del presupuesto a la factura en un clic",
      situation: "Tres socios y una administrativa. Cada proyecto empieza con un presupuesto, sigue con entregas y termina en factura. Los tickets de obra se acumulan en una caja.",
      solution: [
        "Cada persona entra con su usuario y ve lo que le toca: los socios editan, la administrativa emite.",
        "El presupuesto aceptado se convierte en factura con los datos ya rellenos. Los albaranes salen firmados con su plantilla.",
        "Los tickets se fotografían desde el móvil y FactuIO extrae proveedor, base e IVA.",
      ],
      modules: ["Presupuestos", "Albaranes", "Gastos con escaneo", "Usuarios y permisos"],
      plan: "pro",
      cta: { label: "Empezar con el plan Pro", href: "/register?plan=pro", app: true },
    },
    {
      id: "cuotas",
      profile: "Negocio con cuotas",
      tone: "peach",
      title: "Una academia cobra 120 cuotas mensuales sin tocar una factura",
      situation: "Cada mes, las mismas facturas a los mismos alumnos. Antes eran dos tardes de trabajo y una lista de recibos devueltos.",
      solution: [
        "Cada alumno tiene una factura recurrente con su importe y su día de emisión.",
        "El día 1 se emiten solas, firmadas y enviadas a la AEAT.",
        "La remesa SEPA se genera con todas las cuotas y se sube al banco.",
      ],
      modules: ["Facturas recurrentes", "Remesas SEPA", "Contactos", "Notificaciones"],
      plan: "pro",
      cta: { label: "Empezar con el plan Pro", href: "/register?plan=pro", app: true },
    },
    {
      id: "gestoria",
      profile: "Gestoría",
      tone: "sky",
      title: "Un despacho lleva 40 clientes desde una sola cuenta",
      situation: "Cuarenta empresas, cuarenta formas de mandar las facturas: fotos por WhatsApp, PDFs por email, una caja de tickets a final de trimestre. Y cada una con su certificado.",
      solution: [
        "Cada cliente es una empresa dentro de la cuenta del despacho, con sus propios usuarios y permisos.",
        "El cliente firma la autorización (Anexo I) y el despacho emite y presenta en su nombre. Sin mover certificados.",
        "Ventas y compras se exportan al enlace contable de A3 desde la ficha de cada empresa.",
      ],
      modules: ["Multiempresa", "Firma delegada con Anexo I", "Exportación A3", "Portal de cliente"],
      plan: "gestoria",
      cta: { label: "Empezar con el plan Gestoría", href: "/register?plan=gestoria", app: true },
    },
    {
      id: "cliente-gestoria",
      profile: "Cliente de una gestoría",
      tone: "peach",
      title: "Jordi, fontanero, solo hace fotos: su gestor hace el resto",
      situation: "No quiere un programa de facturación. Quiere mandar el ticket de la ferretería y olvidarse. Su gestoría ya usa FactuIO.",
      solution: [
        "Recibe una invitación por email y entra con su móvil. Solo ve su empresa.",
        "Sube tickets y facturas recibidas desde la app; aparecen ordenados en el panel de su gestor.",
        "Su gestor factura y presenta por él con la autorización que Jordi firmó una vez.",
      ],
      modules: ["App móvil", "Gastos con escaneo", "Portal de cliente", "Firma delegada"],
      cta: { label: "Descubre FactuIO para gestorías", href: "/gestorias/" },
    },
    {
      id: "tienda-online",
      profile: "Tienda online",
      tone: "pink",
      title: "Una tienda Shopify convierte cada pedido en una factura verificable",
      situation: "Cientos de pedidos al mes y la obligación de que cada uno tenga su factura VERI*FACTU. Hacerlas a mano no es una opción.",
      solution: [
        "La tienda se conecta a FactuIO una vez, desde Integraciones.",
        "Cada pedido pagado llega como borrador con cliente, líneas e impuestos.",
        "FactuIO emite la factura con QR, la envía a la AEAT y la adjunta al pedido.",
      ],
      modules: ["Conexión Shopify", "Facturas VERI*FACTU", "Bandeja de entrada", "API"],
      plan: "pro",
      status: "soon",
      cta: { label: "Ver el estado de la integración", href: "/integraciones/#commerce" },
    },
  ] as Story[],
  sections: {
    faq: { eyebrow: "FAQ", title: "Preguntas sobre estas historias" },
  },
  cta: {
    title: "¿Cuál es tu historia?",
    text: "Empieza con 30 días gratis del plan Pro. Si tu gestoría ya usa FactuIO, pídele una invitación.",
    label: "Empezar gratis",
  },
} as const;
