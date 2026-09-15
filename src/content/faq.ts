export type FaqTag = "home" | "pricing" | "gestoria";
export interface FaqItem { q: string; a: string; tags: FaqTag[] }

export const faq: FaqItem[] = [
  { q: "¿Qué es VERI*FACTU y por qué lo necesito?", tags: ["home", "pricing"],
    a: "Es el sistema de la AEAT que obliga a que tus facturas se registren de forma verificable. Con FactuIO cada factura sale ya firmada, encadenada y con su QR, sin que tengas que hacer nada." },
  { q: "¿Puedo cambiar de plan o cancelar cuando quiera?", tags: ["pricing"],
    a: "Sí. No hay permanencia: subes o bajas de plan desde tu cuenta y el cambio se aplica al siguiente ciclo. Si cancelas, conservas acceso de solo lectura a tus documentos." },
  { q: "¿Necesito certificado digital?", tags: ["home", "pricing"],
    a: "No. Puedes delegar la firma en FactuIO y emitir desde el primer día. Si tu gestoría firma por ti, también lo soportamos." },
  { q: "¿Qué pasa cuando termina la prueba gratuita?", tags: ["home", "pricing"],
    a: "Te avisamos antes de que acabe. Si no eliges plan, tu cuenta pasa a solo lectura: no perderás ninguna factura ni ningún dato." },
  { q: "Soy una gestoría, ¿cómo añado a mis clientes?", tags: ["pricing", "gestoria"],
    a: "Cada cliente es una empresa dentro de tu cuenta, con sus usuarios y permisos. Tú ves todo el porfolio; ellos, solo lo suyo. La firma delegada te permite emitir en su nombre con su autorización AEAT." },
  { q: "¿Puedo pasar las facturas y gastos a mi programa de contabilidad?", tags: ["gestoria"],
    a: "Sí. FactuIO exporta el enlace contable de A3 (SUENLACE.DAT) para ventas y compras desde la propia ficha de la empresa." },
  { q: "¿Funciona en el País Vasco (TicketBAI)?", tags: ["home"],
    a: "Sí. FactuIO genera y encadena los ficheros TicketBAI para Bizkaia, Gipuzkoa y Araba con el mismo flujo que VERI*FACTU." },
];
