import { useEffect, useState } from 'react';
import Button from '../Atoms/Button/Button';
import GameListItem from './GameListItem';
import ErrorMessage from '../Atoms/ErrorMessage/ErrorMessage';
//styles
import styles from './GameList.module.scss';
import { GoPlus } from "react-icons/go";
// data
import type { Game } from '../../types/Game';
// hooks
import useGames from '../../hooks/useGames';
import AddGameModal from '../AddGameModal/AddGameModal';


const GameList = () => {

  const {
    loading,
    error,
    games,
    fetchGames
  } = useGames();


  useEffect(() => {
    fetchGames();
  }, [])

  const [open, setOpen] = useState(false);

  return (
    <>
      <section className={`${styles['game-list-section']} dashboard-container`}>
        <div className={styles.header}>
          <h2>Game List</h2>
          <Button variant='secondary' onClick={() => setOpen(true)}><GoPlus /> Add Game</Button>

        </div>
        {
          loading ? <Loading /> :
            error ? <ErrorMessage message={error} retryAction={fetchGames} /> :
              <List games={games} />
        }
      </section>
      <AddGameModal open={open} setOpen={setOpen} refreshAction={() => fetchGames()} />
    </>
  )
}

const List = ({ games }: { games: Game[] }) => (
  <div className={styles['game-list']}>
    {
      games.map(game => (
        <GameListItem
          key={game.id}
          name={game.name}
          status={game.status}
        />
      ))}
  </div>
)

const Loading = () => (
  <span>Loading...</span>
)

export default GameList;
