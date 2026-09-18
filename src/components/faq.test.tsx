import { render, screen } from "@testing-library/react";
import { Faq } from "./faq";

describe("Faq", () => {
  it("renders only items with the given tag", () => {
    render(<Faq tag="gestoria" />);
    expect(screen.getByText("Soy una gestoría, ¿cómo añado a mis clientes?")).toBeInTheDocument();
    expect(screen.queryByText("¿Puedo cambiar de plan o cancelar cuando quiera?")).not.toBeInTheDocument();
  });

  it("uses native details/summary so it works without JS", () => {
    const { container } = render(<Faq tag="gestoria" />);
    expect(container.querySelectorAll("details").length).toBe(3);
  });
});
