import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";
import ImageAlbum, { type ImageAlbumItem } from "./ImageAlbum";

const images: ImageAlbumItem[] = [
  { src: "/first.png", alt: "First screenshot", caption: "First caption" },
  {
    src: "/second.png",
    alt: "Second screenshot",
    caption: "Second caption",
  },
  { src: "/third.png", alt: "Third screenshot", caption: "Third caption" },
];

describe("ImageAlbum", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("exposes the caller's thumbnail label as a group", () => {
    render(<ImageAlbum images={images} thumbnailsLabel="Choose demo screenshots" />);

    expect(screen.getByRole("group", { name: "Choose demo screenshots" })).toHaveClass("grid");
    expect(screen.getByRole("group", { name: "Choose demo screenshots" })).not.toHaveClass(
      "overflow-x-auto"
    );
  });

  it("wraps backwards and supports direct thumbnail selection", async () => {
    const user = userEvent.setup();
    render(<ImageAlbum images={images} thumbnailsLabel="Choose demo screenshots" />);

    await user.click(screen.getByRole("button", { name: "Previous image" }));
    expect(screen.getByRole("img", { name: "Third screenshot" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show Second screenshot" }));
    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();
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

  it("automatically advances at the configured interval and supports play and pause", () => {
    vi.useFakeTimers();
    render(
      <ImageAlbum
        images={images}
        thumbnailsLabel="Choose demo screenshots"
        autoplayInterval={8000}
      />
    );

    act(() => vi.advanceTimersByTime(8000));

    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Image 2 of 3: Second screenshot");
    fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }));
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "Third screenshot" })).toBeInTheDocument();
  });

  it("temporarily pauses autoplay during hover and keyboard focus", () => {
    vi.useFakeTimers();
    render(
      <ImageAlbum
        images={images}
        thumbnailsLabel="Choose demo screenshots"
        autoplayInterval={8000}
      />
    );
    const album = screen.getByRole("region", { name: "Image album" });

    fireEvent.mouseEnter(album);
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "First screenshot" })).toBeInTheDocument();

    fireEvent.mouseLeave(album);
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();

    fireEvent.focus(screen.getByRole("button", { name: "Previous image" }));
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();

    fireEvent.blur(screen.getByRole("button", { name: "Previous image" }), {
      relatedTarget: document.body,
    });
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "Third screenshot" })).toBeInTheDocument();
  });

  it("temporarily pauses autoplay while the browser tab is hidden", () => {
    vi.useFakeTimers();
    let visibilityState: DocumentVisibilityState = "visible";
    vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visibilityState);
    render(
      <ImageAlbum
        images={images}
        thumbnailsLabel="Choose demo screenshots"
        autoplayInterval={8000}
      />
    );

    visibilityState = "hidden";
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "First screenshot" })).toBeInTheDocument();

    visibilityState = "visible";
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();
  });

  it("makes autoplay unavailable when reduced motion is preferred", () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true }) as MediaQueryList)
    );
    render(
      <ImageAlbum
        images={images}
        thumbnailsLabel="Choose demo screenshots"
        autoplayInterval={8000}
      />
    );

    expect(screen.queryByRole("button", { name: /slideshow/i })).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("img", { name: "First screenshot" })).toBeInTheDocument();
  });
});
