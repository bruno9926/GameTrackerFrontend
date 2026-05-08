import clsx from "clsx";
import { GAME_STATUS_LABELS, gameStatuses } from "../../model/Game";
import type { GameStatus } from "../../model/Game";

const gameStatusBadgeStyles: Record<GameStatus, string> = {
  playing: "game-status-badge-playing",
  completed: "game-status-badge-completed",
  wishlist: "game-status-badge-wishlist",
  paused: "game-status-badge-paused",
}

interface StatusFilterProps {
  statusFilters: Record<GameStatus, boolean>,
  toggleStatusFilter: (status: GameStatus) => void,
  selectAll: () => void,
}
const StatusFilter: React.FC<StatusFilterProps> = ({statusFilters, toggleStatusFilter, selectAll }) => {

  const allSelected = gameStatuses.every(status => statusFilters[status]);

  return (
    <div className="flex gap-2">
      <button
        className={clsx({
          "cursor-pointer badge": true,
          "border-accent text-accent": allSelected
        })}
        onClick={() => selectAll()}
      >
        All
      </button>
      {
        gameStatuses.map(gameStatus => (
          <button
            key={gameStatus}
            className={clsx(
              statusFilters[gameStatus] ? gameStatusBadgeStyles[gameStatus] : "badge",
              "cursor-pointer"
            )}
            onClick={() => toggleStatusFilter(gameStatus)}
          >
            {GAME_STATUS_LABELS[gameStatus]}
          </button>
        ))
      }
    </div>
  )
}

export default StatusFilter;