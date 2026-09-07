import React from "react";
import { Link } from "react-router-dom";
import ImageAlbum from "../../components/ImageAlbum/ImageAlbum";
import { appRoutes } from "../../constants/routeConstants";
import { useGallery } from "../../hooks/useGallery";

const AboutMePage: React.FC = () => {
  const { state: gallery, retry } = useGallery();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-20 text-gray-900 dark:bg-gray-900 dark:text-white md:px-20">
      <header className="mx-auto mb-12 max-w-4xl text-center">
        <h1 className="mb-4 text-5xl font-extrabold">About Me</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Software developer, product builder, chess player, and enthusiastic participant in more
          sports than my calendar probably has room for.
        </p>
      </header>

      <div className="mx-auto mb-16 grid max-w-4xl gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold">Software and product</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              I am a full-stack software developer with a background in Applied Mathematics and
              Computer Science from UCT. At ACI, I worked on software that processed payments from
              point-of-sale systems to upstream systems. At Oracle, I worked across multiple cloud
              projects. My{" "}
              <Link
                to={appRoutes.cv}
                className="font-semibold text-blue-700 underline dark:text-blue-300"
              >
                CV
              </Link>{" "}
              covers the details.
            </p>
            <p>
              I’m now focused on my own independent projects and especially enjoy turning an idea
              into a useful product. One of those projects is{" "}
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
          <h2 className="mb-4 text-2xl font-semibold">Beyond Code</h2>
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
          <h2 id="photo-gallery-heading" className="text-3xl font-semibold">
            A few snapshots of my life
          </h2>
        </div>
        {gallery.status === "loading" && (
          <p role="status" className="py-12 text-center text-gray-700 dark:text-gray-300">
            Loading photos…
          </p>
        )}
        {gallery.status === "error" && (
          <div className="py-12 text-center">
            <p role="alert" className="text-gray-700 dark:text-gray-300">
              Photos could not be loaded.
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-4 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Try again
            </button>
          </div>
        )}
        {gallery.status === "success" &&
          (gallery.images.length === 0 ? (
            <p role="status" className="py-12 text-center text-gray-700 dark:text-gray-300">
              No photos are available yet.
            </p>
          ) : (
            <ImageAlbum
              images={gallery.images}
              thumbnailsLabel="Choose a personal snapshot"
              autoplayInterval={8000}
            />
          ))}
      </section>
    </div>
  );
};

export default AboutMePage;
