import { expect, test } from "@playwright/test";

test("nav CTAs point to the app", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Empieza gratis" }).first()).toHaveAttribute("href", "https://app.test/register");
  await expect(page.getByRole("link", { name: "Entrar" }).first()).toHaveAttribute("href", "https://app.test/login");
});

test("pricing toggle switches to annual prices", async ({ page }) => {
  await page.goto("/precios/");
  await expect(page.getByTestId("price-pro")).toHaveText("19");
  await page.getByRole("button", { name: "Anual" }).click();
  await expect(page.getByTestId("price-pro")).toHaveText("15,80");
});
