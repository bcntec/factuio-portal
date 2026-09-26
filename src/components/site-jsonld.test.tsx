import { render } from "@testing-library/react";
import { site, siteUrl } from "@/content/site";
import { SiteJsonLd } from "./site-jsonld";

describe("SiteJsonLd", () => {
  it("emits an Organization and a WebSite node sharing the site URL", () => {
    const { container } = render(<SiteJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent!);
    const org = data["@graph"].find((n: { "@type": string }) => n["@type"] === "Organization");
    const website = data["@graph"].find((n: { "@type": string }) => n["@type"] === "WebSite");
    expect(org).toMatchObject({ name: site.name, url: siteUrl });
    expect(website).toMatchObject({ name: site.name, url: siteUrl, inLanguage: "es" });
  });
});
