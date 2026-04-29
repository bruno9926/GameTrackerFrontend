import AnimatedRoute from "../../../../pages/AnimatedRoute";
import GameListItem, {
  GameListItemSkeleton,
} from "../GameList/GameListItem";
import type { Game } from "../../model/Game";
import StatusFilter, { type StatusOption } from "./StatusFilter";
import AddGameButton from "@shared/ui/Organisms/AddGamesButton/AddGamesButton";
import SortSelect, { type SortOption } from "./SortSelect";
import { AddGameModal } from "../GameModals";
import { anim } from "@shared/ui/Animations";
// hooks
import useGames from "../../hooks/useGames";
import { useDebouncedInput } from "@shared/hooks/useDebouncedInput";
import { useEffect, useState } from "react";
import { Input } from "@shared/ui/chadcn/input";

const Games = () => {
  const { loading, error, games, fetchGames } = useGames();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusOption>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  const { debouncedInput: debouncedSearch, waitingInput } = useDebouncedInput(searchText, {
    debounceTime: 500,
  });

  // filters
  const normalizedSearch = debouncedSearch.toLowerCase();
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
    if (waitingInput) return <p>Searching...</p>
    return (
      <div className="mt-6 md:mt-0">
        {visibleGames.length > 0 ? (
          <anim.FadeInUp
            key={`${debouncedSearch}-${statusFilter}-${sortBy}`}
            className="games-grid">{
              visibleGames.map((game) =>
                <GameListItem key={game.id} {...game} />
              )}
          </anim.FadeInUp>
        ) :
          <p>{
            debouncedSearch ?
              <span>No results found for: <b>{debouncedSearch}</b></span>
              : <span>No games found</span>
          }
          </p>
        }
      </div>
    )
  }

  return (
    <AnimatedRoute>
      <div className="page-padding header-safe-area">
        {/*page title just for mobile */}
        <h1 className="md:hidden mb-5 font-bold text-title text-4xl">Games</h1>
        <div className="flex flex-row gap-4 w-full">
          <AddGameButton onClick={() => setAddModalOpen(true)} />
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
      <AddGameModal
        isOpen={addModalOpen}
        close={() => setAddModalOpen(false)}
      />
    </AnimatedRoute>
  );
};

export default Games;
