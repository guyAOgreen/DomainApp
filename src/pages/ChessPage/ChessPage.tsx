import React from "react";
import axios from "axios";
import { extractLichessGameIds } from "../../utils/lichessUtils";
import RecentGamesContent from "../../components/Tab/TabContent/RecentGamesContent";
import { numberOfRecentGamesShown } from "../../constants/lichessConstants";
import { ChessPageTabs } from "../../components/Tab/tabConstants";
import TabButton from "../../components/Tab/TabButton";
import LinksContent from "../../components/Tab/TabContent/LinksContent";
import Loader from "../../components/Loader/Loader";

const ChessPage: React.FC = () => {
    const [games, setGames] = React.useState<String>("");
    const [gamesIds, setGamesIds] = React.useState<String[]>([]);
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [displayTab, setDisplayTab] = React.useState<number>(ChessPageTabs.RecentGames);

    React.useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(
                    `https://lichess.org/api/games/user/guygreenInClassAtUCT?max=${numberOfRecentGamesShown}`
                );     
                setGames(response.data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchGames();
    }, []);

    React.useEffect(() => {
        if (games?.length > 0) {
            setGamesIds(extractLichessGameIds(games));
        }
    }, [games]);

    if (gamesIds.length === numberOfRecentGamesShown && !loaded) {
        setLoaded(true);
    }

    const renderTabs = () => {
        switch(displayTab) {
            case ChessPageTabs.RecentGames:
                return loaded ? <RecentGamesContent gamesIds={gamesIds} /> : <Loader />;
            case ChessPageTabs.links:
                return <LinksContent />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 md:px-20 py-20">
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-center mb-12">My Chess Life</h1>

            {/* Tabs */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                <TabButton
                    title="Recent Games"
                    showContentFn={setDisplayTab}
                    page={ChessPageTabs.RecentGames}
                    isActive={displayTab === ChessPageTabs.RecentGames}
                />
                <TabButton
                    title="Find Me"
                    showContentFn={setDisplayTab}
                    page={ChessPageTabs.links}
                    isActive={displayTab === ChessPageTabs.links}
                />
            </div>

            {/* Tab Content */}
            <div className="max-w-6xl mx-auto">
                {renderTabs()}
            </div>
        </div>
    );
};

export default ChessPage;