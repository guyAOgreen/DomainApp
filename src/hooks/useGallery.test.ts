import { act, renderHook, waitFor } from "@testing-library/react";
import type { ImageAlbumItem } from "../components/ImageAlbum/ImageAlbum";
import galleryManifest from "../testUtils/gallery.json";
import { fetchGallery } from "../utils/gallery";
import { useGallery } from "./useGallery";

vi.mock("../utils/gallery", () => ({ fetchGallery: vi.fn() }));

const fetchGalleryMock = vi.mocked(fetchGallery);

describe("useGallery", () => {
  beforeEach(() => {
    fetchGalleryMock.mockReset().mockImplementation(() => new Promise(() => undefined));
  });

  it("starts loading and exposes the returned images when the request completes", async () => {
    const request = Promise.withResolvers<ImageAlbumItem[]>();
    fetchGalleryMock.mockReturnValue(request.promise);
    const { result } = renderHook(() => useGallery());

    expect(result.current.state).toEqual({ status: "loading" });
    await act(async () => request.resolve(galleryManifest.images));

    expect(result.current.state).toEqual({ status: "success", images: galleryManifest.images });
  });

  it("treats an empty gallery as a successful result", async () => {
    fetchGalleryMock.mockResolvedValue([]);
    const { result } = renderHook(() => useGallery());

    await waitFor(() => expect(result.current.state).toEqual({ status: "success", images: [] }));
  });

  it("exposes an error when the request fails", async () => {
    fetchGalleryMock.mockRejectedValue(new Error("Gallery request failed."));
    const { result } = renderHook(() => useGallery());

    await waitFor(() => expect(result.current.state).toEqual({ status: "error" }));
  });

  it("clears the error while retrying and uses the new response", async () => {
    const retryRequest = Promise.withResolvers<ImageAlbumItem[]>();
    fetchGalleryMock.mockRejectedValueOnce(new Error("Network unavailable"));
    fetchGalleryMock.mockReturnValueOnce(retryRequest.promise);
    const { result } = renderHook(() => useGallery());
    await waitFor(() => expect(result.current.state).toEqual({ status: "error" }));

    act(() => result.current.retry());

    expect(result.current.state).toEqual({ status: "loading" });
    expect(fetchGalleryMock).toHaveBeenCalledTimes(2);
    await act(async () => retryRequest.resolve(galleryManifest.images));
    expect(result.current.state).toEqual({ status: "success", images: galleryManifest.images });
  });

  it("aborts the pending request when the hook unmounts", () => {
    const { unmount } = renderHook(() => useGallery());
    const signal = fetchGalleryMock.mock.calls[0][0];
    expect(signal.aborted).toBe(false);

    unmount();

    expect(signal.aborted).toBe(true);
  });

  it.each(["resolve", "reject"] as const)(
    "ignores a superseded request that later settles with %s",
    async (settlement) => {
      const originalRequest = Promise.withResolvers<ImageAlbumItem[]>();
      const replacementRequest = Promise.withResolvers<ImageAlbumItem[]>();
      fetchGalleryMock.mockReturnValueOnce(originalRequest.promise);
      fetchGalleryMock.mockReturnValueOnce(replacementRequest.promise);
      const { result } = renderHook(() => useGallery());
      const originalSignal = fetchGalleryMock.mock.calls[0][0];

      act(() => result.current.retry());

      expect(originalSignal.aborted).toBe(true);
      expect(fetchGalleryMock.mock.calls[1][0].aborted).toBe(false);
      await act(async () => replacementRequest.resolve([]));
      expect(result.current.state).toEqual({ status: "success", images: [] });

      await act(async () => {
        if (settlement === "resolve") originalRequest.resolve(galleryManifest.images);
        else originalRequest.reject(new Error("Late failure"));
      });

      expect(result.current.state).toEqual({ status: "success", images: [] });
    }
  );
});
