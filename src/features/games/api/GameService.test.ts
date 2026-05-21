import { describe, expect, it, vi } from "vitest";
import { gameService } from "./GameService";
import { apiClient } from "@shared/api/apiClient";
import { gameFactory } from "@/test/factories/game.factory";
import type { GameToCreate } from "../model";

vi.mock("@shared/api/apiClient", () => ({
    apiClient: vi.fn()
}));

const GAMES_URL = "http://test-api/games";

const mockApiClient = vi.mocked(apiClient);

describe("GameService", () => {

    describe("fetchGames", () => {
        it("calls the correct endpoint", async () => {
            mockApiClient.mockResolvedValueOnce([]);

            await gameService.fetchGames();

            expect(mockApiClient).toHaveBeenCalledWith(GAMES_URL);
        });

        it("returns the games from the api", async () => {
            const games = [
                gameFactory()
            ]
            mockApiClient.mockResolvedValueOnce(games);

            const returnedGames = await gameService.fetchGames();
            expect(returnedGames).toHaveLength(games.length)
            // only compare the unique ids
            expect(returnedGames.map(g => (g.id))).toEqual(games.map(g => g.id));
        })
    });

    describe("postGame", () => {
        it("calls the correct endpoint with the correct method and body", async () => {
            const gameToCreate: GameToCreate = { name: "Test Game", status: "playing", gameTitleId: "123" };
            mockApiClient.mockResolvedValueOnce([]);

            await gameService.postGame(gameToCreate);
            expect(mockApiClient).toHaveBeenCalledWith(GAMES_URL, { method : "POST", body: gameToCreate });
        })

        it("return the games from the api", async () => {
            const games = [ gameFactory() ];
            const { name, status, gameTitleId } = games[0];
            const gameToCreate: GameToCreate = { name, status, gameTitleId };
            mockApiClient.mockResolvedValueOnce(games);

            const returnedGames = await gameService.postGame(gameToCreate);
            expect(returnedGames).toHaveLength(games.length)
            // only compare the unique ids
            expect(returnedGames.map(g => (g.id))).toEqual(games.map(g => g.id));
        })
    })

    describe("deleteGame", () => {
        it("calls the correct endpoint with the game id", async () => {
            const game = gameFactory();
            mockApiClient.mockResolvedValueOnce([]);

            await gameService.deleteGame(game.id);

            expect(mockApiClient).toHaveBeenCalledWith(`${GAMES_URL}/${game.id}`, { method: "DELETE" });
        });

        it("throws when id is empty", async () => {
            await expect(gameService.deleteGame("")).rejects.toThrow("The id provided is not valid");
        });
    });

    describe("updateGame", () => {
        it("calls the correct endpoint with the game payload", async () => {
            const game = gameFactory();
            mockApiClient.mockResolvedValueOnce([]);

            await gameService.updateGame(game);

            expect(mockApiClient).toHaveBeenCalledWith(GAMES_URL, { method: "PUT", body: game });
        });

        it("throws when id is empty", async () => {
            await expect(gameService.updateGame({ id: "" })).rejects.toThrow("The id provided is not valid");
        });
    });

    describe("searchGameTitle", () => {
        it("calls the correct endpoint with the search query", async () => {
            mockApiClient.mockResolvedValueOnce([]);

            await gameService.searchGameTitle("zelda");

            expect(mockApiClient).toHaveBeenCalledWith(`${GAMES_URL}/search?q=zelda`);
        });

        it("throws when query is empty", async () => {
            await expect(gameService.searchGameTitle("")).rejects.toThrow("A search query is required");
        });
    });

    describe("fetchGOTW", () => {
        it("calls the correct endpoint", async () => {
            mockApiClient.mockResolvedValueOnce(null);

            await gameService.fetchGOTW();

            expect(mockApiClient).toHaveBeenCalledWith(`${GAMES_URL}/gotw`);
        });
    });
});
