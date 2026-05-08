import { useState } from "react";
import { gameStatuses, type Game, type GameStatus } from "../model/Game";

const useStatusFilter = () => {
  const [statusFilters, setStatusFilters] = useState<Record<GameStatus, boolean>>({
    playing: true,
    completed: true,
    wishlist: true,
    paused: true,
  });

  const toggleStatusFilter = (status: GameStatus) =>
    setStatusFilters(current => ({ ...current, [status]: !current[status] }));

  const selectAll = () =>
    setStatusFilters(Object.fromEntries(gameStatuses.map(s => [s, true])) as Record<GameStatus, boolean>);

  const filterByStatus = (games: Game[]) => games.filter(game => statusFilters[game.status]);

  return { statusFilters, toggleStatusFilter, selectAll, filterByStatus };
};

export default useStatusFilter;
