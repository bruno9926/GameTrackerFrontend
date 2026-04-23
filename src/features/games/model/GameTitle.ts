//A game title is the representation of a game as a work or product

// external id, i.e the igbd id
export type GameTitleId = string;

export type GameTitle = {
    sourceId: GameTitleId,
    source: string,
    name: string,
    cover: string | null, //an url for the image
}