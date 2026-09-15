export type IntegrationStatus = "available" | "beta" | "soon";
export interface Integration { id: string; name: string; vendor: string; mark: string; status: IntegrationStatus; text: string }
export interface IntegrationCategory { id: string; title: string; text: string; items: Integration[] }

export const integrationStatusLabels: Record<IntegrationStatus, string> = {
  available: "Disponible",
  beta: "En beta",
  soon: "Próximamente",
};

export const integraciones = {
  meta: { title: "Integraciones", description: "FactuIO se conecta con la AEAT, TicketBAI, tu gestoría, tus cobros y tus herramientas: API REST, webhooks y MCP." },
  hero: {
    eyebrow: "Integraciones",
    title: "FactuIO se conecta con lo que ya usas",
    sub: "Hacienda, tu gestoría, tus cobros y tus propias herramientas. Sin ficheros a mano ni doble tecleo.",
    chips: [
      { tone: "mint", text: "API REST y webhooks" },
      { tone: "sky", text: "MCP para agentes de IA" },
      { tone: "peach", text: "Exportación a A3" },
    ] as { tone: "mint" | "peach" | "sky" | "pink"; text: string }[],
  },
  legend: { title: "Estado de cada integración" },
  categories: [
    { id: "tax", title: "Hacienda y cumplimiento", text: "Lo que exige la normativa, resuelto dentro de FactuIO.", items: [
      { id: "verifactu", name: "AEAT VERI*FACTU", vendor: "Agencia Tributaria", mark: "VF", status: "available", text: "Firma, encadena y remite cada factura a la AEAT con su QR." },
      { id: "ticketbai", name: "TicketBAI", vendor: "Bizkaia · Gipuzkoa · Araba", mark: "TB", status: "available", text: "Cumplimiento foral equivalente para el País Vasco." },
      { id: "vnif", name: "VNIF", vendor: "Agencia Tributaria", mark: "VN", status: "available", text: "Comprueba el NIF y el nombre de tus clientes contra el censo." },
      { id: "tax-models", name: "Modelos 303 / 130 / 390", vendor: "Agencia Tributaria", mark: "303", status: "soon", text: "Calcula y presenta tus impuestos trimestrales y anuales." },
    ] },
    { id: "accounting", title: "Gestoría y contabilidad", text: "Tu gestor recibe los datos en su programa y liquida desde allí.", items: [
      { id: "a3", name: "A3 (a3ASESOR, a3eco, a3con)", vendor: "Wolters Kluwer", mark: "A3", status: "available", text: "Exporta ventas y compras en el enlace contable SUENLACE." },
      { id: "export", name: "Exportación contable", vendor: "CSV / Excel", mark: "CSV", status: "beta", text: "Diario y libros de IVA para cualquier otro programa." },
    ] },
    { id: "payments", title: "Cobros", text: "Que te paguen desde el enlace de la factura.", items: [
      { id: "stripe", name: "Stripe", vendor: "Tarjeta y wallet", mark: "St", status: "available", text: "Cobro con tarjeta desde la factura, recibo automático al cliente." },
      { id: "redsys", name: "Redsys", vendor: "TPV virtual bancario", mark: "Rd", status: "beta", text: "Cobro con tarjeta a través de tu banco." },
      { id: "bizum", name: "Bizum", vendor: "Vía Redsys", mark: "Bz", status: "beta", text: "Cobro por Bizum desde la factura o la app." },
      { id: "sepa", name: "Domiciliaciones SEPA", vendor: "Adeudo directo", mark: "SEPA", status: "soon", text: "Cobro recurrente de cuotas por domiciliación." },
    ] },
    { id: "signature", title: "Firma y certificados", text: "Firma con tu certificado o delega en FactuIO.", items: [
      { id: "certificates", name: "Certificados digitales", vendor: "FNMT, Camerfirma y otros", mark: "X509", status: "available", text: "Firma ante la AEAT y en los PDF de facturas, presupuestos y albaranes." },
      { id: "docusign", name: "DocuSign", vendor: "Consentimiento de delegación", mark: "DS", status: "soon", text: "Autorización de firma delegada con validez legal." },
    ] },
    { id: "communication", title: "Comunicación", text: "Tus documentos llegan por el canal que use tu cliente.", items: [
      { id: "email", name: "Email", vendor: "SMTP", mark: "@", status: "available", text: "Envío de facturas, presupuestos, códigos de acceso y avisos." },
      { id: "sms", name: "SMS", vendor: "Códigos y avisos", mark: "SMS", status: "beta", text: "Código de un solo uso y avisos por SMS." },
    ] },
    { id: "ai", title: "IA y automatización", text: "Para conectar FactuIO con tus sistemas o con tus agentes.", items: [
      { id: "ocr", name: "Lectura de facturas con IA", vendor: "Foto o PDF", mark: "IA", status: "available", text: "Rellena un gasto o una factura a partir de una imagen." },
      { id: "maia", name: "MAIA", vendor: "Asistente", mark: "M", status: "available", text: "Consulta y actúa sobre facturas, gastos y empresas en lenguaje natural." },
      { id: "mcp", name: "Servidor MCP", vendor: "Claude y otros agentes", mark: "MCP", status: "available", text: "Tus agentes de IA operan FactuIO con herramientas y OAuth." },
      { id: "api", name: "API REST", vendor: "API keys", mark: "API", status: "available", text: "Integra tu propio sistema con una API documentada en OpenAPI." },
      { id: "webhooks", name: "Webhooks", vendor: "Firmados con HMAC", mark: "WH", status: "available", text: "Avisa a tus sistemas cuando se emite, se envía o se cobra una factura." },
    ] },
    { id: "access", title: "Acceso", text: "Sin contraseñas que recordar.", items: [
      { id: "passkeys", name: "Passkeys", vendor: "WebAuthn", mark: "PK", status: "available", text: "Entra con la huella o la cara de tu dispositivo." },
      { id: "otp", name: "Código de un solo uso", vendor: "Email o SMS", mark: "OTP", status: "available", text: "Segundo factor por email o SMS." },
    ] },
  ] as IntegrationCategory[],
  developers: {
    eyebrow: "Para desarrolladores",
    title: "Constrúyelo tú mismo sobre FactuIO",
    bullets: ["API REST con API keys y especificación OpenAPI", "Webhooks firmados: factura emitida, envío completado, cobro recibido", "Servidor MCP para que tus agentes de IA trabajen con tus datos"],
    cta: { label: "Ver la documentación de la API", href: "/docs/api/" },
  },
  missing: {
    title: "¿Echas en falta alguna?",
    text: "Cuéntanos con qué programa trabajas y lo tendremos en cuenta.",
    cta: "Escríbenos",
  },
  cta: { title: "Empieza a facturar con todo conectado", text: "Prueba FactuIO 30 días gratis con todas las integraciones del plan Pro.", label: "Empezar gratis" },
} as const;
