import type {Game} from '../../types/Game'
// styles
import styles from './GameListItem.module.scss'

type GameListItemProps = {} & Pick<Game, 'name' | 'status'>

const GameListItem = ({ name, status }: GameListItemProps) => {
  return (
    <div className={styles['game-list-item']}>
        <p>{name}</p>
        <div className={styles['game-status'] + ' ' + styles[status]}>
            {status}
        </div>
    </div>
  )
}

export default GameListItem