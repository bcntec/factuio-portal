import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

for (const route of ["/", "/precios/", "/gestorias/", "/integraciones/"]) {
  test(`${route} has no horizontal scroll at 390px`, async ({ page }) => {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
