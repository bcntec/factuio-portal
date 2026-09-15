import { afterEach, describe, expect, it, vi } from "vitest";

describe("links", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("appUrl joins app url and path without double slash", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.example.com/");
    const { appUrl } = await import("./links");
    expect(appUrl("/register")).toBe("https://app.example.com/register");
  });

  it("appUrl throws when NEXT_PUBLIC_APP_URL is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    const { appUrl } = await import("./links");
    expect(() => appUrl("/login")).toThrow("NEXT_PUBLIC_APP_URL is not set");
  });

  it("withBasePath prefixes NEXT_PUBLIC_BASE_PATH", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/factuio-portal");
    const { withBasePath } = await import("./links");
    expect(withBasePath("/og.png")).toBe("/factuio-portal/og.png");
  });

  it("withBasePath is identity when base path is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
    const { withBasePath } = await import("./links");
    expect(withBasePath("/og.png")).toBe("/og.png");
  });
});
