import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: "" }),
}));

const renderRoute = (route: string) => {
  window.history.pushState({}, "", route);
  return render(<App />);
};

describe("App", () => {
  it("renders the main navigation", () => {
    renderRoute("/");

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about-me");
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv");
    expect(screen.getByRole("link", { name: "Chess" })).toHaveAttribute("href", "/chess");
  });

  it.each([
    ["/", "Hi, I'm Guy Green"],
    ["/about-me", "About Me"],
    ["/cv", "Curriculum Vitae"],
    ["/chess", "My Chess Life"],
  ])("renders the %s route", (route, heading) => {
    renderRoute(route);

    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("renders the current employment and ambassadorship content", () => {
    renderRoute("/cv");

    expect(screen.getByRole("heading", { name: /Oracle.*Software Engineer/ })).toBeInTheDocument();
    expect(screen.getByText(/Ambassador for GreenPoint Virgin Active Padel/)).toBeInTheDocument();
  });
});
