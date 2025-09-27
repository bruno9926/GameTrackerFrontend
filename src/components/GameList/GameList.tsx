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

async function fetchGames(): Promise<Game[]> {
  const res = await fetch('http://localhost:3000/games/');
  const json = await res.json();
  if (!Array.isArray(json)) throw new Error("Invalid response");
  return json as Game[];
}

const GameList = () => {

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const loadGameList = async () => {
    try {
      setLoading(true);
      const games: Game[] = await fetchGames();
      setGames(games);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGameList();
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
            error ? <ErrorMessage message={error} retryAction={loadGameList} /> :
              <List games={games} />
        }
      </section>

    </>
  )
}

const AddGame = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <Modal isOpen={open} title='Add a game' close={() => setOpen(false)} positiveAction={() => setOpen(false)}>
        <form action=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}
        >
          <Input label='name'/>
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
