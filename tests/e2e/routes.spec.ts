import { expect, test } from "@playwright/test";

const routes = ["/", "/precios/", "/gestorias/", "/integraciones/", "/verifactu/", "/historias/", "/docs/", "/docs/rol-tenant/", "/docs/rol-signer/", "/docs/api/", "/legal/privacidad/", "/legal/terminos/", "/legal/cookies/"];

for (const route of routes) {
  test(`${route} responds and has a single h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("docs sidebar links resolve", async ({ page }) => {
  await page.goto("/docs/");
  const hrefs = await page.locator("nav[aria-label='Documentación'] a").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
  for (const href of hrefs) {
    const res = await page.goto(href);
    expect(res?.status(), href).toBe(200);
  }
});

test("unknown route renders the 404 page", async ({ page }) => {
  await page.goto("/no-existe/");
  await expect(page.getByRole("heading", { name: "Esta página no existe" })).toBeVisible();
});

test("llms.txt is served for AI answer engines", async ({ request, baseURL }) => {
  const res = await request.get(`${baseURL}/llms.txt`);
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain("# FactuIO");
});
