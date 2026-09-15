import { render, screen, within } from "@testing-library/react";
import { CompareTable } from "./compare-table";

describe("CompareTable", () => {
  it("renders check, dash and text values", () => {
    render(<CompareTable />);
    const row = screen.getByRole("row", { name: /Firma delegada/ });
    const cells = within(row).getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("—");
    expect(cells[1]).toHaveTextContent("—");
    expect(within(cells[2]).getByLabelText("Incluido")).toBeInTheDocument();
    expect(within(screen.getByRole("row", { name: /Usuarios/ })).getAllByRole("cell")[2]).toHaveTextContent("Ilimitados");
  });
});
