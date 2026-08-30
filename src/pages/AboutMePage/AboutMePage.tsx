import React from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/1.jpeg";
import image2 from "../../assets/images/2.jpeg";
import image3 from "../../assets/images/3.jpeg";
import image4 from "../../assets/images/4.jpeg";
import image5 from "../../assets/images/5.jpeg";
import image6 from "../../assets/images/6.jpeg";
import image7 from "../../assets/images/7.jpeg";
import profileImage from "../../assets/images/profile.jpg";
import ImageAlbum from "../../components/ImageAlbum/ImageAlbum";
import { appRoutes } from "../../constants/routeConstants";

const galleryImages = [
  {
    src: image1,
    alt: "Guy on a beach at sunset with mountains in the distance",
    caption: "Sunset on the Cape Town coast.",
  },
  { src: image2, alt: "Guy beside a decorated Christmas tree", caption: "Christmas at home." },
  {
    src: image3,
    alt: "Guy taking an outdoor selfie while wearing a red visor",
    caption: "Out for a sunny run.",
  },
  {
    src: image4,
    alt: "Guy smiling in an airport while wearing a striped jacket",
    caption: "Ready for the next trip.",
  },
  {
    src: image5,
    alt: "Guy standing on an indoor padel court",
    caption: "On court for a game of padel.",
  },
  {
    src: image6,
    alt: "Guy pointing to his name on a race results board",
    caption: "Finding my finish on the race results board.",
  },
  {
    src: image7,
    alt: "Guy with Peter Leko at a Cape Town Chess event",
    caption: "With Grandmaster Peter Leko at a Cape Town Chess event.",
    objectPosition: "center top",
  },
  {
    src: profileImage,
    alt: "Guy playing chess at a tournament",
    caption: "Over the board at a chess tournament.",
  },
];

const AboutMePage: React.FC = () => {
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
              Computer Science from UCT. At Oracle, I work across cloud infrastructure, Multicloud,
              and Edge Computing projects.
            </p>
            <p>
              I especially enjoy turning an idea into a useful product. My main independent project
              is{" "}
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
          <h2 className="mb-4 text-2xl font-semibold">Beyond the keyboard</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Football — both a favourite way to stay active and the real-world problem behind
              FootyBru — connects my personal and product-building interests. I’m also a runner,
              padel player, and ambassador for Epicenter Virgin Active Padel.
            </p>
            <p>
              Chess keeps the strategic side of my brain busy. I represented my province at junior
              level and now play for Observatory Chess Club in the Cape Town league. Away from
              competition, I enjoy F1, quiz nights, go-karting, time with friends, and getting out
              into nature.
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl" aria-labelledby="photo-gallery-heading">
        <div className="mb-6 text-center">
          <h2 id="photo-gallery-heading" className="text-3xl font-semibold">
            A few snapshots
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Sport, chess, Cape Town, and the people and places around them.
          </p>
        </div>
        <ImageAlbum
          images={galleryImages}
          thumbnailsLabel="Choose a personal snapshot"
          autoplayInterval={5000}
          imageFit="cover"
        />
      </section>
    </div>
  );
};

export default AboutMePage;
