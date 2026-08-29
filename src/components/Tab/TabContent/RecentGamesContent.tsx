import React, { useState } from "react";
import { embeddedLichessUrl } from "../../../constants/lichessConstants";

interface RecentGamesContentProps {
  gameIds: string[];
}

const RecentGamesContent: React.FC<RecentGamesContentProps> = ({ gameIds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (gameIds.length === 0) {
    return null;
  }

  const safeCurrentIndex = Math.min(currentIndex, gameIds.length - 1);
  const currentGame = gameIds[safeCurrentIndex];
  const currentGameNumber = safeCurrentIndex + 1;

  const showPrevious = () => {
    setCurrentIndex(safeCurrentIndex === 0 ? gameIds.length - 1 : safeCurrentIndex - 1);
  };
  const showNext = () => {
    setCurrentIndex((safeCurrentIndex + 1) % gameIds.length);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">My Recent Online Games</h2>

      <div className="mx-auto w-full max-w-3xl">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg dark:border-gray-700">
          <iframe
            key={currentGame}
            src={embeddedLichessUrl(currentGame)}
            className="h-[80vh] min-h-80 w-full border-0"
            allowFullScreen
            title={`Lichess game ${currentGameNumber}`}
          />
        </div>

        {/* Live region and visible position are the same element, so the change is announced
            without a screen reader hearing the position twice. */}
        <p role="status" className="mt-3 text-center text-sm text-gray-700 dark:text-gray-300">
          Game {currentGameNumber} of {gameIds.length}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous game"
            className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next game"
            className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Next
          </button>
        </div>

        {/* p-2 rather than pb-2 so focus rings are not clipped by the scroll container. */}
        <div
          className="mt-4 flex snap-x gap-3 overflow-x-auto p-2"
          role="group"
          aria-label="Choose a recent game"
        >
          {gameIds.map((game, index) => (
            <button
              key={game}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show game ${index + 1}`}
              aria-pressed={index === safeCurrentIndex}
              className={`shrink-0 snap-start whitespace-nowrap rounded-lg px-4 py-2 font-semibold transition-colors ${
                index === safeCurrentIndex
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-700 hover:text-white dark:bg-gray-700 dark:text-white"
              }`}
            >
              Game {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentGamesContent;
