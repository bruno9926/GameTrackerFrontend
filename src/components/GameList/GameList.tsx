import GameListItem from './GameListItem';
//styles
import styles from './GameList.module.scss'
// data
import gameListData from '../../data/games.json';
import type {Game} from '../../types/Game';


const gameList: Array<Game> = gameListData as Array<Game>;

const GameList = () => {
  return (
    <section className={`${styles['game-list-section']} dashboard-container`}>
        <h2>Game List</h2>
        <div className={styles['game-list']}>
            {gameList.map(game => (
                <GameListItem
                    key={game.id}
                    name={game.name}
                    status={game.status}
                />
            ))}
        </div>
    </section>
  )
}

export default GameList;
