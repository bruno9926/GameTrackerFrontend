import { useEffect, useState } from "react";
import GameListItem, { GameListItemSkeleton } from "./GameListItem";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { AddGameModal } from "../GameModals";
import { NavLink } from "react-router";
import { userRoutes as routes } from "@routes/routes";
import type { Game } from "@features/games/model/Game";
import AddGameButton from "@shared/ui/Organisms/AddGamesButton/AddGamesButton";
// hooks
import useGames from "../../hooks/useGames";

const GameList = () => {
  const { loading, error, games, fetchGames } = useGames();

  useEffect(() => {
    fetchGames();
  }, []);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const List = () => (
    <div className="games-grid">
      {games.slice(0,5).map((game: Game) => (
        <GameListItem
          key={game.id}
          {...game}
        />
      ))}
    </div>
  );

  const Loading = () => (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <GameListItemSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <NavLink to={routes.GAMES}>
            <h2>Recent Games</h2>
          </NavLink>
          <AddGameButton onClick={() => setAddModalOpen(true)}/>
        </div>
        {
          loading ? <Loading /> :
          error ? <ErrorMessage message={error} retryAction={fetchGames} /> :
          <List />
        }
      </section>
      <AddGameModal
        isOpen={addModalOpen}
        close={() => setAddModalOpen(false)}
      />
    </>
  );
};

export default GameList;
