import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function req(body: unknown, ip = "1.1.1.1") {
  return new Request("http://localhost/api/waitlist/", {
    method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(body),
  });
}
const valid = { email: "ana@empresa.es", profile: "autonomo", consent: true };

describe("POST /api/waitlist", () => {
  beforeEach(() => { vi.resetModules(); vi.spyOn(console, "error").mockImplementation(() => {}); });
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it("returns 503 when Brevo is not configured", async () => {
    vi.stubEnv("BREVO_API_KEY", "");
    const { POST } = await import("./route");
    expect((await POST(req(valid))).status).toBe(503);
  });

  it("returns 400 with the validation error", async () => {
    const { POST } = await import("./route");
    const res = await POST(req({ ...valid, consent: false }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "consent_required" });
  });

  it("calls Brevo and returns ok", async () => {
    vi.stubEnv("BREVO_API_KEY", "k"); vi.stubEnv("BREVO_WAITLIST_LIST_ID", "3"); vi.stubEnv("BREVO_DOI_TEMPLATE_ID", "4");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("answers ok to the honeypot without calling Brevo", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");
    expect((await POST(req({ ...valid, website: "spam" }))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rate-limits the same IP after 5 requests", async () => {
    const { POST } = await import("./route");
    for (let i = 0; i < 5; i++) await POST(req({}, "9.9.9.9"));
    expect((await POST(req({}, "9.9.9.9"))).status).toBe(429);
  });
});
