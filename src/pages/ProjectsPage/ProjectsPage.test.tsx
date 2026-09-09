import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Project } from "../../data/projects";
import ProjectsPage from "./ProjectsPage";

vi.mock("../../data/projects", () => ({
  projects: [
    {
      id: "first-test-project",
      title: "First test project",
      description: "The first project's description.",
      featured: true,
      role: "A role supplied by the project data.",
      highlights: ["A technical highlight supplied by the project data."],
      stack: ["React", "TypeScript"],
      status: [{ name: "Web app", state: "Live", description: "Available for testing." }],
      links: [
        { label: "Visit first project", href: "https://first.example" },
        { label: "First project source", href: "https://source.example/first" },
      ],
      images: [
        { src: "/first.png", alt: "First project overview", caption: "First overview caption." },
        { src: "/first-detail.png", alt: "First project detail", caption: "First detail caption." },
      ],
    },
    {
      id: "second-test-project",
      title: "Second test project",
      description: "The second project's description.",
      stack: ["Python"],
      status: [{ name: "App", state: "In development", description: "Work in progress." }],
      links: [{ label: "Visit second project", href: "https://second.example" }],
      images: [
        { src: "/second.png", alt: "Second project overview", caption: "Second overview caption." },
      ],
    },
  ] satisfies Project[],
}));

describe("ProjectsPage", () => {
  it("renders each project's details, links, status, and images from the data", () => {
    render(<ProjectsPage />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    const first = within(screen.getByRole("article", { name: "First test project" }));
    const second = within(screen.getByRole("article", { name: "Second test project" }));

    expect(first.getByText("The first project's description.")).toBeInTheDocument();
    expect(first.getByText("A role supplied by the project data.")).toBeInTheDocument();
    expect(
      first.getByText("A technical highlight supplied by the project data.")
    ).toBeInTheDocument();
    expect(
      first.getByRole("list", { name: "First test project technology stack" })
    ).toHaveTextContent("ReactTypeScript");
    expect(first.getByText("Web app — Live")).toBeInTheDocument();
    expect(first.getByText("Available for testing.")).toBeInTheDocument();
    const source = first.getByRole("link", { name: "First project source (opens in a new tab)" });
    expect(source).toHaveAttribute("href", "https://source.example/first");
    expect(source).toHaveAttribute("target", "_blank");
    expect(source).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      first.getByRole("link", { name: "Visit first project (opens in a new tab)" })
    ).toHaveAttribute("href", "https://first.example");
    expect(first.getByRole("img", { name: "First project overview" })).toHaveAttribute(
      "src",
      "/first.png"
    );
    expect(first.getByText("First overview caption.")).toBeInTheDocument();

    expect(second.getByText("The second project's description.")).toBeInTheDocument();
    expect(
      second.getByRole("list", { name: "Second test project technology stack" })
    ).toHaveTextContent("Python");
    expect(second.getByText("App — In development")).toBeInTheDocument();
    expect(second.getByText("Work in progress.")).toBeInTheDocument();
    expect(
      second.getByRole("link", { name: "Visit second project (opens in a new tab)" })
    ).toHaveAttribute("href", "https://second.example");
    expect(second.getByRole("img", { name: "Second project overview" })).toHaveAttribute(
      "src",
      "/second.png"
    );
  });

  it("only shows featured and optional detail sections when supplied", () => {
    render(<ProjectsPage />);

    const first = within(screen.getByRole("article", { name: "First test project" }));
    const second = within(screen.getByRole("article", { name: "Second test project" }));
    expect(first.getByText("Featured project")).toBeInTheDocument();
    expect(first.getByRole("heading", { name: "My role" })).toBeInTheDocument();
    expect(first.getByRole("heading", { name: "Technical highlights" })).toBeInTheDocument();
    expect(second.queryByText("Featured project")).not.toBeInTheDocument();
    expect(second.queryByRole("heading", { name: "My role" })).not.toBeInTheDocument();
    expect(second.queryByRole("heading", { name: "Technical highlights" })).not.toBeInTheDocument();
  });

  it("keeps each project's gallery selection independent", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const first = within(screen.getByRole("article", { name: "First test project" }));
    const second = within(screen.getByRole("article", { name: "Second test project" }));
    await user.click(first.getByRole("button", { name: "Next image" }));

    expect(first.getByRole("img", { name: "First project detail" })).toBeInTheDocument();
    expect(first.getByText("First detail caption.")).toBeInTheDocument();
    expect(second.getByRole("img", { name: "Second project overview" })).toBeInTheDocument();
    expect(second.getByText("Second overview caption.")).toBeInTheDocument();
  });
});
