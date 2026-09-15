import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.test");
import { PricingCards } from "./pricing-cards";

describe("PricingCards", () => {
  it("shows monthly prices by default and annual after toggling", async () => {
    render(<PricingCards />);
    expect(screen.getByTestId("price-pro")).toHaveTextContent("19");
    expect(screen.getAllByText("facturado mes a mes")).toHaveLength(3);
    await userEvent.click(screen.getByRole("button", { name: "Anual" }));
    expect(screen.getByTestId("price-pro")).toHaveTextContent("15,80");
    expect(screen.getAllByText("facturado anualmente · 2 meses gratis")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Anual" })).toHaveAttribute("aria-pressed", "true");
  });

  it("links plan CTAs to app registration with the plan id", () => {
    render(<PricingCards />);
    expect(screen.getByRole("link", { name: "Contratar Pro" })).toHaveAttribute("href", "https://app.test/register?plan=pro");
  });

  it("compact mode hides feature lists and toggle", () => {
    render(<PricingCards compact />);
    expect(screen.queryByRole("button", { name: "Anual" })).not.toBeInTheDocument();
    expect(screen.queryByText("Facturas recurrentes y remesas SEPA")).not.toBeInTheDocument();
  });
});
