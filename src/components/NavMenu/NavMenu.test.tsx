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
  });

  it("keeps decorative imagery out of the mobile header layout", () => {
    const { container } = render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>
    );

    expect(container.querySelector("img")).toHaveClass("hidden", "lg:block");
  });
});
