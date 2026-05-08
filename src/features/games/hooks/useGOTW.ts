import { getErrorMessage } from "@shared/lib/error-messages";
import { gameService } from "../api/GameService";
import { useEffect, useState } from "react";
import type { GameOfTheWeek } from "../model";

const useGOTW = () => {
    const [gotw, setGOTW] = useState<GameOfTheWeek | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGOTW = async () => {
        setLoading(true);
        setError(null);
        try {
            const gameOfTheWeek = await gameService.fetchGOTW();
            setGOTW(gameOfTheWeek);
        } catch (e) {
            setError(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGOTW();
    }, []);

    return {
        gotw,
        loading,
        error,
        fetchGOTW
    }
}

export default useGOTW;