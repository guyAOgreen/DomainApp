import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import galleryManifest from "../../testUtils/gallery.json";
import AboutMePage from "./AboutMePage";

const fetchMock = vi.fn<typeof fetch>();
const expectedBaseUrl =
  "https://objectstorage.af-johannesburg-1.oraclecloud.com/n/ax1xpn4rr6se/b/domainapp-public-assets/o/";
const renderPage = () =>
  render(
    <MemoryRouter>
      <AboutMePage />
    </MemoryRouter>
  );

describe("AboutMePage", () => {
  beforeEach(() => {
    fetchMock.mockReset().mockImplementation(() => new Promise(() => undefined));
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("connects Guy's professional background, product work, and interests", () => {
    render(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Software and product" })).toBeInTheDocument();
    expect(screen.getByText(/full-stack software developer/i)).toHaveTextContent(
      /At ACI, I worked on software that processed payments from point-of-sale systems to upstream systems/i
    );
    expect(screen.getByText(/full-stack software developer/i)).toHaveTextContent(
      /At Oracle, I worked across multiple cloud projects/i
    );
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv");
    expect(screen.getByRole("link", { name: "FootyBru" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("heading", { name: "Beyond Code" })).toBeInTheDocument();
    expect(screen.getByText(/Padel is my main sport/i)).toHaveTextContent(
      /five-a-side football—the group I manage inspired FootyBru/i
    );
    expect(screen.getByText(/Away from competition/i)).toHaveTextContent(/Pokémon GO/);
    expect(screen.getByRole("heading", { name: "A few snapshots of my life" })).toBeInTheDocument();
  });

  it("presents the snapshots as an autoplaying album without cropping the photos", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify(galleryManifest)));
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    expect(await screen.findByRole("button", { name: "Previous image" })).toBeInTheDocument();
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

  it("announces loading while keeping the biography available", () => {
    renderPage();

    expect(screen.getByRole("status")).toHaveTextContent("Loading photos…");
    expect(screen.getByRole("heading", { name: "Software and product" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next image" })).not.toBeInTheDocument();
  });

  it("uses manifest order, labels, descriptions, and safely resolved object paths", async () => {
    const user = userEvent.setup();
    const portrait = {
      ...galleryManifest.images[7],
      label: "Chess",
      src: "about-me/images/profile.jpg",
    };
    const beach = galleryManifest.images[0];
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ images: [portrait, beach] })));
    renderPage();

    expect(await screen.findByRole("img", { name: portrait.alt })).toHaveAttribute(
      "src",
      `${expectedBaseUrl}about-me/images/profile.jpg`
    );
    expect(screen.getByText("Chess")).toBeInTheDocument();
    expect(screen.getByText(portrait.caption)).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Image album" })).getByRole("status")
    ).toHaveTextContent(`Image 1 of 2: ${portrait.alt}`);
    await user.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByRole("img", { name: beach.alt })).toHaveAttribute("src", beach.src);
    expect(screen.getByText(beach.caption)).toBeInTheDocument();
    expect(screen.queryByText("Chess")).not.toBeInTheDocument();
  });

  it("announces an empty gallery", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ images: [] })));
    renderPage();

    expect(await screen.findByText("No photos are available yet.")).toHaveAttribute(
      "role",
      "status"
    );
    expect(screen.queryByRole("button", { name: "Next image" })).not.toBeInTheDocument();
  });

  it("lets visitors retry a network failure", async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValueOnce(new TypeError("Network unavailable"));
    renderPage();

    expect(await screen.findByText("Photos could not be loaded.")).toHaveAttribute(
      "role",
      "status"
    );
    expect(screen.getByRole("heading", { name: "Beyond Code" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByRole("status")).toHaveTextContent("Retrying photos…");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("recovers from a failed request when retry succeeds", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce(new Response("Unavailable", { status: 503 }));
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(galleryManifest)));
    renderPage();

    await user.click(await screen.findByRole("button", { name: "Try again" }));
    expect(
      await screen.findByRole("img", { name: galleryManifest.images[0].alt })
    ).toBeInTheDocument();
    expect(screen.queryByText("Photos could not be loaded.")).not.toBeInTheDocument();
  });

  it("handles a response that is not valid JSON", async () => {
    fetchMock.mockResolvedValue(new Response("{broken JSON"));
    renderPage();

    expect(await screen.findByText("Photos could not be loaded.")).toHaveAttribute(
      "role",
      "status"
    );
  });

  it("shows an error for malformed entries while keeping the biography available", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ images: [{ ...galleryManifest.images[0], alt: "" }] }))
    );
    renderPage();

    expect(await screen.findByText("Photos could not be loaded.")).toHaveAttribute(
      "role",
      "status"
    );
    expect(screen.getByRole("heading", { name: "Beyond Code" })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Image album" })).not.toBeInTheDocument();
  });

  it("shows an error instead of displaying an unsafe image destination", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          images: [{ ...galleryManifest.images[0], src: "https://example.com/photo.jpg" }],
        })
      )
    );
    renderPage();

    expect(await screen.findByText("Photos could not be loaded.")).toHaveAttribute(
      "role",
      "status"
    );
    expect(screen.queryByRole("region", { name: "Image album" })).not.toBeInTheDocument();
  });
  it("keeps the retry control focused and blocks repeated activation during loading", async () => {
    const user = userEvent.setup();
    const response = Promise.withResolvers<Response>();
    fetchMock.mockRejectedValueOnce(new TypeError("Network unavailable"));
    fetchMock.mockReturnValueOnce(response.promise);
    renderPage();
    const retryButton = await screen.findByRole("button", { name: "Try again" });
    retryButton.focus();

    await user.keyboard("{Enter}");

    expect(screen.getByRole("button", { name: "Retrying…" })).toBe(retryButton);
    expect(retryButton).toHaveFocus();
    expect(retryButton).toHaveAttribute("aria-disabled", "true");
    expect(retryButton).not.toBeDisabled();
    await user.keyboard("{Enter} ");
    expect(fetchMock).toHaveBeenCalledTimes(2);

    await act(async () => response.resolve(new Response("Unavailable", { status: 503 })));
    expect(screen.getByRole("button", { name: "Try again" })).toBe(retryButton);
    expect(retryButton).toHaveFocus();
    expect(retryButton).toHaveAttribute("aria-disabled", "false");
  });

  it.each([
    ["photos", galleryManifest],
    ["an empty gallery", { images: [] }],
  ])(
    "moves focus to the gallery heading after a keyboard retry loads %s",
    async (_description, manifest) => {
      const user = userEvent.setup();
      const response = Promise.withResolvers<Response>();
      fetchMock.mockRejectedValueOnce(new TypeError("Network unavailable"));
      fetchMock.mockReturnValueOnce(response.promise);
      renderPage();
      const retryButton = await screen.findByRole("button", { name: "Try again" });
      retryButton.focus();
      await user.keyboard("{Enter}");

      await act(async () => response.resolve(new Response(JSON.stringify(manifest))));

      expect(screen.getByRole("heading", { name: "A few snapshots of my life" })).toHaveFocus();
      expect(retryButton).not.toBeInTheDocument();
    }
  );

  it("does not take focus back when the visitor has moved away during retry", async () => {
    const user = userEvent.setup();
    const response = Promise.withResolvers<Response>();
    fetchMock.mockRejectedValueOnce(new TypeError("Network unavailable"));
    fetchMock.mockReturnValueOnce(response.promise);
    renderPage();
    await user.click(await screen.findByRole("button", { name: "Try again" }));
    const cvLink = screen.getByRole("link", { name: "CV" });
    cvLink.focus();

    await act(async () => response.resolve(new Response(JSON.stringify(galleryManifest))));

    expect(cvLink).toHaveFocus();
  });

  it("updates the same live region through loading, error, retry, and empty states", async () => {
    const user = userEvent.setup();
    const initialResponse = Promise.withResolvers<Response>();
    const retryResponse = Promise.withResolvers<Response>();
    fetchMock.mockReturnValueOnce(initialResponse.promise);
    fetchMock.mockReturnValueOnce(retryResponse.promise);
    renderPage();
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading photos…");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");

    await act(async () => initialResponse.resolve(new Response("Unavailable", { status: 503 })));
    expect(screen.getByRole("status")).toBe(status);
    expect(status).toHaveTextContent("Photos could not be loaded.");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByRole("status")).toBe(status);
    expect(status).toHaveTextContent("Retrying photos…");
    await act(async () => retryResponse.resolve(new Response(JSON.stringify({ images: [] }))));
    expect(screen.getByRole("status")).toBe(status);
    expect(status).toHaveTextContent("No photos are available yet.");
  });

  it("offers recovery when the manifest request times out", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation(
      (_url, options) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = options?.signal;
          if (!signal) throw new Error("Expected a cancellable request");
          signal.addEventListener("abort", () => reject(signal.reason), { once: true });
        })
    );
    renderPage();

    await act(async () => vi.advanceTimersByTimeAsync(15_000));

    expect(screen.getByRole("status")).toHaveTextContent("Photos could not be loaded.");
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });
});
