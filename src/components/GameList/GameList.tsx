import { useEffect, useState } from 'react';
import Button from '../Atoms/Button/Button';
import GameListItem from './GameListItem';
//styles
import styles from './GameList.module.scss';
import { VscError } from "react-icons/vsc";
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
          <Button onClick={() => setOpen(true)}>Add</Button>

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

const ErrorMessage = ({ message, retryAction }: { message: string, retryAction: () => void }) => (
  <div className={styles['error-message']}>
    <div className={styles['error-title']}>
      <VscError />
      <span>Error</span>
    </div>
    <div>
      <span className={styles.error}>{message}, </span>
      <button onClick={() => retryAction()}>
        Retry
      </button>
    </div>
  </div>
)

export default GameList;
