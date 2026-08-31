import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("introduces Guy through specific professional and product experience", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Full-stack developer and independent product builder",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Hi, I'm Guy Green")).toHaveClass("text-2xl", "md:text-3xl");
    expect(screen.getByText("Hi, I'm Guy Green")).not.toHaveClass("uppercase");
    expect(screen.getByText(/payment-processing software at ACI/i)).toBeInTheDocument();
    expect(screen.getAllByText(/multiple cloud projects at Oracle/i)).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Explore my projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("features FootyBru directly below the introduction", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 2, name: "FootyBru" })).toBeInTheDocument();
    expect(screen.getByText(/five-a-side football groups/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See the FootyBru project" })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(
      screen.getByRole("link", { name: "Visit FootyBru (opens in a new tab)" })
    ).toHaveAttribute("href", "https://www.footybru.com");
  });

  it("supports its capability claims with concrete examples", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Product ownership" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full-stack delivery" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Industry experience" })).toBeInTheDocument();
  });

  it("retains a concise picture of Guy beyond software", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Beyond the code" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Chess and strategy" })).toBeInTheDocument();
    expect(
      screen.getByText(/challenging myself through chess and strategic thinking/i)
    ).toHaveTextContent(/Observatory Chess Club/i);
    expect(screen.queryByText(/represented my province/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sport and movement" })).toBeInTheDocument();
    expect(screen.getByText(/padel, running, and five-a-side football/i)).toBeInTheDocument();
  });
});
