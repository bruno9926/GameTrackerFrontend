import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import { gameService } from "./api/GameService";
import GOTW from "./ui/GOTW/GOTW";

vi.mock("./api/GameService", () => ({
    gameService: {
        fetchGOTW: vi.fn()
    }
}));

const mockGameService = vi.mocked(gameService);

const gotw = {
    gameTitleId: '123',
    name: "The Legend of Zelda: Breath of the Wild",
    coverUrl: "https://example.com/zelda-cover.jpg",
    friendsPlaying: 4,
    usersPlaying: 10
}

describe("GOTW", () => {
    it("should show the GOTW information", async () => {
        mockGameService.fetchGOTW.mockResolvedValue(gotw);
        render(<GOTW />);

        const image = await screen.findByRole("img", { name: gotw.name });
        expect(image).toHaveAttribute("src", gotw.coverUrl);
        expect(screen.getByText(/game of the week/i)).toBeInTheDocument();
        expect(screen.getByText(gotw.name)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(`played by ${gotw.friendsPlaying} friends`, 'i'))).toBeInTheDocument();
        expect(screen.getByText(new RegExp(`added by ${gotw.usersPlaying} players`, 'i'))).toBeInTheDocument();
    });

    it("displays the error message", async () => {
        const errorMessage = "Error fetching GOTW";
        mockGameService.fetchGOTW.mockRejectedValue(new Error(errorMessage));

        render(<GOTW />);
        await screen.findByText(errorMessage, { exact: true });
        expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("displays null gotw fallback", async () => {
        mockGameService.fetchGOTW.mockResolvedValue(null as any);

        render(<GOTW />);
        await screen.findByText(/no game of the week yet/i);
    });
});
