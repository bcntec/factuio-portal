import { expect, test } from "@playwright/test";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.test";

test("nav CTAs point to the app", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Empieza gratis" }).first()).toHaveAttribute("href", `${APP}/register`);
  await expect(page.getByRole("link", { name: "Entrar" }).first()).toHaveAttribute("href", `${APP}/login`);
});

test("pricing toggle switches to annual prices", async ({ page }) => {
  await page.goto("/precios/");
  await expect(page.getByTestId("price-pro")).toHaveText("19");
  await page.getByRole("button", { name: "Anual" }).click();
  await expect(page.getByTestId("price-pro")).toHaveText("15,80");
});
