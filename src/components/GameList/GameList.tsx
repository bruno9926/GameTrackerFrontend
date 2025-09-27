import { useEffect, useState } from 'react';
import Modal from '../Organisms/Modal/Modal';
import Button from '../Atoms/Button/Button';
import Input from '../Atoms/Input/Input';
import GameListItem from './GameListItem';
//styles
import styles from './GameList.module.scss';
import { VscError } from "react-icons/vsc";
// data
import type { Game } from '../../types/Game';
// hooks
import useGames from '../../hooks/useGames';


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

  return (
    <>
      <section className={`${styles['game-list-section']} dashboard-container`}>
        <div className={styles.header}>
          <h2>Game List</h2>
          <AddGame />
        </div>
        {
          loading ? <Loading /> :
            error ? <ErrorMessage message={error} retryAction={fetchGames} /> :
              <List games={games} />
        }
      </section>

    </>
  )
}

const AddGame = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const {
    submitGame
  } = useGames();

  let validatedStatus = status as 'playing' | 'completed' | 'wishlist' | 'paused'

  const positiveAction = async () => {
    let game = {
        name, status: validatedStatus
      }
    await submitGame(game)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <Modal isOpen={open} title='Add a game' close={() => setOpen(false)} positiveAction={positiveAction}>
        <form action=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}
        >
          <Input label='name' value={name} onChange={(e) => setName(e.target.value)} />
          <Input label='status' value={status} onChange={(e) => setStatus(e.target.value)} />
        </form>
      </Modal>
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
