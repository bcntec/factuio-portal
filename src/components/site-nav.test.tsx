import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { site } from "@/content/site";

vi.mock("next/navigation", () => ({ usePathname: () => "/precios/" }));
vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.test");

import { SiteNav } from "./site-nav";

describe("SiteNav", () => {
  it("marks the current route as active", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Precios" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Gestorías" })).not.toHaveAttribute("aria-current");
  });

  it("links CTAs to the app", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Empieza gratis" })).toHaveAttribute("href", "https://app.test/register");
    expect(screen.getByRole("link", { name: "Entrar" })).toHaveAttribute("href", "https://app.test/login");
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
