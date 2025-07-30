import React from "react";
import axios from "axios";
import { extractLichessGameIds } from "../../utils/lichessUtils";
import RecentGamesContent from "../../components/Tab/TabContent/RecentGamesContent";
import { numberOfRecentGamesShown } from "../../constants/lichessConstants";
import { ChessPageTabs } from "../../components/Tab/tabConstants";
import TabButton from "../../components/Tab/TabButton";

import './ChessPage.css';
import LinksContent from "../../components/Tab/TabContent/LinksContent";
import Loader from "../../components/Loader/Loader";

const ChessPage = () => {
    const [games, setGames] = React.useState<String>("");
    const [gamesIds, setGamesIds] = React.useState<String []>([]);
    const [loaded, setLoaded] = React.useState<Boolean>(false);

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
                if (loaded) {
                    return  (
                        <RecentGamesContent
                            gamesIds={gamesIds}
                        />
                    );
                } else {
                    return (
                        <Loader/>
                    );
                }

            case ChessPageTabs.links:
                return (
                    <LinksContent/>
                );
            default:
                return null;
        }
    }

   
    return (
        <>
            <div className="title">
                {"My Chess Life"}
            </div>
            <>
                <div className="tab-container">
                    <TabButton
                        title={"Recent Games"}
                        showContentFn={setDisplayTab}
                        page={ChessPageTabs.RecentGames}
                        isActive={displayTab === ChessPageTabs.RecentGames}
                    />
                    <TabButton
                        title={"Find Me"}
                        showContentFn={setDisplayTab}
                        page={ChessPageTabs.links}
                        isActive={displayTab === ChessPageTabs.links}
                    />
                </div>
            </>

            {renderTabs()}
        </>
      );
}
export default ChessPage;