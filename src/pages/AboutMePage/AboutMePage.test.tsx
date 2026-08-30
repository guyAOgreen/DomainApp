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

  it("gives every consistently cropped gallery image descriptive text and lazy loading", () => {
    render(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    const gallery = screen.getByRole("region", { name: "A few snapshots" });
    const images = Array.from(gallery.querySelectorAll("img"));

    expect(images).toHaveLength(8);
    images.forEach((image) => {
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image).toHaveClass("aspect-square", "object-cover");
      expect(image).not.toHaveAttribute("alt", expect.stringMatching(/^image \d+$/i));
      expect(image.getAttribute("alt")).not.toBe("");
    });
  });
});
