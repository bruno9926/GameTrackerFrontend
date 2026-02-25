import { useEffect, useState } from "react";
import Button from "../Atoms/Button/Button";
import GameListItem, { GameListItemSkeleton } from "./GameListItem";
import ErrorMessage from "../Atoms/ErrorMessage/ErrorMessage";
import { AddGameModal } from "../GameModals";
import { NavLink } from "react-router";
import { userRoutes as routes } from "../../routes/routes";
//styles
import styles from "./GameList.module.scss";
import { GoPlus } from "react-icons/go";
// hooks
import useGames from "../../hooks/useGames";

const GameList = () => {
  const { loading, error, games, fetchGames } = useGames();

  useEffect(() => {
    fetchGames();
  }, []);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const List = () => (
    <div className={styles["game-list"]}>
      {games.map((game) => (
        <GameListItem
          key={game.id}
          id={game.id}
          name={game.name}
          status={game.status}
        />
      ))}
    </div>
  );

  const Loading = () => (
    <div className={styles["game-list"]}>
      {Array.from({ length: 5 }).map((_, index) => (
        <GameListItemSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <>
      <section className={`${styles["game-list-section"]} dashboard-tile-content`}>
        <div className={styles.header}>
          <NavLink to={routes.GAMES}>
            <h2>Game List</h2>
          </NavLink>
          <Button variant="secondary" onClick={() => setAddModalOpen(true)}>
            <GoPlus /> Add Game
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} retryAction={fetchGames} />
        ) : (
          <List />
        )}
      </section>
      <AddGameModal
        isOpen={addModalOpen}
        close={() => setAddModalOpen(false)}
      />
    </>
  );
};

export default GameList;
