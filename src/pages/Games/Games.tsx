import AnimatedRoute from "../AnimatedRoute";
import GameListItem, {
  GameListItemSkeleton,
} from "../../components/GameList/GameListItem";
import styles from "./Games.module.scss";
import { GoPlus } from "react-icons/go";
import Button from "../../components/Atoms/Button/Button";
import ListBar from "./ListBar";
import type { Game } from "../../types/Game";

// hooks
import useGames from "../../hooks/useGames";
import { useEffect, useState } from "react";

const Games = () => {
  const { loading, error, games, fetchGames } = useGames();

  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (!searchText) {
      setFilteredGames(games);
      return;
    }

    const filtered = games.filter((game) =>
      game.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [games, searchText]);

  const List = () => (
    <div className={styles["game-list"]}>
      {filteredGames.length > 0 ? (
        filteredGames.map((game) => (
          <GameListItem
            key={game.id}
            id={game.id}
            name={game.name}
            status={game.status}
          />
        ))
      ) : (
        <p>
          No results fund for: <b>{searchText}</b>
        </p>
      )}
    </div>
  );

  const Loading = () => (
    <div className={styles["game-list"]}>
      {Array.from({ length: 5 }).map((_, index) => (
        <GameListItemSkeleton key={index} />
      ))}
    </div>
  );

  const getRenderedContent = () => {
    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    return <List />;
  };

  return (
    <AnimatedRoute>
      <div className={styles.header}>
        <h1>Games</h1>
        <Button variant="secondary">
          <GoPlus /> Add Game
        </Button>
      </div>
      <ListBar searchText={searchText} setSearchText={setSearchText} />
      {getRenderedContent()}
    </AnimatedRoute>
  );
};

export default Games;
