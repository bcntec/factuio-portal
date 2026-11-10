import type { Feature } from "@/content/home";

/** Un paso de una conversación de ejemplo con un asistente conectado por MCP. */
export interface ToolStep { tool: string; note: string; write?: boolean }
export interface McpCase {
  id: string;
  who: string;
  prompt: string;
  steps: ToolStep[];
  answer: string;
  human: string;
}

export const ia = {
  meta: {
    title: "FactuIO con IA — tu facturación desde Claude, ChatGPT o MAIAA",
    description: "FactuIO está pensado para trabajar con IA: un asistente dentro de la app, un servidor MCP para conectar Claude o ChatGPT a tus datos y una API para automatizar. La IA prepara; tú decides.",
  },
  hero: {
    eyebrow: "Facturación orientada a IA",
    title: "Pídeselo a tu IA. FactuIO lo prepara, tú lo confirmas",
    sub: "Habla con tu facturación desde la app, desde Claude o desde ChatGPT. Facturas, cobros, gastos e impuestos con lenguaje normal, y nada sale hacia Hacienda sin que una persona lo confirme.",
    chips: [
      { tone: "mint", text: "188 herramientas MCP" },
      { tone: "sky", text: "Claude · ChatGPT · cualquier cliente MCP" },
      { tone: "peach", text: "Claves de solo lectura" },
      { tone: "pink", text: "Tu propia clave de IA" },
    ] as { tone: "mint" | "peach" | "sky" | "pink"; text: string }[],
    primary: "Apúntate para probarlo",
    secondary: "Cómo se conecta",
  },
  chatMock: {
    client: "Claude · conector factuio",
    user: "¿Quién me debe dinero desde hace más de 30 días? Prepárales un enlace de pago.",
    tools: ["list_invoices", "create_payment_link · vista previa"],
    reply: "Tienes 3 facturas vencidas por 1.140 €: Estudio Pepito (620 €, 41 días), Taller Mar (360 €, 35 días) y Acme Lab (160 €, 32 días). He preparado un enlace de pago para cada una, con tarjeta o Bizum. ¿Los creo?",
    confirm: "Confirmar",
  },
  ways: {
    eyebrow: "Tres formas de usarlo",
    title: "La IA donde ya trabajas",
    items: [
      { icon: "Sparkles", title: "MAIAA, dentro de FactuIO", text: "Un asistente en la web y en el móvil con 100 herramientas: crea facturas, busca gastos, prevé el trimestre y te propone cómo arreglar un error. Puedes usar tu propia clave de IA para que nada pase por FactuIO." },
      { icon: "Plug", title: "Tu IA de siempre, por MCP", text: "Conecta Claude, ChatGPT o cualquier cliente compatible con MCP a tu cuenta. Tu asistente ve tus facturas, clientes, gastos e impuestos y trabaja con ellos, con tus mismos permisos." },
      { icon: "Workflow", title: "Automatización por API", text: "API REST con escritura, webhooks firmados e Idempotency-Key para reintentar sin duplicar. Lista para n8n, Zapier, Make o tu propio agente." },
    ] as Feature[],
  },
  cases: {
    eyebrow: "Casos MCP",
    title: "Lo que puedes pedirle a tu IA",
    sub: "Ejemplos de conversación con las herramientas que usa el asistente por debajo. Las que cambian datos devuelven primero una vista previa y no guardan nada hasta que confirmas.",
    labels: { tools: "Lo que hace por debajo", write: "vista previa + confirmación", human: "Lo que decides tú" },
    items: [
      {
        id: "factura",
        who: "Autónoma",
        prompt: "Hazle una factura a Estudio Pepito por 3 horas de consultoría a 60 €.",
        steps: [
          { tool: "search_companies", note: "encuentra al cliente y su NIF" },
          { tool: "search_products", note: "busca «Consultoría» en tu catálogo" },
          { tool: "create_invoice_draft", note: "prepara el borrador con IVA", write: true },
          { tool: "confirm_action", note: "lo guarda cuando dices «sí»" },
        ],
        answer: "Borrador listo: 180 € + 37,80 € de IVA − 27 € de IRPF = 190,80 €.",
        human: "Revisas el borrador y lo emites. El envío a la AEAT se hace desde FactuIO, nunca desde el asistente.",
      },
      {
        id: "cobros",
        who: "Pyme",
        prompt: "¿Quién me debe dinero desde hace más de 30 días? Prepárales un enlace de pago.",
        steps: [
          { tool: "list_invoices", note: "filtra las vencidas" },
          { tool: "create_payment_link", note: "un enlace por factura, con tarjeta o Bizum", write: true },
          { tool: "confirm_action", note: "crea los enlaces" },
        ],
        answer: "3 facturas vencidas por 1.140 €, con su enlace de pago preparado.",
        human: "Confirmas antes de que se cree nada; el cliente paga desde el enlace.",
      },
      {
        id: "impuestos",
        who: "Autónomo",
        prompt: "¿Cuánto IVA voy a pagar este trimestre? Déjame preparado el 303.",
        steps: [
          { tool: "tax_forecast", note: "previsión con tus facturas y gastos" },
          { tool: "draft_tax_return", note: "borrador del modelo 303", write: true },
          { tool: "confirm_action", note: "guarda el borrador" },
        ],
        answer: "Previsión: 1.284 € a ingresar. Borrador del 303 guardado.",
        human: "Presentar el modelo es siempre cosa tuya: el asistente no puede presentar impuestos.",
      },
      {
        id: "gastos",
        who: "Pyme",
        prompt: "Revisa los gastos que me han llegado por correo esta semana.",
        steps: [
          { tool: "list_email_proposals", note: "facturas de proveedor leídas del correo" },
          { tool: "confirm_email_proposal", note: "las pasa a gasto", write: true },
        ],
        answer: "4 propuestas: luz, alquiler, hosting y una factura de Amazon sin NIF.",
        human: "Eliges cuáles se registran; la que tiene datos dudosos queda para revisar.",
      },
      {
        id: "cartera",
        who: "Gestoría",
        prompt: "¿Qué clientes tienen el 303 sin preparar? Prepárame los borradores.",
        steps: [
          { tool: "portfolio_status", note: "semáforo de toda la cartera" },
          { tool: "draft_tax_returns_bulk", note: "borradores de muchos clientes a la vez", write: true },
          { tool: "confirm_action", note: "los guarda" },
        ],
        answer: "12 de 48 clientes sin 303. Borradores preparados para los 12.",
        human: "La gestoría revisa cada borrador y presenta con la autorización del cliente.",
      },
      {
        id: "presupuesto",
        who: "Autónomo",
        prompt: "El presupuesto de reforma de Taller Mar está aceptado: conviértelo en factura.",
        steps: [
          { tool: "list_quotes", note: "encuentra el presupuesto aceptado" },
          { tool: "convert_quote_to_invoice", note: "copia las líneas a una factura", write: true },
          { tool: "confirm_action", note: "crea la factura" },
        ],
        answer: "Factura creada desde el presupuesto, con las mismas líneas e importes.",
        human: "Revisas la factura antes de emitirla.",
      },
    ] as McpCase[],
  },
  guardrails: {
    eyebrow: "Con las manos en el volante",
    title: "La IA prepara; la persona decide",
    items: [
      { icon: "Hand", title: "Vista previa antes de cada cambio", text: "Cada herramienta que escribe devuelve primero lo que va a hacer. Nada se guarda hasta que lo confirmas." },
      { icon: "ShieldCheck", title: "Nunca habla con Hacienda", text: "El asistente no puede presentar impuestos ni elegir cómo se pagan. Eso queda siempre en manos de una persona." },
      { icon: "KeyRound", title: "Claves personales con 2FA", text: "La clave MCP se crea con segundo factor, caduca a los 30, 90 o 365 días y puede ser de solo lectura. La revocas cuando quieras." },
      { icon: "Users", title: "Tus permisos, ni uno más", text: "El asistente actúa como tú: ve y cambia solo lo que tu rol te permite en cada empresa." },
      { icon: "History", title: "Todo queda auditado", text: "Cada acción queda registrada con tu usuario y el canal «agente», separada de lo que haces en la web o en la app." },
      { icon: "ShieldAlert", title: "Protegido frente a textos maliciosos", text: "Lo que escriben terceros (correos, mensajes, notas) llega al asistente marcado como no confiable, para que no pueda darle órdenes." },
    ] as Feature[],
  },
  connect: {
    eyebrow: "Conectar en dos minutos",
    title: "Tu IA, conectada a tu cuenta",
    steps: [
      { title: "Crea una clave MCP personal", text: "En FactuIO, menú de usuario → Seguridad y claves MCP. Elige caducidad y si es de solo lectura." },
      { title: "Copia la configuración", text: "FactuIO te da el fragmento ya rellenado para Claude Code y Claude Desktop." },
      { title: "Pregunta", text: "«¿Cuánto he facturado este trimestre?». Tu asistente ya ve tus datos." },
    ],
    snippetTitle: "Claude Code",
    snippet: 'claude mcp add --transport http factuio <URL de tu cuenta>/mcp \\\n  --header "X-API-Key: pat_…"',
    docsLink: { label: "Guía completa de conexión →", href: "/docs/mcp/" },
  },
  cta: {
    title: "Factura hablando con tu IA",
    text: "Apúntate a la lista de espera y prueba MAIAA y el conector MCP entre los primeros.",
    label: "Apuntarme",
  },
} as const;
