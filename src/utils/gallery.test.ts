import galleryManifest from "../testUtils/gallery.json";
import { fetchGallery } from "./gallery";

const fetchMock = vi.fn<typeof fetch>();
const expectedBaseUrl =
  "https://objectstorage.af-johannesburg-1.oraclecloud.com/n/ax1xpn4rr6se/b/domainapp-public-assets/o/";
const firstImage = galleryManifest.images[0];

const respondWith = (data: unknown) => {
  fetchMock.mockResolvedValue(new Response(JSON.stringify(data)));
};

describe("fetchGallery", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests the public manifest without credentials and preserves the uploaded descriptions", async () => {
    const controller = new AbortController();
    respondWith(galleryManifest);

    await expect(fetchGallery(controller.signal)).resolves.toEqual(galleryManifest.images);
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(expectedBaseUrl + "about-me/gallery.json", {
      credentials: "omit",
      signal: controller.signal,
    });
  });

  it("resolves relative paths and preserves ordering, labels, and full bucket URLs", async () => {
    const portrait = {
      ...galleryManifest.images[7],
      src: "about-me/images/profile.jpg",
      label: "Chess",
    };
    respondWith({ images: [portrait, firstImage] });

    await expect(fetchGallery(new AbortController().signal)).resolves.toEqual([
      { ...portrait, src: expectedBaseUrl + "about-me/images/profile.jpg" },
      firstImage,
    ]);
  });

  it("accepts an empty gallery", async () => {
    respondWith({ images: [] });

    await expect(fetchGallery(new AbortController().signal)).resolves.toEqual([]);
  });

  it.each([404, 503])(
    "rejects HTTP %s even when the body contains a valid manifest",
    async (status) => {
      fetchMock.mockResolvedValue(new Response(JSON.stringify(galleryManifest), { status }));

      await expect(fetchGallery(new AbortController().signal)).rejects.toThrow(
        "Gallery request failed."
      );
    }
  );

  it.each([
    new TypeError("Network unavailable"),
    new DOMException("Request cancelled", "AbortError"),
  ])("propagates a rejected request: %s", async (error) => {
    fetchMock.mockRejectedValue(error);

    await expect(fetchGallery(new AbortController().signal)).rejects.toBe(error);
  });

  it("rejects invalid JSON", async () => {
    fetchMock.mockResolvedValue(new Response("{broken JSON"));

    await expect(fetchGallery(new AbortController().signal)).rejects.toThrow(SyntaxError);
  });

  it.each([
    ["null manifest", null],
    ["array manifest", []],
    ["missing images", {}],
    ["non-array images", { images: {} }],
  ])("rejects a %s", async (_description, data) => {
    respondWith(data);

    await expect(fetchGallery(new AbortController().signal)).rejects.toThrow(
      "Gallery manifest must contain an images array."
    );
  });

  it.each([
    ["null entry", null],
    ["non-object entry", "photo.jpg"],
    ["missing source", { alt: firstImage.alt, caption: firstImage.caption }],
    ["non-string source", { ...firstImage, src: 123 }],
    ["blank source", { ...firstImage, src: "  " }],
    ["blank alt text", { ...firstImage, alt: "  " }],
    ["non-string alt text", { ...firstImage, alt: false }],
    ["missing caption", { src: firstImage.src, alt: firstImage.alt }],
    ["blank caption", { ...firstImage, caption: "" }],
    ["non-string caption", { ...firstImage, caption: {} }],
    ["non-string label", { ...firstImage, label: 123 }],
    ["blank label", { ...firstImage, label: "  " }],
  ])("rejects the whole manifest for a %s", async (_description, entry) => {
    respondWith({ images: [galleryManifest.images[7], entry] });

    await expect(fetchGallery(new AbortController().signal)).rejects.toThrow(
      "Invalid gallery image."
    );
  });

  it.each([
    ["external origin", "https://example.com/photo.jpg"],
    ["protocol-relative external origin", "//example.com/photo.jpg"],
    ["HTTP URL", expectedBaseUrl.replace("https:", "http:") + "photo.jpg"],
    [
      "URL credentials",
      expectedBaseUrl.replace("https://", "https://user:password@") + "photo.jpg",
    ],
    ["JavaScript URL", "javascript:alert(1)"],
    ["data URL", "data:image/jpeg;base64,abc"],
    ["parent traversal", "../private/photo.jpg"],
    ["different bucket", "../../other-bucket/o/photo.jpg"],
    ["bucket prefix lookalike", expectedBaseUrl.replace("/o/", "/other/") + "photo.jpg"],
    ["encoded traversal", "about-me/images/%2e%2e%2fphoto.jpg"],
    ["encoded backslash", "about-me/images/%5cphoto.jpg"],
    ["double encoding", "about-me/images/%252e%252e%252fphoto.jpg"],
    ["malformed encoding", "about-me/images/%zz.jpg"],
    ["raw backslashes", "about-me\\images\\photo.jpg"],
    ["control characters", "about-me/images/pho\nto.jpg"],
    ["query string", "about-me/images/photo.jpg?token=private"],
    ["fragment", "about-me/images/photo.jpg#fragment"],
    ["empty object path", expectedBaseUrl],
    ["empty path segment", "about-me//photo.jpg"],
    ["malformed URL", "https://["],
  ])("rejects an unsafe image destination: %s", async (_description, src) => {
    respondWith({ images: [firstImage, { ...galleryManifest.images[7], src }] });

    await expect(fetchGallery(new AbortController().signal)).rejects.toThrow();
  });

  it.each([firstImage.src, "about-me/images/./1.jpeg"])(
    "rejects duplicate images after resolving URLs: %s",
    async (src) => {
      respondWith({ images: [firstImage, { ...firstImage, src }] });

      await expect(fetchGallery(new AbortController().signal)).rejects.toThrow(
        "Gallery images must have unique URLs."
      );
    }
  );
});
