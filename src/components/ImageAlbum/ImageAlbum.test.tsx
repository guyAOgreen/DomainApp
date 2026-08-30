import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";
import ImageAlbum, { type ImageAlbumItem } from "./ImageAlbum";

const images: ImageAlbumItem[] = [
  { src: "/first.png", alt: "First screenshot", caption: "First caption" },
  {
    src: "/second.png",
    alt: "Second screenshot",
    caption: "Second caption",
    objectPosition: "center top",
    objectFit: "contain",
  },
  { src: "/third.png", alt: "Third screenshot", caption: "Third caption" },
];

describe("ImageAlbum", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("exposes the caller's thumbnail label as a group", () => {
    render(<ImageAlbum images={images} thumbnailsLabel="Choose demo screenshots" />);

    expect(screen.getByRole("group", { name: "Choose demo screenshots" })).toBeInTheDocument();
  });

  it("wraps backwards and supports direct thumbnail selection", async () => {
    const user = userEvent.setup();
    render(<ImageAlbum images={images} thumbnailsLabel="Choose demo screenshots" />);

    await user.click(screen.getByRole("button", { name: "Previous image" }));
    expect(screen.getByRole("img", { name: "Third screenshot" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show Second screenshot" }));
    expect(screen.getByRole("img", { name: "Second screenshot" })).toHaveStyle({
      objectPosition: "center top",
    });
    expect(screen.getByRole("img", { name: "Second screenshot" })).toHaveClass("object-contain");
    expect(screen.getByRole("status")).toHaveTextContent("Image 2 of 3: Second screenshot");
    expect(
      screen.getByRole("link", { name: "View Second screenshot full size (opens in a new tab)" })
    ).toBeInTheDocument();
  });

  it("keeps rendering when its image list becomes shorter", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <ImageAlbum images={images} thumbnailsLabel="Choose demo screenshots" />
    );

    await user.click(screen.getByRole("button", { name: "Previous image" }));
    rerender(<ImageAlbum images={images.slice(0, 1)} thumbnailsLabel="Choose demo screenshots" />);

    expect(screen.getByRole("img", { name: "First screenshot" })).toBeInTheDocument();
  });

  it("automatically advances when autoplay is enabled", () => {
    vi.useFakeTimers();
    render(
      <ImageAlbum
        images={images}
        thumbnailsLabel="Choose demo screenshots"
        autoplayInterval={5000}
      />
    );

    act(() => vi.advanceTimersByTime(5000));

    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Image 2 of 3: Second screenshot");
  });
});
