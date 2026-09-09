import React from "react";
import { Link } from "react-router-dom";
import ImageAlbum from "../../components/ImageAlbum/ImageAlbum";
import { appRoutes } from "../../constants/routeConstants";
import { useGallery } from "../../hooks/useGallery";
import catGif from "../../assets/gifs/cat.gif";

const AboutMePage: React.FC = () => {
  const { state: gallery, retry, isRetrying } = useGallery();
  const galleryHeading = React.useRef<HTMLHeadingElement>(null);
  const retryButton = React.useRef<HTMLButtonElement | null>(null);
  const setRetryButton = React.useCallback((button: HTMLButtonElement | null) => {
    // Ref cleanup runs before removing the control, while its focus can still be checked.
    if (!button && retryButton.current === document.activeElement) {
      galleryHeading.current?.focus();
    }
    retryButton.current = button;
  }, []);
  const hasPhotos = gallery.status === "success" && gallery.images.length > 0;
  const statusMessage = {
    loading: isRetrying ? "Retrying photos…" : "Loading photos…",
    error: "Photos could not be loaded.",
    success: hasPhotos ? "Photos loaded." : "No photos are available yet.",
  }[gallery.status];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-20 text-gray-900 dark:bg-gray-900 dark:text-white md:px-20">
      <header className="mx-auto mb-12 max-w-4xl text-center">
        <h1 className="mb-4 text-5xl font-extrabold">About Me</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Senior software engineer, product builder, chess player, and enthusiastic participant in
          more sports than my calendar probably has room for.
        </p>
      </header>

      <div className="mx-auto mb-16 grid max-w-4xl gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold">Software and product</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              I am a senior software engineer with a background in Applied Mathematics and Computer
              Science from UCT.
            </p>
            <p>
              At ACI Worldwide, I was an Associate Software Engineer. I worked on software that
              processed payments from point-of-sale systems to upstream systems. At Oracle, I
              progressed from Software Developer (IC2) to Senior Software Developer (IC3), working
              across cloud services until June 2026. My{" "}
              <Link
                to={appRoutes.cv}
                className="font-semibold text-blue-700 underline dark:text-blue-300"
              >
                CV
              </Link>{" "}
              covers the details.
            </p>
            <p>
              Since July 2026, I’ve focused on my own independent projects. I especially enjoy
              turning an idea into a useful product. One of those projects is{" "}
              <Link
                to={appRoutes.projects}
                className="font-semibold text-blue-700 underline dark:text-blue-300"
              >
                FootyBru
              </Link>
              , a platform I designed and built to make running five-a-side football groups easier.
              It lets me work across product design, backend, web, mobile, testing, and deployment.
            </p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Beyond Code</h2>
            <img
              src={catGif}
              alt=""
              className="hidden h-10 w-10 shrink-0 rounded-full motion-safe:lg:block"
            />
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Padel is my main sport at the moment, and I’m an ambassador for Epicenter Virgin
              Active Padel. I also run and play five-a-side football—the group I manage inspired
              FootyBru.
            </p>
            <p>
              Chess keeps the strategic side of my brain busy. I represented my province at junior
              level and now play for Observatory Chess Club in the Cape Town league.
            </p>
            <p>
              Away from competition, I enjoy F1, Pokémon GO, quiz nights, go-karting, time with
              friends, and getting out into nature.
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl" aria-labelledby="photo-gallery-heading">
        <div className="mb-6 text-center">
          <h2
            ref={galleryHeading}
            id="photo-gallery-heading"
            tabIndex={-1}
            className="text-3xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 dark:focus-visible:outline-blue-300"
          >
            A few snapshots of my life
          </h2>
        </div>
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={hasPhotos ? "sr-only" : "py-12 text-center text-gray-700 dark:text-gray-300"}
        >
          {statusMessage}
        </p>
        {(gallery.status === "error" || isRetrying) && (
          <div className="pb-12 text-center">
            <button
              ref={setRetryButton}
              type="button"
              aria-disabled={isRetrying}
              onClick={() => {
                if (gallery.status === "error") retry();
              }}
              className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-disabled:cursor-wait"
            >
              {isRetrying ? "Retrying…" : "Try again"}
            </button>
          </div>
        )}
        {gallery.status === "success" && hasPhotos && (
          <ImageAlbum
            images={gallery.images}
            thumbnailsLabel="Choose a personal snapshot"
            autoplayInterval={8000}
          />
        )}
      </section>
    </div>
  );
};

export default AboutMePage;
