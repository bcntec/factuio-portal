import { expect, test } from "@playwright/test";

// Con NEXT_PUBLIC_FEATURES_LIVE vacío (por defecto) la app y los precios están en «Próximamente».
test("nav CTAs point to the waitlist while the app is soon", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Empieza gratis" }).first()).toHaveAttribute("href", "/lista-espera/");
  await expect(page.getByRole("link", { name: "Entrar" }).first()).toHaveAttribute("href", "/lista-espera/");
});

test("pricing shows the coming-soon page", async ({ page }) => {
  await page.goto("/precios/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Precios, muy pronto");
});

test("waitlist form validates on the server", async ({ page }) => {
  await page.goto("/lista-espera/");
  await page.getByLabel("Correo electrónico").fill("ana@empresa.es");
  await page.getByRole("combobox", { name: "¿Cómo vas a usar FactuIO?" }).click();
  await page.getByRole("option", { name: "Tengo una pyme" }).click();
  await page.getByRole("button", { name: "Apuntarme" }).click();
  await expect(page.getByText("Necesitamos que aceptes la política de privacidad.")).toBeVisible();
});
