import { render, screen } from "@testing-library/react";
import { IntegrationCard, IntegrationStatusPill } from "./integration-card";
import { integraciones, integrationStatusLabels } from "@/content/integraciones";

describe("IntegrationCard", () => {
  it("renders name, vendor, text and the status label", () => {
    const item = integraciones.categories[0].items[0];
    render(<IntegrationCard item={item} />);
    expect(screen.getByRole("heading", { level: 3, name: item.name })).toBeInTheDocument();
    expect(screen.getByText(item.vendor)).toBeInTheDocument();
    expect(screen.getByText(item.text)).toBeInTheDocument();
    expect(screen.getByText(integrationStatusLabels[item.status])).toBeInTheDocument();
  });

  it("maps every status to its Spanish label", () => {
    render(<><IntegrationStatusPill status="available" /><IntegrationStatusPill status="beta" /><IntegrationStatusPill status="soon" /><IntegrationStatusPill status="roadmap" /></>);
    expect(screen.getByText("Disponible")).toBeInTheDocument();
    expect(screen.getByText("En beta")).toBeInTheDocument();
    expect(screen.getByText("Próximamente")).toBeInTheDocument();
    expect(screen.getByText("En roadmap")).toBeInTheDocument();
  });
});
