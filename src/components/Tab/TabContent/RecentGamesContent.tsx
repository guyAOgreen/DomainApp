import React from "react";
import { embeddedLichessUrl } from "../../../constants/lichessConstants";

interface RecentGamesContentProps {
    gamesIds: String[];
}

const RecentGamesContent: React.FC<RecentGamesContentProps> = ({ gamesIds }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                My Recent Online Games
            </h2>

            <div className="flex flex-col items-center gap-8">
                {gamesIds?.map((game, index) => (
                    <div key={index} className="w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
                        <iframe
                            src={embeddedLichessUrl(game)}
                            className="w-full h-[397px] md:h-[450px] border-0"
                            allowFullScreen
                            title={`Lichess game ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentGamesContent;