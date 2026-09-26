import { render } from "@testing-library/react";
import { site, siteUrl } from "@/content/site";
import { ProductJsonLd } from "./product-jsonld";

describe("ProductJsonLd", () => {
  it("emits a SoftwareApplication node without asserting a price", () => {
    const { container } = render(<ProductJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent!);
    expect(data).toMatchObject({
      "@type": "SoftwareApplication",
      name: site.name,
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    });
    // Pricing in content/pricing.ts is explicitly a placeholder pending a business decision —
    // it must never be asserted as structured, machine-citable fact.
    expect(data.offers).toBeUndefined();
  });
});
