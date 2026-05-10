import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import RecentGamesWidget from "./ui/RecentGamesWidget/RecentGamesWidget";
import { gameService } from "./api/GameService";
import { gameFactory } from "@/test/factories/game.factory";
import userEvent from "@testing-library/user-event";

vi.mock("./api/GameService", () => ({
    gameService: {
        fetchGames: vi.fn(),
        postGame: vi.fn(),
    }
}));

const mockGameService = vi.mocked(gameService);

describe("RecentGamesWidget", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders heading that redirects to games page", () => {
        mockGameService.fetchGames.mockResolvedValue([]);

        render(<RecentGamesWidget />);

        const heading = screen.getByRole("heading", { name: /recent games/i });
        expect(heading).toBeInTheDocument();
        expect(heading.closest("a")).toHaveAttribute("href", "/games");
    });

    it("renders the games from the store", async () => {
        const games = [gameFactory(), gameFactory({ id: "2", name: "Dark Souls" })];
        mockGameService.fetchGames.mockResolvedValueOnce(games);

        render(<RecentGamesWidget />);

        await waitFor(() => {
            games.forEach(game => {
                expect(screen.getByText(game.name)).toBeInTheDocument();
            });
        });
    });

    it("renders the error state", async () => {
        const errorMessage = "Failed to fetch games";
        mockGameService.fetchGames.mockRejectedValueOnce(new Error(errorMessage));

        render(<RecentGamesWidget />);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
        });
    });

    it("renders the empty state", async () => {
        mockGameService.fetchGames.mockResolvedValueOnce([]);

        render(<RecentGamesWidget />);

        await waitFor(() => {
            expect(screen.getByText(/your games will show here/i)).toBeInTheDocument();
        });
    })

    it("allows to add a new game", async () => {
        const games = [gameFactory()];
        mockGameService.fetchGames.mockResolvedValueOnce(games);

        render(<RecentGamesWidget />);

        const addButton = screen.getByRole("button", { name: /add game/i });
        expect(addButton).toBeInTheDocument();

        const user = userEvent.setup();
        await user.click(addButton);

        // shows the add game modal
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
            expect(screen.getByRole("heading", { name: /add a new game/i })).toBeInTheDocument();
        });
    })
});
