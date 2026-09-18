export type PlanId = "freelance" | "pro" | "gestoria";

export interface Plan {
  id: PlanId; name: string; tagline: string;
  monthly: number; annualMonthly: number;
  cta: string; featured?: boolean; featuresTitle: string; features: string[];
}
export interface CompareRow { label: string; values: Record<PlanId, true | false | string> }

// PLACEHOLDER: importes provisionales hasta decisión de negocio (ver spec 2026-09-15-portal-website-design).
export const plans: Plan[] = [
  { id: "freelance", name: "Freelance", tagline: "Para autónomos que empiezan", monthly: 9, annualMonthly: 7.5,
    cta: "Contratar Freelance", featuresTitle: "Incluye:",
    features: ["Facturas ilimitadas con VERI*FACTU", "Modelos 303 y 130", "Presupuestos y albaranes", "Gastos con escaneo de tickets", "1 empresa · 1 usuario", "App móvil iOS y Android"] },
  { id: "pro", name: "Pro", tagline: "Para negocios en marcha", monthly: 19, annualMonthly: 15.8, featured: true,
    cta: "Contratar Pro", featuresTitle: "Todo lo de Freelance y además:",
    features: ["Facturas recurrentes y remesas SEPA", "Cobro online y recordatorios", "Hasta 3 empresas · 5 usuarios", "Bandeja de entrada con IA", "MAIAA, tu asistente de IA", "Soporte prioritario por chat"] },
  { id: "gestoria", name: "Gestoría", tagline: "Para despachos y multiempresa", monthly: 49, annualMonthly: 40.8,
    cta: "Contratar Gestoría", featuresTitle: "Todo lo de Pro y además:",
    features: ["Empresas y usuarios ilimitados", "Firma delegada para tus clientes", "Modelos de toda la cartera en un vistazo", "Portal de cliente y API", "Roles y permisos por empresa", "Gestor de cuenta dedicado"] },
];

export const billingNote = { monthly: "facturado mes a mes", annual: "facturado anualmente · 2 meses gratis" } as const;
export const annualBadge = "2 meses gratis con el plan anual";

export const compareRows: CompareRow[] = [
  { label: "Facturas con VERI*FACTU / TicketBAI", values: { freelance: true, pro: true, gestoria: true } },
  { label: "Modelos 303 y 130", values: { freelance: true, pro: true, gestoria: true } },
  { label: "Presupuestos y albaranes", values: { freelance: true, pro: true, gestoria: true } },
  { label: "Gastos con escaneo de tickets", values: { freelance: true, pro: true, gestoria: true } },
  { label: "Facturas recurrentes", values: { freelance: false, pro: true, gestoria: true } },
  { label: "Remesas SEPA y cobro online", values: { freelance: false, pro: true, gestoria: true } },
  { label: "Bandeja de entrada con IA", values: { freelance: false, pro: true, gestoria: true } },
  { label: "MAIAA, tu asistente de IA", values: { freelance: false, pro: true, gestoria: true } },
  { label: "Empresas", values: { freelance: "1", pro: "3", gestoria: "Ilimitadas" } },
  { label: "Usuarios", values: { freelance: "1", pro: "5", gestoria: "Ilimitados" } },
  { label: "Firma delegada", values: { freelance: false, pro: false, gestoria: true } },
  { label: "Modelos de toda la cartera", values: { freelance: false, pro: false, gestoria: true } },
  { label: "Portal de cliente y API", values: { freelance: false, pro: false, gestoria: true } },
  { label: "Soporte", values: { freelance: "Email", pro: "Chat prioritario", gestoria: "Gestor dedicado" } },
];

export function formatEur(n: number): string {
  return new Intl.NumberFormat("es-ES", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n);
}

/** User-visible copy for PricingCards (billing toggle, plan card chrome). */
export const pricingLabels = {
  monthly: "Mensual",
  annual: "Anual",
  featuredBadge: "El más elegido",
  from: "desde",
  perMonth: "€/mes",
  billingPeriodLabel: "Periodo de facturación",
} as const;

/** User-visible copy for CompareTable. */
export const compareLabels = {
  feature: "Funcionalidad",
  included: "Incluido",
  notIncluded: "No incluido",
} as const;

/** User-visible copy for the /precios page shell. */
export const pricingPage = {
  meta: {
    title: "Precios",
    description: "Planes Freelance, Pro y Gestoría. VERI*FACTU y TicketBAI incluidos, sin permanencia, 30 días gratis.",
  },
  hero: {
    eyebrow: "Precios",
    title: "¿Cómo quieres llevar tu facturación?",
    sub: "Facturas VERI*FACTU, gastos, presupuestos y albaranes en un solo sitio. Elige tu plan y cámbialo cuando quieras.",
    chips: [
      { tone: "mint", text: "✓ VERI*FACTU y TicketBAI incluidos" },
      { tone: "peach", text: "Sin permanencia" },
      { tone: "sky", text: "Prueba 30 días gratis" },
      { tone: "pink", text: "Soporte en español" },
    ],
  },
  plans: { eyebrow: "Planes", title: "Elige tu plan" },
  compare: { eyebrow: "Comparativa", title: "Compara los planes en detalle" },
  faq: { eyebrow: "FAQ", title: "Preguntas frecuentes" },
  cta: {
    title: "Emite tu primera factura en minutos",
    text: "Pruébalo 30 días gratis con todas las funciones del plan Pro. Sin tarjeta y sin permanencia.",
    label: "Empezar gratis",
  },
} as const;
