import { afterEach, describe, expect, it } from "vitest";
import { currentSource, rememberSource, sourceFromSearch } from "./signup-source";

describe("signup source", () => {
  afterEach(() => sessionStorage.clear());

  it("reads origen first, then utm_source", () => {
    expect(sourceFromSearch("?origen=loft15&utm_source=x")).toBe("loft15");
    expect(sourceFromSearch("?utm_source=linkedin")).toBe("linkedin");
    expect(sourceFromSearch("?foo=1")).toBeNull();
  });

  it("remembers the landing source for later pages of the visit", () => {
    rememberSource("?origen=loft15");
    expect(currentSource("")).toBe("loft15");
    expect(currentSource("?origen=feria")).toBe("feria");
  });

  it("does not overwrite the remembered source when a page has none", () => {
    rememberSource("?origen=loft15");
    rememberSource("");
    expect(currentSource("")).toBe("loft15");
  });
});
