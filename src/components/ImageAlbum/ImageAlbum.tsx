import { useEffect, useState } from "react";

export type ImageAlbumItem = {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  caption: string;
};

type ImageAlbumProps = {
  images: ImageAlbumItem[];
  thumbnailsLabel: string;
};

const ImageAlbum = ({ images, thumbnailsLabel }: ImageAlbumProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return null;
  }

  const safeCurrentIndex = Math.min(currentIndex, images.length - 1);
  const currentImage = images[safeCurrentIndex];
  const showPrevious = () => {
    setCurrentIndex(safeCurrentIndex === 0 ? images.length - 1 : safeCurrentIndex - 1);
  };
  const showNext = () => {
    setCurrentIndex((safeCurrentIndex + 1) % images.length);
  };

  return (
    <div>
      <figure className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <a
          href={currentImage.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${currentImage.alt} full size`}
          className="block bg-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="aspect-video h-full w-full object-contain"
          />
        </a>
        <figcaption className="flex flex-col gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
          <span>{currentImage.caption}</span>
          <span>
            {safeCurrentIndex + 1} of {images.length}
          </span>
          <span role="status" className="sr-only">
            {currentImage.alt}. {currentImage.caption}. Image {safeCurrentIndex + 1} of{" "}
            {images.length}.
          </span>
        </figcaption>
      </figure>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous image"
          className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next image"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Next
        </button>
      </div>

      <div
        className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2"
        role="group"
        aria-label={thumbnailsLabel}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Show ${image.alt}`}
            aria-pressed={index === safeCurrentIndex}
            className={`w-40 shrink-0 snap-start overflow-hidden rounded-lg border-2 bg-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
              index === safeCurrentIndex ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={image.thumbnailSrc ?? image.src}
              alt=""
              loading="lazy"
              className="aspect-video w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageAlbum;
