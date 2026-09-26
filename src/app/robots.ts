import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

// Every agent already gets "allow /" via the wildcard rule below. These entries add nothing
// functionally — they exist so a future, stricter wildcard rule doesn't accidentally cut off the
// AI answer-engine crawlers this site wants to be readable by (a real GEO regression risk).
const aiCrawlers = ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "Google-Extended", "PerplexityBot", "PerplexityBot-User", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
