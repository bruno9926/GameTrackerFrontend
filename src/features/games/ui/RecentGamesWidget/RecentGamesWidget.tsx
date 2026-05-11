import { useEffect, useState } from "react";
import GameItem from "../GameItem";
import { GameItemSkeleton } from "../GameCard";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { AddGameModal } from "../GameModals";
import { NavLink } from "react-router";
import { userRoutes as routes } from "@routes/routes";
import AddGameButton from "@shared/ui/Organisms/AddGamesButton/AddGamesButton";
// hooks
import useGames from "../../hooks/useGames";

const RecentGamesWidget = () => {
  const { loading, error, games, fetchGames } = useGames();

  useEffect(() => {
    fetchGames();
  }, []);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const recentGames = [...games]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const states = {
    loading: (
      <div className="games-grid">
        {Array.from({ length: 5 }).map((_, i) => <GameItemSkeleton key={i} />)}
      </div>
    ),
    error: (error && <ErrorMessage message={error} retryAction={fetchGames} />),
    empty: <EmptyRecentGames />,
    success: (
      <div className="games-grid">
        {recentGames.map((game) => <GameItem key={game.id} {...game} />)}
      </div>
    ),
  };

  const activeState = loading ? 'loading' : error ? 'error' : games.length === 0 ? 'empty' : 'success';

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <NavLink to={routes.GAMES}>
            <h2>Recent Games</h2>
          </NavLink>
          <AddGameButton onClick={() => setAddModalOpen(true)} />
        </div>
        {states[activeState]}
      </section>
      <AddGameModal
        isOpen={addModalOpen}
        close={() => setAddModalOpen(false)}
      />
    </>
  );
};

const EmptyRecentGames = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-card/20 border-2 border-border/80 border-dashed rounded-xl h-36 md:h-75">
      <div className="flex flex-col items-center gap-2 text-subtitle/60">
        <span className="opacity-50 grayscale text-4xl">🎮</span>
        <p className="font-medium text-sm md:text-base">
          Your games will show up here
        </p>
      </div>
    </div>
  );
};

export default RecentGamesWidget;
