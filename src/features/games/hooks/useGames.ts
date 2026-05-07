import type { GameToCreate, GameToUpdate } from "../model/Game";
// redux
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store/store";
import { clearError, deleteGame, fetchGames, submitGame, updateGame } from "../state";

const useGames = () => {
  const games = useSelector((state: RootState) => state.games.list);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error} = useSelector((state: RootState) => state.games);

  return {
    loading,
    error,
    games,
    clearError: () => dispatch(clearError()),
    fetchGames: 
      () => dispatch(fetchGames()),
    submitGame:
      (game: GameToCreate) => dispatch(submitGame(game)).unwrap(),
    deleteGame:
      (id: string) => dispatch(deleteGame(id)).unwrap(),
    updateGame:
      (game: GameToUpdate) => dispatch(updateGame(game)).unwrap()
  };
};

export default useGames;