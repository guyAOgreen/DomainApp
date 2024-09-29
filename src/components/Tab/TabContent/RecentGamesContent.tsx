
import React from "react";
import { embeddedLichessUrl } from "../../../constants/lichessConstants";
import './RecentGamesContent.css';

interface RecentGamesContentProps {
    gamesIds: String [];
}

const RecentGamesContent: React.FC<RecentGamesContentProps> = ({ gamesIds }) => {
    return (
        <>
            <h2 style={{ textAlign: "center" }}>My Recent Online Games</h2>
            <div className="iframe-style">
                {gamesIds?.map((game, index) => (
                    <div key={index}>
                        <iframe
                            src={embeddedLichessUrl(game)}
                            width="600"
                            height="397"
                            allowFullScreen
                            title={`Lichess game ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </>
    );

};
export default RecentGamesContent;