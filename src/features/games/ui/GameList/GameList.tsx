import { useEffect, useState } from "react";
import Button from "@shared/ui/Atoms/Button/Button";
import GameListItem, { GameListItemSkeleton } from "./GameListItem";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { AddGameModal } from "../GameModals";
import { NavLink } from "react-router";
import { userRoutes as routes } from "@routes/routes";
import { GoPlus } from "react-icons/go";
// hooks
import useGames from "../../hooks/useGames";
import type { Game } from "@features/games/model/Game";

const GameList = () => {
  const { loading, error, games, fetchGames } = useGames();

  useEffect(() => {
    fetchGames();
  }, []);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const List = () => (
    <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.slice(0,4).map((game: Game) => (
        <GameListItem
          key={game.id}
          id={game.id}
          name={game.name}
          status={game.status}
          coverUrl={game.coverUrl}
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
          <Button variant="secondary"className="flex flex-row items-center gap-2" onClick={() => setAddModalOpen(true)}>
            <GoPlus /> Add Game
          </Button>
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
