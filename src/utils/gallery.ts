import type { ImageAlbumItem } from "../components/ImageAlbum/ImageAlbum";
import { galleryManifestUrl, publicAssetsBaseUrl } from "../constants/assetConstants";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const resolveImageUrl = (src: string): string => {
  const baseUrl = new URL(publicAssetsBaseUrl);
  const url = new URL(src, baseUrl);
  if (
    /[\u0000-\u001f\u007f\\]/.test(src) ||
    url.origin !== baseUrl.origin ||
    !url.pathname.startsWith(baseUrl.pathname) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error("Image URL must point to a public object in the configured bucket.");
  }

  const segments = url.pathname.slice(baseUrl.pathname.length).split("/");
  if (
    segments.some((segment) => {
      const decoded = decodeURIComponent(segment);
      return (
        !decoded || decoded === "." || decoded === ".." || /[/\\%\u0000-\u001f\u007f]/.test(decoded)
      );
    })
  ) {
    throw new Error("Invalid image object path.");
  }
  return url.href;
};

const parseGalleryManifest = (data: unknown): ImageAlbumItem[] => {
  if (!isRecord(data) || !Array.isArray(data.images)) {
    throw new Error("Gallery manifest must contain an images array.");
  }

  const seenUrls = new Set<string>();
  return data.images.map((entry: unknown) => {
    if (
      !isRecord(entry) ||
      !isNonEmptyString(entry.src) ||
      !isNonEmptyString(entry.alt) ||
      !isNonEmptyString(entry.caption) ||
      ("label" in entry && !isNonEmptyString(entry.label))
    ) {
      throw new Error("Invalid gallery image.");
    }

    const src = resolveImageUrl(entry.src);
    if (seenUrls.has(src)) {
      throw new Error("Gallery images must have unique URLs.");
    }
    seenUrls.add(src);
    return {
      src,
      alt: entry.alt,
      caption: entry.caption,
      ...(isNonEmptyString(entry.label) ? { label: entry.label } : {}),
    };
  });
};

export const fetchGallery = async (signal: AbortSignal): Promise<ImageAlbumItem[]> => {
  const response = await fetch(galleryManifestUrl, { signal, credentials: "omit" });
  if (!response.ok) {
    throw new Error("Gallery request failed.");
  }
  const data: unknown = await response.json();
  return parseGalleryManifest(data);
};
