import { useEffect, useState } from "react";
import Button from "../Atoms/Button/Button";
import GameListItem from "./GameListItem";
import ErrorMessage from "../Atoms/ErrorMessage/ErrorMessage";
import { AddGameModal } from "../GameModals";
//styles
import styles from "./GameList.module.scss";
import { GoPlus } from "react-icons/go";
// hooks
import useGames from "../../hooks/useGames";

const GameList = () => {
  const { loading, error, games, fetchGames, deleteGame, updateGame } =
    useGames();

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
          deleteGame={() => deleteGame(game.id)}
          updateGame={async (game) => await updateGame(game)}
        />
      ))}
    </div>
  );

  return (
    <>
      <section className={`${styles["game-list-section"]} dashboard-container`}>
        <div className={styles.header}>
          <h2>Game List</h2>
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
        onSubmit={() => fetchGames()}
      />
    </>
  );
};

const Loading = () => <span>Loading...</span>;

export default GameList;
