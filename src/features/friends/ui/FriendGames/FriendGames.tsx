import { useState } from "react";
import clsx from "clsx";
import type { Friend } from "@features/user/model/Friend";
import type { Game } from "@features/games/model/Game";
import useStatusFilter from "@features/games/hooks/useStatusFilter";
import StatusFilter from "@features/games/ui/Games/StatusFilter";
import FriendGameItem from "@features/games/ui/GameList/FriendGameItem";
import { anim } from "@shared/ui/Animations";

interface FriendGamesProps {
  friend: Friend;
  gamesInCommon: Game[];
}

const FriendGames = ({ friend, gamesInCommon }: FriendGamesProps) => {
  const firstName = friend.name.split(' ')[0];
  const [showInCommon, setShowInCommon] = useState(false);

  const { statusFilters, toggleStatusFilter, selectAll, filterByStatus } = useStatusFilter();

  const inCommonTitleIds = new Set(gamesInCommon.map(g => g.gameTitleId));
  const visibleGames = filterByStatus(friend.games ?? [])
    .filter(game => !showInCommon || inCommonTitleIds.has(game.gameTitleId));

  const filtersKey = `${Object.entries(statusFilters).map(([s, a]) => `${s}:${a}`).join(",")}-${showInCommon}`;

  return (
    <section className="mt-4 md:mt-6">
      <h2>Games {firstName} is tracking</h2>
      <div className="flex items-center gap-2 md:gap-4 py-4 w-full min-w-0 overflow-x-auto no-scrollbar">
        <button
          className={clsx({
            "cursor-pointer badge": true,
            "border-accent text-accent": showInCommon
          })}
          onClick={() => setShowInCommon(v => !v)}
        >
          In Common
        </button>
        <StatusFilter statusFilters={statusFilters} toggleStatusFilter={toggleStatusFilter} selectAll={selectAll} />
      </div>

      <div className="mt-2 md:mt-4">
        {friend.games && friend.games.length > 0 ? (
          visibleGames.length > 0 ? (
            <anim.FadeInUp key={filtersKey} className="games-grid">
              {visibleGames.map((game) =>
                <FriendGameItem key={game.id} {...game} />
              )}
            </anim.FadeInUp>
          ) : (
            <div className="empty-box">
              <p className="font-medium text-subtitle text-base text-center">No games match the selected filters</p>
            </div>
          )
        ) : (
          <div className="empty-box">
            <span className="opacity-80 mb-2 text-2xl">🎮</span>
            <p className="font-medium text-subtitle text-base text-center">{firstName} isn't tracking any games yet</p>
            <p className="mt-1 text-subtitle text-xs">Check back later</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FriendGames;
