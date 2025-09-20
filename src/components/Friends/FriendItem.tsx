import type {Friend} from '../../types/Friend'

type FriendItemProps = {} & Friend;

import styles from './FriendItem.module.scss'

const FriendItem = ({ name, status, avatar, games }: FriendItemProps) => {
    return (
        <div className={styles['friend-item']}>
            <div className={styles['friend-info']}>
                <div className={styles['friend-avatar']}>
                    {avatar ? <img src={avatar} alt={`${name}'s avatar`} /> : name.charAt(0).toUpperCase()}
                </div>
                <span className={`${styles['friend-status']} ${styles[status]}`} />
                <span className={styles['friend-name']}>{name}</span>
            </div>
            <div className={styles['friends-games']}>
                <span>Gaming with you</span>
                <div className={styles['friends-games-list']}>
                    {/* Here you can map through the games if needed */}
                    {games.map((game, index) => (
                        <span key={index} className={styles['friends-game']} title={game} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default FriendItem