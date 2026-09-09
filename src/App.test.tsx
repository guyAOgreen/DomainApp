import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";
import galleryManifest from "./testUtils/gallery.json";

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset().mockImplementation(() => new Promise(() => undefined));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => vi.unstubAllGlobals());

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

  it("gives icon-only social links accessible names", () => {
    renderRoute("/");

    expect(screen.getByRole("link", { name: "GitHub (opens in a new tab)" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn (opens in a new tab)" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Instagram (opens in a new tab)" })
    ).toBeInTheDocument();
  });

  it("keeps only the decorative portrait in the header without announcing it", () => {
    const { container } = renderRoute("/");

    expect(container.querySelectorAll("header img")).toHaveLength(1);
    expect(screen.queryAllByRole("img")).toHaveLength(0);
    expect(container.querySelector("header img")).toHaveAttribute(
      "src",
      "https://objectstorage.af-johannesburg-1.oraclecloud.com/n/ax1xpn4rr6se/b/domainapp-public-assets/o/about-me/images/profile.jpg"
    );
  });

  it("provides landmarks and a way to bypass repeated navigation", () => {
    renderRoute("/");

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
      "href",
      "#main-content"
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("updates the page title and moves focus to main content after route navigation", async () => {
    const user = userEvent.setup();
    renderRoute("/");

    expect(document.title).toBe("Home — Guy Green");
    await user.click(screen.getByRole("link", { name: "Projects" }));

    expect(document.title).toBe("Projects — Guy Green");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(screen.getByText("Projects page loaded")).toHaveAttribute("role", "status");
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

    await user.click(screen.getByRole("link", { name: "Explore my projects" }));

    expect(window.location.pathname).toBe("/projects");
    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
  });

  it.each([
    ["/", "Full-stack developer and independent product builder"],
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
    expect(
      screen.getByRole("link", { name: "Visit FootyBru (opens in a new tab)" })
    ).toHaveAttribute("href", "https://www.footybru.com");
    expect(screen.getByText(/creator and sole contributor/i)).toBeInTheDocument();
    expect(screen.getByText("Backend — Live")).toBeInTheDocument();
    expect(screen.getByText("Deployed on AWS Elastic Beanstalk.")).toBeInTheDocument();
    expect(screen.getByText("Web app — Live")).toBeInTheDocument();
    expect(screen.getByText("Deployed with AWS Amplify.")).toBeInTheDocument();
    expect(screen.getByText("Mobile app — In development")).toBeInTheDocument();
  });

  it("describes the photos in the About Me gallery", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify(galleryManifest)));
    renderRoute("/about-me");
    await screen.findByRole("group", { name: "Choose a personal snapshot" });

    [
      "Guy on a beach at sunset with mountains in the distance",
      "Guy beside a decorated Christmas tree",
      "Guy taking an outdoor selfie while wearing a red visor",
      "Guy smiling in an airport while wearing a striped jacket",
      "Guy standing on an indoor padel court",
      "Guy pointing to his name and best previous Cape Town Marathon time on a runners' board",
      "Guy with Peter Lékó at a Cape Town Chess event",
      "Guy playing chess at a tournament",
    ].forEach((description) => {
      expect(screen.getByRole("button", { name: `Show ${description}` })).toBeInTheDocument();
    });
  });

  it("provides an alternative when the optional CV preview cannot be viewed", async () => {
    const user = userEvent.setup();
    renderRoute("/cv");

    expect(screen.queryByTitle("Guy Green CV")).not.toBeInTheDocument();
    await user.click(screen.getByText("Preview CV (PDF)"));

    expect(await screen.findByTitle("Guy Green CV")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "open the CV PDF in a new tab" })).toHaveAttribute(
      "target",
      "_blank"
    );
    expect(screen.getByRole("heading", { name: "Professional Experience" })).toBeVisible();
  });

  it("restores the PDF preview when the bookmarked CV route is loaded again", async () => {
    const firstVisit = renderRoute("/cv#cv-preview");
    await screen.findByTitle("Guy Green CV");
    const savedUrl = window.location.pathname + window.location.hash;
    firstVisit.unmount();

    renderRoute(savedUrl);

    expect(await screen.findByTitle("Guy Green CV")).toBeVisible();
    expect(screen.getByText("Preview CV (PDF)").closest("details")).toHaveAttribute("open");
    expect(screen.getByRole("heading", { name: "Professional Experience" })).toBeVisible();
  });

  it("lets visitors browse the accessible FootyBru product album", async () => {
    const user = userEvent.setup();
    renderRoute("/projects");

    expect(screen.getByRole("img", { name: "FootyBru landing page" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show FootyBru group dashboard" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "View FootyBru landing page full size (opens in a new tab)",
      })
    ).toHaveAttribute("target", "_blank");

    await user.click(screen.getByRole("button", { name: "Next image" }));

    expect(screen.getByRole("img", { name: "FootyBru group dashboard" })).toBeInTheDocument();
  });

  it.each([
    ["/", /backend, web, and mobile—from/],
    ["/", /Whether it’s for work, collaboration/],
    ["/about-me", /football—the group I manage/],
    ["/about-me", /and I’m an ambassador/],
    ["/cv", "Oracle — Software Engineer"],
    ["/cv", "April 2020 – Present"],
  ])("renders UTF-8 punctuation correctly on %s", (route, expectedText) => {
    renderRoute(route);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(/^© \d{4} Guy Green$/)).toBeInTheDocument();
  });
});
