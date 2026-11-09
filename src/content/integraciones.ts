export type IntegrationStatus = "available" | "beta" | "soon" | "roadmap";
export interface Integration { id: string; name: string; vendor: string; mark: string; status: IntegrationStatus; text: string }
export interface IntegrationCategory { id: string; title: string; text: string; items: Integration[] }

export const integrationStatusLabels: Record<IntegrationStatus, string> = {
  available: "Disponible",
  beta: "En beta",
  soon: "Próximamente",
  roadmap: "En roadmap",
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
      { id: "tax-models", name: "Modelos 303 / 130 / 390", vendor: "Agencia Tributaria", mark: "303", status: "available", text: "Calcula el 303, el 130 y el 390 anual y los presenta directamente en la AEAT, en nombre propio con el certificado de la empresa. También puedes descargar el fichero oficial para subirlo a la Sede. Las gestorías presentan por sus clientes con su autorización." },
      { id: "sii", name: "SII", vendor: "Agencia Tributaria", mark: "SII", status: "roadmap", text: "Libros de IVA en tiempo real para grandes empresas y REDEME." },
      { id: "facturae", name: "Facturae", vendor: "Administración pública", mark: "Fe", status: "available", text: "Genera tus facturas en Facturae 3.2.2 con firma XAdES-EPES." },
      { id: "face", name: "FACe y FACeB2B", vendor: "Administración pública", mark: "FACe", status: "available", text: "Envía facturas a las administraciones públicas (FACe) y sigue su estado; recibe facturas por FACeB2B como propuestas de gasto. Operativo frente al entorno de pruebas de FACe; alta en producción en trámite." },
      { id: "einvoice-in", name: "Factura electrónica recibida", vendor: "Facturae, UBL y CII", mark: "XML", status: "available", text: "Convierte la factura electrónica de un proveedor en un gasto listo para revisar." },
      { id: "einvoice-b2b", name: "Factura electrónica B2B", vendor: "Ley Crea y Crece", mark: "B2B", status: "roadmap", text: "Envío electrónico entre empresas cuando se publique el reglamento de la Ley Crea y Crece. Tus facturas ya salen en Facturae." },
      { id: "clave", name: "Cl@ve", vendor: "Administración General del Estado", mark: "C@", status: "roadmap", text: "Presenta sin certificado, con Cl@ve PIN o permanente." },
    ] },
    { id: "accounting", title: "Gestoría y contabilidad", text: "Tu gestor recibe los datos en su programa y liquida desde allí.", items: [
      { id: "a3", name: "A3 (a3ASESOR, a3eco, a3con)", vendor: "Wolters Kluwer", mark: "A3", status: "available", text: "Exporta ventas y compras en el enlace contable SUENLACE." },
      { id: "import-csv", name: "Importador CSV", vendor: "Migración desde otro programa", mark: "CSV", status: "available", text: "Importa contactos, productos, facturas heredadas y gastos desde ficheros CSV. Las facturas heredadas cuentan en tus modelos 303, 130 y 390." },
      { id: "export", name: "Exportación contable", vendor: "CSV / Excel", mark: "CSV", status: "beta", text: "Diario y libros de IVA para cualquier otro programa." },
      { id: "sage", name: "Sage 50 y Sage Despachos", vendor: "Sage", mark: "Sg", status: "roadmap", text: "Importa facturas y gastos con la plantilla de Sage." },
      { id: "contasol", name: "Contasol", vendor: "Software DELSOL", mark: "Cs", status: "roadmap", text: "Importa facturas y gastos en el enlace propio de Contasol." },
      { id: "holded-quipu-anfix", name: "Holded, Quipu y Anfix", vendor: "Asesoría en la nube", mark: "HQ", status: "roadmap", text: "Traspaso directo a plataformas cloud de asesoría." },
    ] },
    { id: "payments", title: "Cobros", text: "Que te paguen desde el enlace de la factura.", items: [
      { id: "stripe", name: "Stripe", vendor: "Tarjeta y wallet", mark: "St", status: "beta", text: "Cobro con tarjeta desde la factura o con un enlace de pago, recibo automático al cliente y devoluciones." },
      { id: "redsys", name: "Redsys", vendor: "TPV virtual bancario", mark: "Rd", status: "beta", text: "Cobro con tarjeta a través de tu banco, con devoluciones y consulta del estado del pago." },
      { id: "bizum", name: "Bizum", vendor: "Vía Redsys", mark: "Bz", status: "beta", text: "Cobro por Bizum desde la factura o la app." },
      { id: "monei", name: "MONEI", vendor: "Tarjeta y Bizum", mark: "Mo", status: "beta", text: "Cobro con tarjeta y Bizum a través de MONEI." },
      { id: "payment-request", name: "Solicitud de pago", vendor: "Correo, SMS y WhatsApp", mark: "Pay", status: "available", text: "Envía un enlace de pago de la factura por correo, SMS o WhatsApp y cobra sin que tu cliente entre en ninguna cuenta." },
      { id: "sepa", name: "Domiciliaciones SEPA", vendor: "Adeudo directo", mark: "SEPA", status: "soon", text: "Cobro recurrente de cuotas por domiciliación." },
      { id: "gocardless", name: "GoCardless", vendor: "SEPA gestionado", mark: "GC", status: "roadmap", text: "Domiciliaciones SEPA sin ficheros bancarios." },
      { id: "paypal", name: "PayPal", vendor: "Cobro internacional", mark: "PP", status: "roadmap", text: "Cobro de clientes fuera de España." },
    ] },
    { id: "banking", title: "Bancos", text: "Tu banco y tus facturas, cuadrados solos.", items: [
      { id: "reconciliation", name: "Conciliación bancaria", vendor: "Extracto bancario", mark: "N43", status: "available", text: "Importa el extracto de tu banco (Norma 43, CAMT.053 o CSV) y cruza los movimientos con cobros y gastos." },
      { id: "psd2", name: "Conexión bancaria automática", vendor: "PSD2", mark: "PSD2", status: "roadmap", text: "Recibe los movimientos del banco sin importar extractos." },
      { id: "nrc", name: "Pago de impuestos (NRC)", vendor: "Tu banco", mark: "NRC", status: "roadmap", text: "Obtén el NRC del banco para presentar los modelos a ingresar." },
    ] },
    { id: "signature", title: "Firma y certificados", text: "Firma con tu certificado o delega en FactuIO.", items: [
      { id: "certificates", name: "Certificados digitales", vendor: "FNMT, Camerfirma y otros", mark: "X509", status: "available", text: "Firma ante la AEAT y en los PDF de facturas, presupuestos y albaranes." },
      { id: "docusign", name: "DocuSign", vendor: "Consentimiento de delegación", mark: "DS", status: "soon", text: "Autorización de firma delegada con validez legal." },
      { id: "qualified-signature", name: "Signaturit, Uanataca y Validated ID", vendor: "Firma electrónica cualificada", mark: "eID", status: "roadmap", text: "Firma electrónica española con certificado en la nube." },
      { id: "cert-issuance", name: "Emisión FNMT y Camerfirma", vendor: "Prestadores de certificados", mark: "FN", status: "roadmap", text: "Guía para obtener tu certificado sin salir de FactuIO." },
    ] },
    { id: "communication", title: "Comunicación", text: "Tus documentos llegan por el canal que use tu cliente.", items: [
      { id: "email", name: "Email", vendor: "SMTP", mark: "@", status: "available", text: "Envío de facturas, presupuestos, códigos de acceso y avisos." },
      { id: "sms", name: "SMS", vendor: "Códigos y avisos", mark: "SMS", status: "beta", text: "Código de un solo uso y avisos por SMS." },
      { id: "whatsapp", name: "WhatsApp Business", vendor: "Meta Cloud API", mark: "WA", status: "roadmap", text: "Envía facturas y presupuestos y recibe la aprobación por chat." },
      { id: "push", name: "Notificaciones push", vendor: "App móvil", mark: "Push", status: "roadmap", text: "Avisos en el móvil cuando te pagan o te aceptan un presupuesto." },
    ] },
    { id: "documents", title: "Documentos", text: "Tus PDFs donde tú quieras.", items: [
      { id: "file-sharing", name: "Enlaces para compartir", vendor: "Descarga para terceros", mark: "URL", status: "available", text: "Comparte facturas y documentos con un enlace." },
      { id: "mail-expenses", name: "Gastos desde el correo", vendor: "Gmail y Outlook", mark: "Mail", status: "beta", text: "Lee tu buzón y propone gastos a partir de las facturas adjuntas (PDF, imagen o Facturae)." },
      { id: "cloud-drive", name: "Google Drive, Dropbox y OneDrive", vendor: "Tu nube", mark: "GD", status: "roadmap", text: "Copia automática de facturas y gastos en tu nube." },
    ] },
    { id: "ai", title: "IA y automatización", text: "Para conectar FactuIO con tus sistemas o con tus agentes.", items: [
      { id: "ocr", name: "Lectura de facturas con IA", vendor: "Foto o PDF", mark: "IA", status: "available", text: "Rellena un gasto o una factura a partir de una imagen." },
      { id: "maia", name: "MAIA", vendor: "Asistente", mark: "M", status: "available", text: "Consulta y actúa sobre facturas, gastos y empresas en lenguaje natural." },
      { id: "mcp", name: "Servidor MCP", vendor: "Claude y otros agentes", mark: "MCP", status: "available", text: "Tu agente de IA (Claude, ChatGPT, Gemini u otro cliente MCP) crea, edita y confirma facturas, gastos y presupuestos, con tu aprobación explícita antes de escribir nada. Con una clave de integración, solo escribe si activas «Permitir escritura»." },
      { id: "api", name: "API REST", vendor: "API keys", mark: "API", status: "available", text: "Integra tu propio sistema con una API documentada en OpenAPI. Las claves de integración son de solo lectura por defecto; con «Permitir escritura» crean y envían documentos, con cabecera Idempotency-Key para reintentar sin duplicar." },
      { id: "webhooks", name: "Webhooks", vendor: "Firmados con HMAC", mark: "WH", status: "available", text: "Avisa a tus sistemas cuando se emite, se envía, se cobra o se devuelve una factura. Gestiona los endpoints por API con una clave con escritura." },
      { id: "recipes", name: "Recetas de automatización", vendor: "Flujos listos para usar", mark: "Rx", status: "available", text: "Automatizaciones predefinidas sobre tus facturas y cobros, sin programar." },
      { id: "zapier", name: "Zapier, Make y n8n", vendor: "Automatización sin código", mark: "Zp", status: "roadmap", text: "Conecta FactuIO con miles de apps sin programar." },
      { id: "chat-agents", name: "Claude, ChatGPT y Gemini", vendor: "Asistentes de IA", mark: "AI", status: "roadmap", text: "Hoy ya puedes conectar tu asistente por MCP. Lo que viene: conectar FactuIO desde el propio chat y pedir una factura con «/facturar», sin configurar nada." },
    ] },
    { id: "access", title: "Acceso", text: "Sin contraseñas que recordar.", items: [
      { id: "passkeys", name: "Passkeys", vendor: "WebAuthn", mark: "PK", status: "available", text: "Entra con la huella o la cara de tu dispositivo." },
      { id: "otp", name: "Código de un solo uso", vendor: "Email o SMS", mark: "OTP", status: "available", text: "Segundo factor por email o SMS." },
    ] },
    { id: "commerce", title: "Comercio online", text: "Una factura por cada venta, sin teclear.", items: [
      { id: "shopify", name: "Shopify", vendor: "Tienda online", mark: "Sh", status: "beta", text: "Cuando un cliente pide factura en la compra, FactuIO la emite al cobrarse el pedido y se la envía por correo con el PDF." },
      { id: "woo-presta", name: "WooCommerce y PrestaShop", vendor: "Tiendas online", mark: "WP", status: "roadmap", text: "Factura automática por cada pedido de tu tienda." },
    ] },
  ] as IntegrationCategory[],
  developers: {
    eyebrow: "Para desarrolladores",
    title: "Constrúyelo tú mismo sobre FactuIO",
    bullets: ["API REST con claves de integración (solo lectura por defecto, escritura opcional) y especificación OpenAPI", "Webhooks firmados con HMAC-SHA256: factura emitida, envío completado, cobro recibido, cobro devuelto; gestionables por API", "Servidor MCP con un extenso catálogo de herramientas: crear, editar y confirmar sobre casi todo lo que expone la API"],
    cta: { label: "Ver la documentación de la API", href: "/docs/api/" },
  },
  missing: {
    title: "¿Echas en falta alguna?",
    text: "Cuéntanos con qué programa trabajas y lo tendremos en cuenta.",
    cta: "Escríbenos",
  },
  cta: { title: "Empieza a facturar con todo conectado", text: "Prueba FactuIO 30 días gratis con todas las integraciones del plan Pro.", label: "Empezar gratis" },
} as const;
