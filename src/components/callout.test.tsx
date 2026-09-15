import { render, screen } from "@testing-library/react";
import { Callout } from "./callout";

describe("Callout", () => {
  it("renders title and children with role note", () => {
    render(<Callout kind="warning" title="Ojo">Texto</Callout>);
    const note = screen.getByRole("note");
    expect(note).toHaveTextContent("Ojo");
    expect(note).toHaveTextContent("Texto");
    expect(note.className).toContain("bg-peach");
  });
});
