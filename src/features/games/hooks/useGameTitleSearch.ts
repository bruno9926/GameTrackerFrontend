import { useState } from "react";
import GameService from "../api/GameService";
import { getErrorMessage } from "@shared/lib/error-messages";
import type { GameTitle } from "../model/GameTitle";

const useGameTitleSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameService: GameService = GameService.getInstance();

  const searchGame = async (name: string): Promise<GameTitle[]> => {
    try {
      setError(null);
      setLoading(true);
      return await gameService.searchGameTitle(name);
    } catch (error) {
      setError(getErrorMessage(error))
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    searchGame
  };
};

export default useGameTitleSearch;
