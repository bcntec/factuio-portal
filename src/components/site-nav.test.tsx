import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { site } from "@/content/site";

vi.mock("next/navigation", () => ({ usePathname: () => "/integraciones/" }));
vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.test");
vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");

import { SiteNav } from "./site-nav";

describe("SiteNav", () => {
  it("marks the current route as active", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Integraciones" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Gestorías" })).not.toHaveAttribute("aria-current");
  });

  it("sends CTAs to the waitlist while the app is soon", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "");
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Empieza gratis" })).toHaveAttribute("href", "/lista-espera/");
    expect(screen.getByRole("link", { name: "Entrar" })).toHaveAttribute("href", "/lista-espera/");
  });

  it("links CTAs to the app when the app is live", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "app");
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Empieza gratis" })).toHaveAttribute("href", "https://app.test/register");
    expect(screen.getByRole("link", { name: "Entrar" })).toHaveAttribute("href", "https://app.test/login");
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "");
  });

  it("shows soon sections as non-links with a badge", () => {
    vi.stubEnv("NEXT_PUBLIC_FEATURES_LIVE", "");
    render(<SiteNav />);
    for (const name of ["Precios", "Historias", "Docs"]) {
      expect(screen.queryByRole("link", { name })).toBeNull();
      expect(screen.getAllByText(name)[0].closest("[aria-disabled]")).not.toBeNull();
    }
  });

  it("opens the mobile panel on click and closes it when a link inside is clicked", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    const summary = screen.getByLabelText(site.mobileMenuLabel);
    await user.click(summary);
    expect(summary).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText(site.mobileMenuCloseLabel)).toBe(summary);

    const panelLinks = screen.getAllByRole("link", { name: "Gestorías" });
    await user.click(panelLinks[panelLinks.length - 1]);

    expect(summary).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByRole("link", { name: "Gestorías" })).toHaveLength(1);
  });
});
