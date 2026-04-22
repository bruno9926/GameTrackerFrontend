import { useState } from "react";
import GameService from "../api/GameService";
import type { GameTitle } from "../model/GameTitle";

const useGameTitleSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameService: GameService = GameService.getInstance();

  const searchGame = async (name: string): Promise<GameTitle[]> => {
    try {
      setError(null);
      setLoading(true);

      const result = await gameService.searchGameTitle(name);
      return mapToGameTitle(result);
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
  }

  const mapToGameTitle = (result: any[]): GameTitle[] => {
    return result.map(result => ({
      id: result.id,
      name: result.name,
      cover: result?.cover?.image_id ?
        `https://images.igdb.com/igdb/image/upload/t_cover_big/${result.cover.image_id}.jpg` : null
    }))
  }

  return {
    loading,
    error,
    searchGame
  };
};

export default useGameTitleSearch;
