import { useState } from "react";
import type { Game, GameToCreate, GameToUpdate } from "../types/Game";
import GameService from "../services/GameService";
// redux
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../redux/store";
import { setGames } from "../redux/gamesSlice";

const useGames = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const games = useSelector((state: RootState) => state.games.list);
  const dispatch = useDispatch();

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
      dispatch(setGames(games));
    });

  const submitGame = async (game: GameToCreate) =>
    handleRequest(async () => {
      const games = await gameService.postGame(game);
      if (!Array.isArray(games)) throw new Error("Response is not an array");
      dispatch(setGames(games));
    });

  const deleteGame = async (id: string) =>
    handleRequest(async () => {
      const games = await gameService.deleteGame(id);
      if (!Array.isArray(games)) throw new Error("Response is not an array");
      dispatch(setGames(games));
    });

  const updateGame = async (game: GameToUpdate) =>
    handleRequest(async () => {
      const games = await gameService.updateGame(game);
      if (!Array.isArray(games)) throw new Error("Response is not an array");
      dispatch(setGames(games));
    });

  const clearError = () => setError(null);

  return {
    loading,
    error,
    games,
    fetchGames,
    submitGame,
    deleteGame,
    updateGame,
    clearError,
  };
};

export default useGames;
