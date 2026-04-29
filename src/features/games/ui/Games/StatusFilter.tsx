import clsx from "clsx";
import { GAME_STATUS_LABELS, gameStatuses } from "../../model/Game";
import type { GameStatus } from "../../model/Game";

export type StatusOption = GameStatus | null;

const gameStatusBadgeStyles: Record<GameStatus, string> = {
  playing: "game-status-badge-playing",
  completed: "game-status-badge-completed",
  wishlist: "game-status-badge-wishlist",
  paused: "game-status-badge-paused",
}


interface StatusFilterProps { statusFilter: GameStatus | null, setStatusFilter: (status: GameStatus | null) => void }
const StatusFilter: React.FC<StatusFilterProps> = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="flex gap-2 md:gap-4 py-4 w-full min-w-0 overflow-x-auto no-scrollbar">
      <button
        className={clsx({
          "cursor-pointer badge": true,
          "border-brand text-brand": statusFilter === null
        })}
        onClick={() => setStatusFilter(null)}
      >
        All
      </button>
      {
        gameStatuses.map(gameStatus => (
          <button
            key={gameStatus}
            className={clsx(
              statusFilter === gameStatus ? gameStatusBadgeStyles[gameStatus] : "badge",
              "cursor-pointer"
            )}
            onClick={() => setStatusFilter(gameStatus)}
          >
            {GAME_STATUS_LABELS[gameStatus]}
          </button>
        ))
      }
    </div>
  )
}

export default StatusFilter;