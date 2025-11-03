import AnimatedRoute from "../AnimatedRoute";
import GameListItem, {
  GameListItemSkeleton,
} from "../../components/GameList/GameListItem";
import styles from "./Games.module.scss";
// hooks
import useGames from "../../hooks/useGames";
import { useCallback, useEffect } from "react";

const Games = () => {
  const { loading, error, games, fetchGames } = useGames();

  useEffect(() => {
    fetchGames();
  }, []);

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

  const getRenderedContent = useCallback(() => {
    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    return <List />;
  }, [loading, error, games]);

  return (
    <AnimatedRoute>
      <h1>Games</h1>
      {getRenderedContent()}
    </AnimatedRoute>
  );
};

export default Games;
