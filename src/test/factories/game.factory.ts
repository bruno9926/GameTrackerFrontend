import type { Game } from "@features/games/model";

export const gameFactory = (override?: Partial<Game>): Game => ({
    id: "1",
    name: "The Legend of Zelda: Breath of the Wild",
    status: "playing",
    coverUrl: "https://example.com/zelda-cover.jpg",
    gameTitleId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...override
})