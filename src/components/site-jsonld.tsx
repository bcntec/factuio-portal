import { site, siteUrl } from "@/content/site";

/** Site-wide Organization + WebSite structured data, rendered once in the root layout. */
export function SiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: siteUrl,
        description: site.meta.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: site.name,
        url: siteUrl,
        inLanguage: "es",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}
