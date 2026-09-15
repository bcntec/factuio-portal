import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

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
});
