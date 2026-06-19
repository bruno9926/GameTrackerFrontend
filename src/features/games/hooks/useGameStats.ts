import type { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { GAME_STATUSES } from "../model/Game";

const fromThisYear = (dateString?: string | null) => {
    if (!dateString) return false;
    try {
        const date = new Date(dateString);
        const now = new Date();
        return date.getFullYear() === now.getFullYear();
    } catch (e) {
        return false;
    }
}

const useGameStats = () => {
    const games = useSelector((state: RootState) => state.games.list);

    const gamesFinished = games.filter(game => game.status === GAME_STATUSES.completed && fromThisYear(game.completionDate)).length;
    const gamesInProgress = games.filter(game => game.status === GAME_STATUSES.playing).length;

    return {
        gamesFinished,
        gamesInProgress
    }
}

export default useGameStats;