import { render, screen } from "@testing-library/react";
import { FeatureGrid } from "./feature-grid";
import { home } from "@/content/home";

describe("FeatureGrid", () => {
  it("renders one card per feature with title and text", () => {
    render(<FeatureGrid features={home.features} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(home.features.length);
    expect(screen.getByText("Gastos con escaneo de tickets")).toBeInTheDocument();
  });
});
