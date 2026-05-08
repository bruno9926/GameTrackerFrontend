import AnimatedRoute from "../../../../pages/AnimatedRoute";
import GameItem from "../GameList/GameItem";
import { GameItemSkeleton } from "../GameList/GameCard";
import type { Game } from "../../model/Game";
import StatusFilter from "./StatusFilter";
import AddGameButton from "@shared/ui/Organisms/AddGamesButton/AddGamesButton";
import SortSelect, { type SortOption } from "./SortSelect";
import { AddGameModal } from "../GameModals";
import { anim } from "@shared/ui/Animations";
// hooks
import useGames from "../../hooks/useGames";
import useStatusFilter from "../../hooks/useStatusFilter";
import { useDebouncedInput } from "@shared/hooks/useDebouncedInput";
import { useEffect, useState } from "react";
import { Input } from "@shared/ui/chadcn/input";

const Games = () => {
  const { loading, error, games, fetchGames } = useGames();
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("more-recent");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { statusFilters, toggleStatusFilter, selectAll, filterByStatus } = useStatusFilter();

  // create a hash of the status filters to use as a key for the animated list
  const statusFiltersHash = Object.entries(statusFilters).map(([status, isActive]) => `${status}:${isActive}`).join(",");

  const { debouncedInput: debouncedSearch, waitingInput } = useDebouncedInput(searchText, {
    debounceTime: 500,
  });

  // filters
  const normalizedSearch = debouncedSearch.toLowerCase();
  const byName = (game: Game) => {
    if (!normalizedSearch) return true;
    return game.name.toLowerCase().includes(normalizedSearch)
  }
  // sort
  const sortGames = (a: Game, b: Game) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "more-recent":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "less-recent":
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      default:
        return 0;
    }
  }

  const visibleGames =
    filterByStatus([...games])
      .filter(byName)
      .sort(sortGames)

  useEffect(() => {
    fetchGames();
  }, []);

  const Loading = () => (
    <div className="games-grid">
      {Array.from({ length: 5 }).map((_, index) => (
        <GameItemSkeleton key={index} />
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) return <Loading />
    if (error) return <p>Error: {error}</p>
    if (waitingInput) return <p>Searching...</p>

    return (
      <>
        {visibleGames.length > 0 ? (
          <anim.FadeInUp
            key={`${debouncedSearch}-${statusFiltersHash}-${sortBy}`}
            className="games-grid">{
              visibleGames.map((game) =>
                <GameItem key={game.id} {...game} />
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
      </>
    )
  }

  return (
    <AnimatedRoute>
      <div className="page-padding header-safe-area desktop-x-padding">
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
          <div className="flex items-center gap-2 md:gap-4 py-4 w-full min-w-0 overflow-x-auto no-scrollbar">
            <StatusFilter statusFilters={statusFilters} toggleStatusFilter={toggleStatusFilter} selectAll={selectAll} />
          </div>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>
        <div className="mt-6 md:mt-0">
          {renderContent()}
        </div>
      </div>
      <AddGameModal
        isOpen={addModalOpen}
        close={() => setAddModalOpen(false)}
      />
    </AnimatedRoute>
  );
};

export default Games;
