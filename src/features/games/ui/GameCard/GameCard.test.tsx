import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/test-utils";
import GameCard from "./GameCard";
import { GAME_STATUS_LABELS, type Game } from "@features/games/model";
import { gameFactory } from "@/test/factories/game.factory";

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

    it("renders provided actions", () => {
        const game = gameFactory({ coverUrl: undefined });
        render(<GameCard name={game.name} status={game.status} coverUrl={game.coverUrl} actions={<button>Action</button>} />);

        const button = screen.getByRole("button", { name: "Action" });
        expect(button).toBeInTheDocument();
    })
});