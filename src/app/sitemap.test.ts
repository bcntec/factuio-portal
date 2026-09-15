import sitemap from "./sitemap";
import { siteRoutes, siteUrl } from "@/content/site";

describe("sitemap", () => {
  it("lists every public route with absolute urls", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual(siteRoutes.map((r) => `${siteUrl}${r}`));
  });
});
