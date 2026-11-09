import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { WaitlistForm } from "./waitlist-form";

const w = site.waitlist;

async function fill() {
  const user = userEvent.setup();
  render(<WaitlistForm />);
  await user.type(screen.getByLabelText(w.form.email), "ana@empresa.es");
  await user.click(screen.getByRole("combobox", { name: w.form.profile }));
  await user.click(await screen.findByRole("option", { name: w.form.profiles.gestoria }));
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
