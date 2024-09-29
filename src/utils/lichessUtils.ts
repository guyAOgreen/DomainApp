export const extractLichessGameIds: (pgnResponse: String) => String [] = (pgnResponse) => {
    let gameIds: String [] = [];
    
    // The Lichess API returns a PGN Response instead of JSON
    // The ID of the game is in the link that is located in the "Site" field
    gameIds = pgnResponse.split("Site");
    
    // The first resource doesn't include a link
    gameIds = gameIds?.slice(1);

    // Extracts the ID from the link 
    gameIds = gameIds.map((game) => {
        game= game.substring(game?.indexOf("\"") + 1);
        game = game.substring(0, game?.indexOf("\""));
        game = game.substring(game?.indexOf("org/") +4);
        game = game.replaceAll("'", "")
        return game;
    });

    return gameIds;
}