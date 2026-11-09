import { afterEach, vi } from "vitest";
import sitemap from "./sitemap";
import { siteRoutes, siteUrl } from "@/content/site";

describe("sitemap", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("lists every live route with absolute urls", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "precios,historias,docs");
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual(siteRoutes.map((r) => `${siteUrl}${r}`));
  });

  it("leaves soon sections out", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "");
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => /\/(precios|historias|docs)\//.test(u))).toBe(false);
    expect(urls).toContain(`${siteUrl}/lista-espera/`);
  });
});
