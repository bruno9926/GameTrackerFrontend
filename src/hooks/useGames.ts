import { useState } from "react";
import type { Game } from "../types/Game";
import GameService from "../services/GameService";


const useGames = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const [games, setGames] = useState<Game[]>([]);

    const gameService: GameService = GameService.getInstance();

    const fetchGames = async () => {
        try {
            setError(null);
            setLoading(true);
            const games = await gameService.fetchGames();
            
            if(!Array.isArray(games)) throw new Error("Response is not an array");
            setGames(games);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setLoading(false);
        }
    }

    const submitGame = async (game: Omit<Game, 'id'>) => {
        try {
            setError(null);
            setLoading(true);
            const games = await gameService.postGame(game);

            if(!Array.isArray(games)) throw new Error("Response is not an array");
            setGames(games);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        games,
        fetchGames,
        submitGame
    }

}

export default useGames;