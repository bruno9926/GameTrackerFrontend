import GameListItem from './GameListItem';
import type {Game} from '../../types/Game'
//styles
import styles from './GameList.module.scss'
// data
import gameListData from '../../data/games.json'


const gameList: Array<Game> = gameListData as Array<Game>;

export const GameList = () => {
  return (
    <section className={`${styles['game-list-section']} dashboard-tile`}>
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
