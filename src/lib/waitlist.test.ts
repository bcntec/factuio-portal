import { describe, expect, it, vi } from "vitest";
import { BREVO_DOI_URL, createRateLimiter, normalizeSource, parseWaitlist, readBrevoConfig, requestDoubleOptIn } from "./waitlist";

const valid = { email: " Ana@Empresa.ES ", profile: "pyme", consent: true };

describe("parseWaitlist", () => {
  it("accepts a valid request and normalises the email", () => {
    expect(parseWaitlist(valid)).toEqual({ ok: true, value: { email: "ana@empresa.es", profile: "pyme", source: "web" } });
    expect(parseWaitlist({ ...valid, source: "Loft15" })).toEqual({ ok: true, value: { email: "ana@empresa.es", profile: "pyme", source: "loft15" } });
  });
  it("rejects a bad email, an unknown profile and a missing consent", () => {
    expect(parseWaitlist({ ...valid, email: "ana@" })).toEqual({ ok: false, error: "invalid_email" });
    expect(parseWaitlist({ ...valid, profile: "empresa" })).toEqual({ ok: false, error: "invalid_profile" });
    expect(parseWaitlist({ ...valid, consent: "true" })).toEqual({ ok: false, error: "consent_required" });
    expect(parseWaitlist(null)).toEqual({ ok: false, error: "bad_request" });
  });
  it("flags the honeypot as spam without validating the rest", () => {
    expect(parseWaitlist({ website: "http://x" })).toEqual({ ok: true, spam: true });
  });
});

describe("readBrevoConfig", () => {
  const env = { BREVO_API_KEY: "k", BREVO_WAITLIST_LIST_ID: "7", BREVO_DOI_TEMPLATE_ID: "12" };
  it("builds the config with the confirmation page as redirect", () => {
    expect(readBrevoConfig(env, "https://factuio.app/")).toEqual({
      apiKey: "k", listId: 7, templateId: 12, redirectionUrl: "https://factuio.app/lista-espera/confirmada/",
    });
  });
  it("returns null when any value is missing or not a positive integer", () => {
    expect(readBrevoConfig({ ...env, BREVO_API_KEY: "" }, "https://x")).toBeNull();
    expect(readBrevoConfig({ ...env, BREVO_WAITLIST_LIST_ID: "abc" }, "https://x")).toBeNull();
    expect(readBrevoConfig({ ...env, BREVO_DOI_TEMPLATE_ID: undefined }, "https://x")).toBeNull();
  });
});

describe("normalizeSource", () => {
  it("keeps short slugs in lowercase and falls back to web for anything else", () => {
    expect(normalizeSource(" Loft15 ")).toBe("loft15");
    expect(normalizeSource("feria_2026-bcn")).toBe("feria_2026-bcn");
    expect(normalizeSource(undefined)).toBe("web");
    expect(normalizeSource("")).toBe("web");
    expect(normalizeSource("<script>")).toBe("web");
    expect(normalizeSource("a".repeat(41))).toBe("web");
  });
});

describe("requestDoubleOptIn", () => {
  const cfg = { apiKey: "secret", listId: 7, templateId: 12, redirectionUrl: "https://factuio.app/lista-espera/confirmada/" };
  it("posts the contact, list, template, redirect and profile attribute to Brevo", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    await expect(requestDoubleOptIn({ email: "ana@empresa.es", profile: "gestoria", source: "loft15" }, cfg, fetchImpl)).resolves.toBe(true);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(BREVO_DOI_URL);
    expect(init.headers["api-key"]).toBe("secret");
    expect(JSON.parse(init.body)).toEqual({
      email: "ana@empresa.es", attributes: { PERFIL: "Gestoría", ORIGEN: "loft15" }, includeListIds: [7], templateId: 12,
      redirectionUrl: "https://factuio.app/lista-espera/confirmada/",
    });
  });
  it("returns false and logs only the status when Brevo fails", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ code: "unauthorized" }), { status: 401 }));
    await expect(requestDoubleOptIn({ email: "ana@empresa.es", profile: "pyme", source: "web" }, cfg, fetchImpl)).resolves.toBe(false);
    expect(err.mock.calls[0][0]).toContain("HTTP 401 unauthorized");
    expect(err.mock.calls[0][0]).not.toContain("secret");
    expect(err.mock.calls[0][0]).not.toContain("ana@");
    err.mockRestore();
  });
});

describe("createRateLimiter", () => {
  it("allows max hits per window and resets after it", () => {
    let t = 0;
    const allow = createRateLimiter(2, 1000, () => t);
    expect([allow("ip"), allow("ip"), allow("ip")]).toEqual([true, true, false]);
    expect(allow("other")).toBe(true);
    t = 1001;
    expect(allow("ip")).toBe(true);
  });
});
