export const extractLichessGameIds = (pgnResponse: string): string[] =>
  Array.from(pgnResponse.matchAll(/{"id":"(.*?)"/g)).map((match) => match[1]);
