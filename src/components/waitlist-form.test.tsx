import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { WaitlistForm } from "./waitlist-form";

const w = site.waitlist;

async function fill(source?: string) {
  const user = userEvent.setup();
  render(<WaitlistForm source={source} />);
  await user.type(screen.getByLabelText(w.form.email), "ana@empresa.es");
  await user.click(screen.getByRole("radio", { name: w.form.profiles.gestoria }));
  await user.click(screen.getByRole("checkbox"));
  await user.click(screen.getByRole("button", { name: w.form.submit }));
}

describe("WaitlistForm", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends email, profile and consent and shows the check-your-inbox message", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await fill();
    expect(await screen.findByText(w.success.title)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/waitlist/");
    expect(JSON.parse(init.body)).toMatchObject({ email: "ana@empresa.es", profile: "gestoria", consent: true, source: null });
  });

  it("sends the remembered signup source", async () => {
    sessionStorage.setItem("factuio.signup-source", "loft15");
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await fill();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ source: "loft15" });
    sessionStorage.clear();
  });

  it("offers every profile as a visible option, including communities", () => {
    render(<WaitlistForm />);
    const group = screen.getByRole("group", { name: w.form.profile });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.getByRole("radio", { name: w.form.profiles.comunidad })).toBeInTheDocument();
  });

  it("uses the partner source over the remembered one", async () => {
    sessionStorage.setItem("factuio.signup-source", "otro");
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await fill("loft15");
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ source: "loft15" });
    sessionStorage.clear();
  });

  it("shows the server's validation message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: "invalid_email" }), { status: 400 })));
    await fill();
    expect(await screen.findByRole("alert")).toHaveTextContent(w.errors.invalid_email);
  });

  it("shows a generic message when the server fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 502 })));
    await fill();
    expect(await screen.findByRole("alert")).toHaveTextContent(w.errors.generic);
  });
});
