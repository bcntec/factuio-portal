/**
 * Páginas de alta para socios y comunidades: factuio.app/<slug>.
 * Cada una muestra el logo del socio junto al de FactuIO y guarda el slug como ORIGEN en Brevo.
 * No se indexan ni van al sitemap: se reparten por enlace.
 */
export interface Partner {
  slug: string;
  name: string;
  /** Ruta en /public. Sin logo se muestra el nombre del socio como texto. */
  logo?: { src: string; width: number; height: number };
  title: string;
  text: string;
}

export const partners: readonly Partner[] = [
  {
    slug: "loft15",
    name: "Loft15",
    title: "FactuIO para la comunidad de Loft15",
    text: "Si eres de Loft15, apúntate a la lista de espera y te daremos acceso entre los primeros.",
  },
];

export function partnerBySlug(slug: string): Partner | undefined {
  return partners.find((p) => p.slug === slug);
}
