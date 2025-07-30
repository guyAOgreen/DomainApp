export const extractLichessGameIds: (pgnResponse: String) => String [] = (pgnResponse) => {
    let gameIds: String [] = [];
    
    gameIds = Array.from(pgnResponse.matchAll(/{"id":"(.*?)"/g)).map(match => match[1]);

    return gameIds;
}