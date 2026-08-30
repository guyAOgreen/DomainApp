import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutMePage from "./AboutMePage";

describe("AboutMePage", () => {
  it("connects Guy's professional background, product work, and interests", () => {
    render(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Software and product" })).toBeInTheDocument();
    expect(screen.getByText(/full-stack software developer/i)).toHaveTextContent(/At Oracle/i);
    expect(screen.getByRole("link", { name: "FootyBru" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("heading", { name: "Beyond the keyboard" })).toBeInTheDocument();
  });

  it("presents the snapshots as an autoplaying, consistently cropped album", () => {
    render(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: "Previous image" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next image" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pause slideshow" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Choose a personal snapshot" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Guy on a beach at sunset with mountains in the distance",
      })
    ).toHaveClass("object-cover");
    expect(
      screen.getByRole("button", { name: "Show Guy with Peter Leko at a Cape Town Chess event" })
    ).toBeInTheDocument();
  });
});
