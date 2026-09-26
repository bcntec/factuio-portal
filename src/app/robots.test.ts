import robots from "./robots";
import { siteUrl } from "@/content/site";

describe("robots", () => {
  it("allows everything by default and points at the sitemap", () => {
    const { rules, sitemap } = robots();
    const rulesArr = Array.isArray(rules) ? rules : [rules];
    const wildcard = rulesArr.find((r) => r.userAgent === "*");
    expect(wildcard?.allow).toBe("/");
    expect(sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });

  it("explicitly welcomes the major AI answer-engine crawlers", () => {
    const { rules } = robots();
    const rulesArr = Array.isArray(rules) ? rules : [rules];
    const agents = rulesArr.map((r) => r.userAgent);
    for (const bot of ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "Google-Extended", "PerplexityBot"]) {
      expect(agents).toContain(bot);
    }
  });
});
