import { NextResponse } from "next/server";
import { siteUrl } from "@/content/site";
import { createRateLimiter, parseWaitlist, readBrevoConfig, requestDoubleOptIn } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

const allow = createRateLimiter(5, 10 * 60_000);

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  if (!allow(clientIp(req))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }
  const parsed = parseWaitlist(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  if ("spam" in parsed) return NextResponse.json({ ok: true });
  const cfg = readBrevoConfig(process.env, siteUrl);
  if (!cfg) {
    console.error("[waitlist] Brevo is not configured (BREVO_API_KEY, BREVO_WAITLIST_LIST_ID, BREVO_DOI_TEMPLATE_ID)");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
  try {
    const ok = await requestDoubleOptIn(parsed.value, cfg);
    return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "upstream" }, { status: 502 });
  } catch (e) {
    console.error(`[waitlist] Brevo DOI error: ${(e as Error).name}`);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
