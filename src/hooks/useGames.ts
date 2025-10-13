import { useState } from "react";
import type { Game } from "../types/Game";
import GameService from "../services/GameService";

const useGames = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  const gameService: GameService = GameService.getInstance();

  const handleRequest = async (action: () => Promise<void>) => {
    try {
      setError(null);
      setLoading(true);
      await action();
    } catch (exception) {
      if (exception instanceof Error) {
        setError(exception.message);
      } else {
        setError(String(exception));
      }
      throw exception;
    } finally {
      setLoading(false);
    }
  };

  const fetchGames = async () =>
    handleRequest(async () => {
      const games = await gameService.fetchGames();
      if (!Array.isArray(games)) throw new Error("Response is not an array");
      setGames(games);
    });

  const submitGame = async (game: Omit<Game, "id">) =>
    handleRequest(async () => {
      const games = await gameService.postGame(game);
      if (!Array.isArray(games)) throw new Error("Response is not an array");
      setGames(games);
    });

  const deleteGame = async (id: number) =>
    handleRequest(async () => {
      const games = await gameService.deleteGame(id);
      if (!Array.isArray(games)) throw new Error("Response is not an array");
      setGames(games);
    });

  const clearError = () => setError(null);

  return {
    loading,
    error,
    games,
    fetchGames,
    submitGame,
    deleteGame,
    clearError,
  };
};

export default useGames;
