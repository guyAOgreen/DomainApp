import { fireEvent, render, screen } from "@testing-library/react";
import { profileImageUrl } from "../../constants/assetConstants";
import NameComponent from "./NameComponent";

describe("NameComponent", () => {
  it("shows the remote portrait beside the name without announcing a duplicate image name", () => {
    const { container } = render(<NameComponent />);

    expect(container.querySelector("img")).toHaveAttribute("src", profileImageUrl);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(screen.getByText("Guy Green")).toBeVisible();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("replaces a failed portrait with decorative initials and keeps the name visible", () => {
    const { container } = render(<NameComponent />);
    const portrait = container.querySelector("img");
    if (!portrait) throw new Error("Expected the profile picture");

    fireEvent.error(portrait);

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText("GG")).toBeVisible();
    expect(screen.getByText("GG").closest('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.getByText("Guy Green")).toBeVisible();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
