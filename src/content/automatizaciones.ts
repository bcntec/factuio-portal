import type { Feature } from "@/content/home";

export type ConnectorStatus = "available" | "beta" | "soon";

export interface Connector {
  id: string;
  name: string;
  status: ConnectorStatus;
  tagline: string;
  today: string;
  points: string[];
  link?: { href: string; label: string };
}

export interface WebhookEvent { name: string; when: string; idea: string }
export interface Flow { tool: string; trigger: string; steps: string[] }

export const automatizaciones = {
  meta: {
    title: "Automatizaciones — recetas, MCP, n8n, Make, webhooks y correo",
    description: "Automatiza tu facturación con FactuIO: recetas listas para activar, conectores MCP, n8n y Make, webhooks firmados, API con claves de integración y correo de entrada y salida.",
  },
  hero: {
    eyebrow: "Automatizaciones",
    title: "Que la facturación se haga sola, y tú solo lo revisas",
    sub: "Recetas que se activan con un clic, tu IA conectada por MCP, flujos en n8n o Make, webhooks firmados y correos que entran y salen solos. Emitir en tu nombre exige siempre tu consentimiento explícito.",
    chips: [
      { tone: "mint", text: "Recetas listas para activar" },
      { tone: "sky", text: "MCP · n8n · Make" },
      { tone: "peach", text: "Webhooks HMAC" },
      { tone: "pink", text: "Correo de entrada y salida" },
    ] as { tone: "mint" | "peach" | "sky" | "pink"; text: string }[],
  },
  statusLabels: { available: "Disponible", beta: "Beta", soon: "En camino" } as Record<ConnectorStatus, string>,
  recipes: {
    eyebrow: "Sin configurar nada",
    title: "Recetas listas para activar",
    sub: "Dentro de FactuIO, en Automatizaciones. Las activas o las paras cuando quieras y ves el histórico de cada ejecución. Las que emiten facturas en tu nombre solo se activan con tu consentimiento explícito, confirmado con un código de un solo uso.",
    items: [
      { icon: "Send", title: "Enviar la factura al emitir", text: "En cuanto emites, el cliente la recibe por correo con el PDF. Sin pasos manuales." },
      { icon: "Repeat", title: "Recordatorios de impago", text: "Avisos escalonados a quien no ha pagado, con la plantilla de correo de tu empresa. Se detienen solos al cobrar o rectificar la factura, o cuando tú lo decides." },
      { icon: "FileText", title: "Seguimiento de presupuestos", text: "Recuerda al cliente los presupuestos enviados que siguen sin respuesta." },
      { icon: "ScrollText", title: "Etiquetar facturas", text: "Marca automáticamente las facturas grandes o las de un cliente concreto para revisarlas o filtrarlas." },
    ] as Feature[],
    moreTitle: "Más ejemplos de recetas",
    more: [
      { status: "soon", when: "Un cliente sube un ticket", then: "Avisa a su gestor por mensaje interno, solo si supera el importe que elijas." },
      { status: "soon", when: "Llega una factura de un proveedor habitual", then: "Confirma sola la propuesta de gasto cuando ya has aprobado varias suyas." },
      { status: "soon", when: "La AEAT rechaza un envío", then: "Avisa al responsable y abre el caso para arreglarlo con MAiaa." },
      { status: "soon", when: "Se cobra una factura", then: "Envía el recibo al cliente por correo." },
      { status: "soon", when: "Se cierra el trimestre", then: "Manda un resumen al gestor o al cliente." },
      { status: "soon", when: "Pasa cualquier evento", then: "Lo reenvía a tu sistema por webhook." },
    ] as { status: ConnectorStatus; when: string; then: string }[],
  },
  expenseChannels: {
    eyebrow: "Gastos sin teclear",
    title: "Reenvía el ticket por donde quieras y se convierte en gasto",
    sub: "Correo, WhatsApp o Telegram: mandas la foto del ticket o el PDF de la factura y FactuIO lee proveedor, fecha, base e IVA. Te llega como propuesta de gasto y tú la confirmas.",
    items: [
      { id: "email", name: "Correo", status: "beta", text: "Conecta tu Gmail y FactuIO revisa los adjuntos de las facturas que te llegan. Outlook, en camino." },
      { id: "app", name: "App móvil", status: "available", text: "Haz la foto del ticket con el móvil y queda registrado al momento." },
      { id: "whatsapp", name: "WhatsApp", status: "soon", text: "Reenvía el ticket o la factura al número de FactuIO de tu empresa." },
      { id: "telegram", name: "Telegram", status: "soon", text: "Mándalo al bot de FactuIO, desde el móvil o el ordenador." },
    ] as { id: string; name: string; status: ConnectorStatus; text: string }[],
    note: "Cada gasto entra como propuesta: nada se registra sin tu confirmación, salvo que actives la receta de proveedores conocidos.",
  },
  connectors: {
    eyebrow: "Conectores",
    title: "Conecta FactuIO con tus herramientas",
    items: [
      {
        id: "mcp",
        name: "MCP — tu asistente de IA",
        status: "available",
        tagline: "Claude, ChatGPT o cualquier cliente MCP, conectado a tu cuenta.",
        today: "188 herramientas: facturas, clientes, gastos, cobros, impuestos y cartera de la gestoría.",
        points: [
          "Clave personal con segundo factor, caducidad de 30, 90 o 365 días y modo solo lectura.",
          "Todo lo que escribe devuelve antes una vista previa y espera tu confirmación.",
          "Cada acción queda auditada con el canal «agente».",
        ],
        link: { href: "/ia/", label: "Ver casos con IA →" },
      },
      {
        id: "n8n",
        name: "n8n",
        status: "soon",
        tagline: "Flujos visuales, en la nube o en tu propio servidor.",
        today: "Ya funciona con el nodo HTTP Request (API + clave de integración) y el nodo Webhook para recibir eventos.",
        points: [
          "Nodo propio de FactuIO en desarrollo: disparadores por evento y acciones sin escribir peticiones a mano.",
          "La URL que recibe los webhooks debe ser pública (n8n Cloud o tu servidor con dominio).",
          "Plantillas de flujo de ejemplo con el lanzamiento del nodo.",
        ],
      },
      {
        id: "make",
        name: "Make",
        status: "soon",
        tagline: "Escenarios sin código con miles de apps.",
        today: "Ya funciona con el módulo HTTP (API + clave de integración) y el módulo Custom webhook para recibir eventos.",
        points: [
          "App oficial de FactuIO en Make en la hoja de ruta.",
          "Útil para unir FactuIO con Google Sheets, Slack, Drive, Notion o tu CRM.",
          "Zapier, detrás de Make.",
        ],
      },
      {
        id: "api",
        name: "API REST",
        status: "available",
        tagline: "Para tu propio código o tu agente.",
        today: "Claves de integración solo lectura por defecto; con escritura opcional en facturas, presupuestos, albaranes, gastos, clientes, correos, cobros, importador y webhooks.",
        points: [
          "Idempotency-Key en las altas: reintentas sin duplicar facturas.",
          "Referencia externa por factura para enlazarla con tu pedido o tu ERP.",
          "Especificación OpenAPI y Retry-After cuando hay límite de peticiones.",
        ],
        link: { href: "/docs/api/", label: "Referencia de la API →" },
      },
    ] as Connector[],
  },
  webhooks: {
    eyebrow: "Webhooks",
    title: "FactuIO avisa a tus sistemas en el momento",
    sub: "Registras una URL y FactuIO le envía un POST en JSON cada vez que pasa algo. Los endpoints se gestionan por API con una clave de integración con escritura.",
    events: [
      { name: "invoice.finalized", when: "Se emite una factura", idea: "Copiar el PDF a Drive o avisar al equipo en Slack." },
      { name: "submission.completed", when: "Termina el envío a la AEAT", idea: "Marcar el pedido como facturado en tu tienda o ERP." },
      { name: "invoice.paid", when: "Se cobra una factura", idea: "Apuntar el cobro en tu hoja de tesorería." },
      { name: "invoice.payment_reversed", when: "Se devuelve un cobro", idea: "Abrir una tarea para revisar la devolución." },
    ] as WebhookEvent[],
    security: [
      { icon: "ShieldCheck", title: "Firmados con HMAC-SHA256", text: "Cada envío lleva la cabecera X-Webhook-Signature. Compruébala con tu secreto y descarta lo que no cuadre." },
      { icon: "Repeat", title: "Reintentos automáticos", text: "Si tu URL falla, FactuIO lo vuelve a intentar hasta tres veces." },
      { icon: "ShieldAlert", title: "Solo URLs públicas", text: "Se rechazan direcciones de red privada o local para que nadie pueda usar los webhooks contra tu red interna." },
    ] as Feature[],
  },
  email: {
    eyebrow: "Correo",
    title: "Correos que entran y salen solos",
    out: {
      title: "Salida: a tus clientes",
      items: [
        "Factura por correo con el PDF, a mano o automáticamente al emitir.",
        "Solicitudes de pago por correo, SMS o WhatsApp, con enlace para pagar con tarjeta o Bizum.",
        "Recordatorios de impago y de presupuestos con la plantilla de correo de tu empresa.",
        "Recibo al cliente y aviso a tu empresa cuando se cobra.",
      ],
    },
    in: {
      title: "Entrada: tus facturas de proveedor",
      items: [
        "Conecta tu buzón de Gmail y FactuIO lee los adjuntos: PDF, foto del ticket o factura electrónica (Facturae, UBL, CII).",
        "Cada factura llega como propuesta de gasto con proveedor, fecha e importes ya leídos.",
        "Tú confirmas o descartas; lo dudoso queda para revisar. También desde el móvil o pidiéndoselo a tu IA.",
        "Outlook y Microsoft 365, en camino.",
      ],
    },
  },
  flows: {
    eyebrow: "Ideas para empezar",
    title: "Flujos que puedes montar hoy",
    items: [
      { tool: "n8n o Make", trigger: "invoice.paid", steps: ["Recibe el webhook y comprueba la firma", "Añade una fila en Google Sheets con cliente, importe y fecha", "Avisa en Slack: «Cobrada la factura 2026-A-0142»"] },
      { tool: "n8n o Make", trigger: "Formulario web", steps: ["Un cliente rellena tu formulario de encargo", "POST /invoices con Idempotency-Key crea el borrador", "Te llega un correo para revisarlo y emitirlo"] },
      { tool: "Claude por MCP", trigger: "Lunes por la mañana", steps: ["«¿Qué facturas vencen esta semana?»", "Prepara enlaces de pago para las vencidas", "Confirmas y se crean"] },
      { tool: "Receta + correo", trigger: "Factura de proveedor en Gmail", steps: ["FactuIO lee el adjunto", "Propone el gasto con importes e IVA", "Lo confirmas y entra en tu 303"] },
    ] as Flow[],
  },
  cta: {
    title: "Automatiza tu facturación",
    text: "Apúntate a la lista de espera y prueba las recetas, el MCP y los webhooks entre los primeros.",
    label: "Apuntarme",
  },
} as const;
