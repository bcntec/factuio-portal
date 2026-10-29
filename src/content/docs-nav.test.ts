import { docsNav } from "./docs-nav";
import { siteRoutes } from "./site";

describe("docs nav", () => {
  it("lists the 390 guide in nav and site routes", () => {
    expect(docsNav.map((i) => i.href)).toContain("/docs/modelo-390-con-ia/");
    expect(siteRoutes).toContain("/docs/modelo-390-con-ia/");
  });
});
