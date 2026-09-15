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
});
