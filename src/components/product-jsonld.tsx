import { site, siteUrl } from "@/content/site";

/**
 * SoftwareApplication structured data for the home page.
 *
 * Deliberately carries no `offers`/price: the figures in content/pricing.ts are an explicit
 * placeholder pending a business decision, and structured price data is read by search and AI
 * engines as a stable, citable fact — the opposite of what a placeholder should assert.
 */
export function ProductJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    url: siteUrl,
    description: site.meta.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Facturación electrónica",
    operatingSystem: "Web",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}
