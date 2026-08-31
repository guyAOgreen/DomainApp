import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NavMenu from "./NavMenu";

describe("NavMenu", () => {
  it("uses an accessible mobile menu that can be opened with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
    );

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });
    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(navigation).toHaveClass("hidden", "md:block");

    toggle.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(navigation).not.toHaveClass("hidden");

    await user.click(screen.getByRole("link", { name: "About" }));

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(navigation).toHaveClass("hidden", "md:block");
  });

  it("only reveals decorative animation on large screens when motion is allowed", () => {
    const { container } = render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
    );

    expect(container.querySelector("img")).toHaveClass("hidden", "motion-safe:lg:block");
    expect(container.querySelector("img")).not.toHaveClass("lg:block");
  });
});
