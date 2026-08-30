import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("presents the snapshots as an autoplaying album without cropping the photos", async () => {
    const user = userEvent.setup();
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
    ).toHaveClass("object-contain");
    await user.click(
      screen.getByRole("button", { name: "Show Guy with Peter Lékó at a Cape Town Chess event" })
    );
    expect(
      screen.getByRole("img", { name: "Guy with Peter Lékó at a Cape Town Chess event" })
    ).toHaveClass("object-contain");
  });
});
