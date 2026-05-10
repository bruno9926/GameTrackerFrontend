import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import GameCard from "./GameCard";
import { GAME_STATUS_LABELS, type Game } from "@features/games/model";

const gameFactory = (override?: Partial<Game>): Game => ({
    id: "1",
    name: "The Legend of Zelda: Breath of the Wild",
    status: "playing",
    coverUrl: "https://example.com/zelda-cover.jpg",
    gameTitleId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...override
})

const renderGame = (game: Game) => {
    render(<GameCard name={game.name} status={game.status} coverUrl={game.coverUrl} />);
}

describe("GameCard", () => {
    it("renders the game information", () => {
        const game = gameFactory();
        renderGame(game);

        expect(screen.getByText(game.name)).toBeInTheDocument();
        expect(screen.getByText(GAME_STATUS_LABELS[game.status])).toBeInTheDocument();
        expect(screen.getByAltText(game.name, { exact: false })).toBeInTheDocument();
    }),

    it("renders the correct game cover", () => {
        const game = gameFactory();
        renderGame(game);

        const image = screen.getByRole("img", { name: new RegExp(game.name, 'i') });
        expect(image).toHaveAttribute("src", game.coverUrl);
    })

    it("fallbacks to default image", () => {
        const game = gameFactory({ coverUrl: undefined });
        renderGame(game);

        const image = screen.getByRole("img", { name: new RegExp(game.name, 'i') });
        expect(image).toHaveAttribute("src", "/games/default-cover.jpg");
    })
});