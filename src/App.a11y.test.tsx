import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import App from "./App";
import { expectNoAxeViolations } from "./testUtils/axe";
import galleryManifest from "./testUtils/gallery.json";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve(new Response(JSON.stringify(galleryManifest))))
  );
});

afterEach(() => vi.unstubAllGlobals());

vi.mock("axios", () => ({
  default: {
    get: () =>
      Promise.resolve({ data: ['{"id":"first-game"}', '{"id":"second-game"}'].join("\n") }),
  },
}));

const renderRoute = (route: string) => {
  window.history.pushState({}, "", route);
  return render(<App />);
};

describe("accessibility", () => {
  it.each(["/", "/about-me", "/projects", "/cv"])("has no axe violations on %s", async (route) => {
    const { container } = renderRoute(route);
    if (route === "/about-me") {
      await screen.findByRole("group", { name: "Choose a personal snapshot" });
    }

    await expectNoAxeViolations(container);
  });

  it("has no axe violations on the chess page once recent games have loaded", async () => {
    const { container } = renderRoute("/chess");
    await screen.findByRole("button", { name: "Show game 1" });

    await expectNoAxeViolations(container);
  });

  it("has no axe violations with the CV preview expanded", async () => {
    const user = userEvent.setup();
    const { container } = renderRoute("/cv");
    await user.click(screen.getByText("Preview CV (PDF)"));
    await screen.findByTitle("Guy Green CV");

    await expectNoAxeViolations(container);
  });

  it("has no axe violations on the chess links tab", async () => {
    const user = userEvent.setup();
    const { container } = renderRoute("/chess");
    await user.click(await screen.findByRole("button", { name: "Find Me" }));

    await expectNoAxeViolations(container);
  });
});
