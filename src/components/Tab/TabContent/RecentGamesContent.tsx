import React, { useState } from "react";
import { embeddedLichessUrl } from "../../../constants/lichessConstants";

interface RecentGamesContentProps {
  gameIds: string[];
}

const RecentGamesContent: React.FC<RecentGamesContentProps> = ({ gameIds }) => {
  const [loadedGames, setLoadedGames] = useState<Set<string>>(() => new Set());

  const toggleGame = (game: string) => {
    setLoadedGames((currentGames) => {
      const nextGames = new Set(currentGames);
      if (nextGames.has(game)) {
        nextGames.delete(game);
      } else {
        nextGames.add(game);
      }
      return nextGames;
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">My Recent Online Games</h2>

      <div className="flex flex-col items-center gap-8">
        {gameIds.map((game, index) => (
          <div
            key={game}
            className="w-full max-w-3xl rounded-lg border border-gray-200 p-4 shadow-lg dark:border-gray-700"
          >
            <button
              type="button"
              onClick={() => toggleGame(game)}
              aria-expanded={loadedGames.has(game)}
              className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              {loadedGames.has(game) ? "Hide" : "Load"} Lichess game {index + 1}
            </button>
            {loadedGames.has(game) && (
              <iframe
                src={embeddedLichessUrl(game)}
                className="mt-4 h-[80vh] min-h-80 w-full border-0"
                allowFullScreen
                title={`Lichess game ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentGamesContent;
