import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";

vi.mock("axios", () => ({
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
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv");
    expect(screen.getByRole("link", { name: "Chess" })).toHaveAttribute("href", "/chess");
  });

  it("identifies the active navigation link", () => {
    renderRoute("/about-me");

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("navigates between routes without reloading the document", async () => {
    const user = userEvent.setup();
    renderRoute("/");

    await user.click(screen.getByRole("link", { name: "About" }));

    expect(window.location.pathname).toBe("/about-me");
    expect(screen.getByRole("heading", { level: 1, name: "About Me" })).toBeInTheDocument();
  });

  it("uses client-side navigation for homepage calls to action", async () => {
    const user = userEvent.setup();
    renderRoute("/");

    await user.click(screen.getByRole("link", { name: "View My CV" }));

    expect(window.location.pathname).toBe("/cv");
    expect(screen.getByRole("heading", { level: 1, name: "Curriculum Vitae" })).toBeInTheDocument();
  });

  it("links prominently from the homepage to the projects page", async () => {
    const user = userEvent.setup();
    renderRoute("/");

    await user.click(screen.getByRole("link", { name: "View My Projects" }));

    expect(window.location.pathname).toBe("/projects");
    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
  });

  it.each([
    ["/", "Hi, I'm Guy Green"],
    ["/about-me", "About Me"],
    ["/projects", "Projects"],
    ["/cv", "Curriculum Vitae"],
    ["/chess", "My Chess Life"],
  ])("renders the %s route", (route, heading) => {
    renderRoute(route);

    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("renders the current employment content", () => {
    renderRoute("/cv");

    expect(screen.getByRole("heading", { name: /Oracle.*Software Engineer/ })).toBeInTheDocument();
  });

  it.each(["/about-me", "/cv"])("renders the current padel ambassadorship on %s", (route) => {
    renderRoute(route);

    expect(screen.getByText(/ambassador for Epicenter Virgin Active Padel/i)).toBeInTheDocument();
  });

  it("presents FootyBru and its current delivery status", () => {
    renderRoute("/projects");

    expect(screen.getByRole("heading", { level: 2, name: "FootyBru" })).toBeInTheDocument();
    expect(screen.getByText(/creator and sole contributor/i)).toBeInTheDocument();
    expect(screen.getByText("Backend — Live")).toBeInTheDocument();
    expect(screen.getByText("Deployed on AWS Elastic Beanstalk.")).toBeInTheDocument();
    expect(screen.getByText("Web app — Live")).toBeInTheDocument();
    expect(screen.getByText("Deployed with AWS Amplify.")).toBeInTheDocument();
    expect(screen.getByText("Mobile app — In development")).toBeInTheDocument();
  });

  it("lets visitors browse the accessible FootyBru product album", async () => {
    const user = userEvent.setup();
    renderRoute("/projects");

    expect(screen.getByRole("img", { name: "FootyBru landing page" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show FootyBru group dashboard" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View FootyBru landing page full size" })
    ).toHaveAttribute("target", "_blank");

    await user.click(screen.getByRole("button", { name: "Next image" }));

    expect(screen.getByRole("img", { name: "FootyBru group dashboard" })).toBeInTheDocument();
  });

  it.each([
    ["/", /football — which keeps me energized/],
    ["/", /Whether it’s for work, collaboration/],
    ["/about-me", /football — I am even an ambassador/],
    ["/about-me", /I’m an avid F1 fan/],
    ["/cv", "Oracle — Software Engineer"],
    ["/cv", "April 2020 – Present"],
  ])("renders UTF-8 punctuation correctly on %s", (route, expectedText) => {
    renderRoute(route);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(/^© \d{4} Guy Green$/)).toBeInTheDocument();
  });
});
