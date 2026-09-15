import { render, screen } from "@testing-library/react";
import { Timeline } from "./timeline";

const milestones = [
  { date: "3 dic 2025", title: "Real Decreto-ley 15/2025", text: "Segundo aplazamiento publicado en el BOE. Automático, sin trámite." },
  { date: "1 ene 2027", title: "Sociedades", text: "Obligatorio para contribuyentes del Impuesto sobre Sociedades." },
  { date: "1 jul 2027", title: "Autónomos y resto", text: "Obligatorio para autónomos, profesionales y demás obligados." },
] as const;

describe("Timeline", () => {
  it("renders one item per milestone", () => {
    render(<Timeline milestones={milestones} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(milestones.length);
  });

  it("renders the dates in order", () => {
    render(<Timeline milestones={milestones} />);
    const items = screen.getAllByRole("listitem");
    milestones.forEach((m, i) => {
      expect(items[i]).toHaveTextContent(m.date);
      expect(items[i]).toHaveTextContent(m.title);
      expect(items[i]).toHaveTextContent(m.text);
    });
  });
});
