import { extractLichessGameIds } from "./lichessUtils";

describe("extractLichessGameIds", () => {
  it("extracts game IDs in response order", () => {
    const response = [
      '{"id":"first-game","rated":true}',
      '{"id":"second-game","rated":false}',
    ].join("\n");

    expect(extractLichessGameIds(response)).toEqual(["first-game", "second-game"]);
  });

  it("returns an empty array when the response has no games", () => {
    expect(extractLichessGameIds("")).toEqual([]);
    expect(extractLichessGameIds("not a Lichess response")).toEqual([]);
  });
});
