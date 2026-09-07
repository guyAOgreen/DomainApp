import { useEffect, useState } from "react";
import type { ImageAlbumItem } from "../components/ImageAlbum/ImageAlbum";
import { fetchGallery } from "../utils/gallery";

type GalleryState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; images: ImageAlbumItem[] };

export const useGallery = () => {
  const [state, setState] = useState<GalleryState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchGallery(controller.signal)
      .then((images) => {
        if (active) setState({ status: "success", images });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt((previous) => previous + 1);
  };

  return { state, retry };
};
