import { expect, test } from "@playwright/test";

const basePath = process.env.PW_BASE_PATH;

test("internal links on /docs/ are basePath-aware", async ({ page }) => {
  test.skip(!basePath, "PW_BASE_PATH is unset; nothing to assert");
  await page.goto("docs/");
  const hrefs = await page.locator("a[href^='/']").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
  for (const href of hrefs) {
    expect(href.startsWith(basePath!), href).toBe(true);
  }
});
