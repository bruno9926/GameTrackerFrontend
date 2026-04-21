import AnimatedRoute from "../../../../pages/AnimatedRoute";
import GameListItem, {
  GameListItemSkeleton,
} from "../GameList/GameListItem";
import type { Game } from "../../model/Game";
import StatusFilter, { type StatusOption } from "./StatusFilter";
import AddGameButton from "@shared/ui/Organisms/AddGamesButton/AddGamesButton";
import SortSelect, { type SortOption } from "./SortSelect";
import { anim } from "@shared/ui/Animations";
// hooks
import useGames from "../../hooks/useGames";
import { useEffect, useState } from "react";
import { Input } from "@shared/ui/chadcn/input";

const Games = () => {
  const { loading, error, games, fetchGames } = useGames();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusOption>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  // filters
  const normalizedSearch = searchText.toLowerCase();
  const byName = (game: Game) => {
    if (!normalizedSearch) return true;
    return game.name.toLowerCase().includes(normalizedSearch)
  }
  const byStatus = (game: Game) => {
    if (statusFilter == null) return true;
    return game.status === statusFilter
  };

  // sort
  const sortGames = (a: Game, b: Game) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  }

  const visibleGames =
    [...games]
      .filter(byName).filter(byStatus)
      .sort(sortGames)

  useEffect(() => {
    fetchGames();
  }, []);

  const Loading = () => (
    <div className="games-grid">
      {Array.from({ length: 5 }).map((_, index) => (
        <GameListItemSkeleton key={index} />
      ))}
    </div>
  );

  const handleStatusChange = (status: StatusOption) => {
    setStatusFilter(current => {
      if (current === status) return null;
      return status;
    })
  }

  const renderContent = () => {
    if (loading) return <Loading />
    if (error) return <p>Error: {error}</p>
    return (
      <div className="mt-8 md:mt-0">
        {visibleGames.length > 0 ? (
          <anim.FadeInUp
            key={`${searchText}-${statusFilter}-${sortBy}`}
            className="games-grid">{
              visibleGames.map((game) =>
                <GameListItem key={game.id} {...game} />
              )}
          </anim.FadeInUp>
        ) :
          <p>{
            searchText ?
              <span>No results found for: <b>{searchText}</b></span>
              : <span>No games found</span>
          }
          </p>
        }
      </div>
    )
  }

  return (
    <AnimatedRoute>
      <div className="page-padding">
        <div className="flex flex-row gap-4 w-full">
          <AddGameButton />
          <Input
            className="flex-1"
            type="text"
            placeholder="Search games..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {/* filtering and sorting */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
          <StatusFilter statusFilter={statusFilter} setStatusFilter={handleStatusChange} />
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>
        {renderContent()}
      </div>
    </AnimatedRoute>
  );
};

export default Games;
