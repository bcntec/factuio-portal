import { render, screen } from "@testing-library/react";
import { DeclarationView } from "./declaration-view";
import { currentDeclaration, declarationBundle, declarationTextHref, type Declaration, type DeclarationBundle } from "@/content/declaracion-responsable";

// Fictitious fixture shaped like the release script's output.
const d = (version: string): Declaration => ({
  version,
  issued_on: "2026-10-24",
  title: "DECLARACIÓN RESPONSABLE DEL SISTEMA INFORMÁTICO DE FACTURACIÓN",
  sections: [
    { key: "1.a", label: "Nombre del sistema informático a que se refiere esta declaración responsable:", value: "Sistema de prueba" },
    { key: "1.c", label: "Identificador completo de la versión concreta del sistema informático a que se refiere esta declaración responsable:", value: version },
    { key: "1.k", label: "La entidad productora … cumple con lo dispuesto en el artículo 29.2.j) de la Ley 58/2003 …", value: null },
    { key: "1.l", label: null, value: null, items: [{ label: "Fecha en que la entidad productora de este sistema informático suscribe esta declaración responsable del mismo:", value: "24 de octubre de 2026." }] },
  ],
  annex: [],
  text: "DECLARACIÓN RESPONSABLE DEL SISTEMA INFORMÁTICO DE FACTURACIÓN\n",
  text_file: `declaracion-responsable-${version}.txt`,
});

describe("DeclarationView", () => {
  it("renders the issued declaration verbatim, in Spanish", () => {
    render(<DeclarationView declaration={d("1.0.0")} />);
    expect(screen.getByRole("heading", { name: "DECLARACIÓN RESPONSABLE DEL SISTEMA INFORMÁTICO DE FACTURACIÓN" })).toBeInTheDocument();
    expect(screen.getByText(/^1\.c\) Identificador completo de la versión/)).toBeInTheDocument();
    expect(screen.getByText("1.0.0")).toBeInTheDocument();
    expect(screen.getByText(/artículo 29\.2\.j\)/)).toBeInTheDocument();
    expect(screen.getByText("24 de octubre de 2026.")).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveAttribute("lang", "es");
    expect(screen.queryByText("ANEXO")).not.toBeInTheDocument();
  });
});

describe("declaration bundle helpers", () => {
  it("picks the current version out of the archive", () => {
    const bundle: DeclarationBundle = { schema_version: 1, current: "1.1.0", versions: [d("1.1.0"), d("1.0.0")] };
    expect(currentDeclaration(bundle)?.version).toBe("1.1.0");
    expect(currentDeclaration({ schema_version: 1, current: null, versions: [] })).toBeNull();
  });

  it("links the plain-text copy under public/declaracion-responsable", () => {
    expect(declarationTextHref(d("1.0.0"))).toMatch(/\/declaracion-responsable\/declaracion-responsable-1\.0\.0\.txt$/);
  });

  it("the committed bundle is consistent (current is archived, or nothing issued yet)", () => {
    if (declarationBundle.current === null) expect(currentDeclaration()).toBeNull();
    else expect(currentDeclaration()?.version).toBe(declarationBundle.current);
  });
});
