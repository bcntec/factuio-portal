import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { historias, type Story } from "@/content/historias";
import { integrationStatusLabels } from "@/content/integraciones";

vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.test");

import { StoryCard } from "./story-card";

const marta = historias.stories.find((s) => s.id === "autonoma")!;
const shopify = historias.stories.find((s) => s.id === "tienda-online")!;
const jordi = historias.stories.find((s) => s.id === "cliente-gestoria")!;

describe("StoryCard", () => {
  it("renders profile, title, situation, one item per solution bullet and one pill per module", () => {
    render(<StoryCard story={marta} />);
    expect(screen.getByText(marta.profile)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: marta.title })).toBeInTheDocument();
    expect(screen.getByText(marta.situation)).toBeInTheDocument();
    const solution = screen.getByRole("list", { name: historias.labels.solution });
    expect(within(solution).getAllByRole("listitem")).toHaveLength(marta.solution.length);
    const modules = screen.getByRole("list", { name: historias.labels.modules });
    expect(within(modules).getAllByRole("listitem")).toHaveLength(marta.modules.length);
  });

  it("links plan CTAs to the app and internal CTAs to the site", () => {
    render(<StoryCard story={marta} />);
    expect(screen.getByRole("link", { name: marta.cta.label })).toHaveAttribute("href", "https://app.test/register?plan=freelance");
  });

  it("keeps site-relative CTAs on the portal", () => {
    render(<StoryCard story={jordi} />);
    expect(screen.getByRole("link", { name: jordi.cta.label })).toHaveAttribute("href", expect.stringMatching(/^\/gestorias\/?$/));
  });

  it("shows the integration status pill only for stories that depend on a pending integration", () => {
    const { unmount } = render(<StoryCard story={shopify} />);
    expect(screen.getByText(integrationStatusLabels.soon)).toBeInTheDocument();
    unmount();
    render(<StoryCard story={marta as Story} />);
    expect(screen.queryByText(integrationStatusLabels.soon)).not.toBeInTheDocument();
  });
});
