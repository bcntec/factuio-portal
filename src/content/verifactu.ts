import type { Feature, Step } from "@/content/home";

export const verifactu = {
  meta: {
    title: "VERI*FACTU",
    description: "Qué es VERI*FACTU, quién está obligado y desde cuándo, qué exige la AEAT y cómo lo resuelve FactuIO.",
  },
  hero: {
    eyebrow: "VERI*FACTU · AEAT",
    title: "VERI*FACTU explicado sin letra pequeña",
    sub: "Qué es, a quién obliga, desde cuándo y qué tiene que hacer tu programa de facturación. Y cómo lo hace FactuIO por ti.",
    chips: [
      { tone: "peach", text: "Sociedades: 1 de enero de 2027" },
      { tone: "sky", text: "Autónomos: 1 de julio de 2027" },
      { tone: "mint", text: "FactuIO ya cumple" },
    ] as { tone: "mint" | "peach" | "sky" | "pink"; text: string }[],
  },
  what: {
    eyebrow: "Qué es",
    title: "Un registro verificable por cada factura",
    paragraphs: [
      "VERI*FACTU es el sistema de facturación verificable de la AEAT, creado por el Real Decreto 1007/2023 y desarrollado por la Orden HAC/1177/2024, dentro de las obligaciones de la Ley 11/2021 de medidas de prevención y lucha contra el fraude fiscal (art. 29.2.j de la Ley General Tributaria).",
      "Cada factura genera un registro de facturación con una huella (hash) encadenada al registro anterior, de forma que ninguna factura puede alterarse o eliminarse sin dejar rastro.",
      "Hay dos modalidades: enviar cada registro a la AEAT en el momento de facturar (VERI*FACTU) o conservarlo íntegro y disponible en tu propio sistema para que la AEAT pueda solicitarlo (no VERI*FACTU).",
    ] as string[],
  },
  who: {
    eyebrow: "Quién y cuándo",
    title: "Calendario tras el Real Decreto-ley 15/2025",
    intro: "El calendario se ha aplazado más de una vez. Esta es la fecha vigente tras el Real Decreto-ley 15/2025, publicado en el BOE el 3 de diciembre de 2025.",
    milestones: [
      { date: "3 dic 2025", title: "Real Decreto-ley 15/2025", text: "Segundo aplazamiento publicado en el BOE. Automático, sin trámite." },
      { date: "1 ene 2027", title: "Sociedades", text: "Obligatorio para contribuyentes del Impuesto sobre Sociedades." },
      { date: "1 jul 2027", title: "Autónomos y resto", text: "Obligatorio para autónomos, profesionales y demás obligados." },
    ],
    exceptions: [
      "Quien ya está en el SII no está obligado a VERI*FACTU.",
      "En Bizkaia, Gipuzkoa y Araba aplica TicketBAI; Navarra tiene su propio régimen.",
    ] as string[],
  },
  requirements: {
    eyebrow: "Qué exige",
    title: "Lo que tiene que hacer tu software",
    items: [
      { icon: "ScrollText", title: "Registro por cada factura y anulación", text: "Se genera un registro de facturación en el alta de cada factura y también en cada anulación." },
      { icon: "Link2", title: "Huella SHA-256 encadenada", text: "Cada registro incluye una huella que enlaza con el registro anterior, para que no se pueda alterar sin dejar rastro." },
      { icon: "QrCode", title: "QR con URL de verificación de la AEAT", text: "La factura lleva un código QR con la URL de verificación de la AEAT y la leyenda VERI*FACTU." },
      { icon: "Send", title: "Envío inmediato a la AEAT", text: "En la modalidad VERI*FACTU, los registros se remiten a la AEAT en el momento de facturar." },
      { icon: "ShieldCheck", title: "Registro de eventos e inalterabilidad", text: "El sistema guarda un registro de eventos y garantiza integridad, conservación, accesibilidad, legibilidad y trazabilidad." },
      { icon: "FileText", title: "Declaración responsable del fabricante", text: "El proveedor del software firma una declaración responsable de que cumple el reglamento." },
    ] as Feature[],
  },
  how: {
    eyebrow: "Cómo lo hace FactuIO",
    title: "Tú facturas, FactuIO cumple",
    steps: [
      { title: "Emites la factura", text: "Facturas desde FactuIO como siempre, sin cambiar tu forma de trabajar." },
      { title: "FactuIO la sella", text: "Genera la huella SHA-256 encadenada, el QR de verificación y el PDF firmado." },
      { title: "Se remite a la AEAT", text: "El registro se envía a la AEAT, o a la hacienda foral correspondiente, de forma automática." },
    ] as Step[],
    checklist: [
      "Huella SHA-256 validada con el vector de pruebas oficial de la AEAT",
      "QR según la especificación de la AEAT (35 mm, nivel de corrección M), sellado en el PDF",
      "Servicio web con la AEAT: alta, subsanación y anulación",
      "Reloj sincronizado por NTP con hora.roa.es",
      "Cascada de certificados empresa → tenant → plataforma; firma delegada desde el primer día",
      "Registro de actividad completo con reintentos automáticos",
    ] as string[],
  },
  penalties: {
    eyebrow: "Sanciones",
    title: "Qué pasa si no cumples",
    text: "El artículo 201 bis de la Ley General Tributaria tipifica como infracción tributaria fabricar, producir, comercializar o usar programas informáticos que no cumplan el reglamento, o que permitan llevar contabilidades distintas, alterar registros ya enviados o no dejar rastro de las alteraciones.",
    figures: [
      { amount: "50.000 €", label: "por ejercicio, para quien use software no conforme" },
      { amount: "150.000 €", label: "por ejercicio y tipo de software, para quien lo fabrique o venda" },
    ] as { amount: string; label: string }[],
    note: "Artículo 201 bis de la Ley General Tributaria.",
  },
  ticketbai: {
    eyebrow: "País Vasco",
    title: "¿Y TicketBAI?",
    text: "En Bizkaia, Gipuzkoa y Araba no se aplica VERI*FACTU sino TicketBAI, el sistema equivalente de las haciendas forales. FactuIO genera y encadena los ficheros TicketBAI con el mismo flujo que usa para VERI*FACTU.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas sobre VERI*FACTU",
  },
  cta: {
    title: "Cumple VERI*FACTU desde la primera factura",
    text: "Prueba FactuIO 30 días gratis. Sin certificado, sin tarjeta y sin permanencia.",
    label: "Empezar gratis",
  },
} as const;
