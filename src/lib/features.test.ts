import { afterEach, describe, expect, it, vi } from "vitest";
import { featureForHref, featureState, isSoonHref } from "./features";
import { loginHref, signupHref } from "./links";

describe("features", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("defaults every feature to soon", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "");
    expect(featureState("precios")).toBe("soon");
    expect(featureState("app")).toBe("soon");
  });

  it("turns on the listed features, ignoring case and spaces", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", " Precios , docs");
    expect(featureState("precios")).toBe("live");
    expect(featureState("docs")).toBe("live");
    expect(featureState("historias")).toBe("soon");
  });

  it("maps routes to their section", () => {
    expect(featureForHref("/docs/api/")).toBe("docs");
    expect(featureForHref("/precios/#planes")).toBe("precios");
    expect(featureForHref("/preciosx/")).toBeNull();
    expect(featureForHref("/gestorias/")).toBeNull();
  });

  it("flags soon hrefs", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "docs");
    expect(isSoonHref("/historias/")).toBe(true);
    expect(isSoonHref("/docs/api/")).toBe(false);
  });

  it("CTAs go to the waitlist (with base path) while the app is soon", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "");
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/factuio-portal");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.test");
    expect(signupHref("/register?plan=pro")).toBe("/factuio-portal/lista-espera/");
    expect(loginHref()).toBe("/factuio-portal/lista-espera/");
  });

  it("CTAs go to the app when it is live", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "app");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.test");
    expect(signupHref("/register?plan=pro")).toBe("https://app.test/register?plan=pro");
    expect(loginHref()).toBe("https://app.test/login");
  });
});
