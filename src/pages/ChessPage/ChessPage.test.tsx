import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ChessPage from "./ChessPage";

const axiosMocks = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    get: axiosMocks.get,
  },
}));

describe("ChessPage", () => {
  beforeEach(() => {
    axiosMocks.get.mockReset();
  });

  it("shows a loading state while recent games are being requested", () => {
    axiosMocks.get.mockReturnValue(new Promise(() => undefined));

    render(<ChessPage />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  it("shows every returned game when Lichess returns fewer than the requested maximum", async () => {
    axiosMocks.get.mockResolvedValue({
      data: ['{"id":"first-game"}', '{"id":"second-game"}'].join("\n"),
    });

    render(<ChessPage />);

    expect(await screen.findByRole("button", { name: "Load Lichess game 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Load Lichess game 2" })).toBeInTheDocument();
    expect(screen.queryByTitle("Lichess game 1")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Lichess game 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("loads an embedded game only when requested", async () => {
    const user = userEvent.setup();
    axiosMocks.get.mockResolvedValue({ data: '{"id":"first-game"}' });

    render(<ChessPage />);
    await user.click(await screen.findByRole("button", { name: "Load Lichess game 1" }));

    expect(screen.getByTitle("Lichess game 1")).toHaveAttribute(
      "src",
      expect.stringContaining("first-game")
    );
  });

  it("exposes the active Chess section and a heading for each section", async () => {
    const user = userEvent.setup();
    axiosMocks.get.mockResolvedValue({ data: "" });
    render(<ChessPage />);

    expect(screen.getByRole("button", { name: "Recent Games" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await user.click(screen.getByRole("button", { name: "Find Me" }));

    expect(screen.getByRole("button", { name: "Find Me" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { level: 2, name: "Find Me Online" })).toBeInTheDocument();
  });

  it("shows an empty state when Lichess returns no games", async () => {
    axiosMocks.get.mockResolvedValue({ data: "" });

    render(<ChessPage />);

    expect(await screen.findByText("No recent games are available.")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("shows an error when recent games cannot be loaded", async () => {
    axiosMocks.get.mockRejectedValue(new Error("Network unavailable"));

    render(<ChessPage />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Recent games could not be loaded. Please try again later."
    );
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
