import styles from './FriendItem.module.scss'
import type {Friend} from '../../types/Friend'

type FriendItemProps = {} & Omit<Friend, 'id'>;

const gameImages: Record<string, string> = {
    "Hollow Knight: Silksong": "/games/hollow-knight-silksong.jpg",
    "Final Fantasy 7 Rebirth": "/games/final-fantasy-7-rebirth.jpg",
    "God of War Ragnarök": "/games/god-of-war-ragnarok.jpg",
    "The Legend of Zelda: Tears of the Kingdom": "/games/zelda-tears-of-the-kingdom.jpg",
    "Doom Eternal": "/src/assets/doom.png",
    "The Legend of Zelda: Ocarina of Time": "/src/assets/zelda-ocarina.jpg",
    "League of Legends": "/src/assets/lol.jpg",
    "Bioshock": "/src/assets/bioshock.jpg",
};

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
                <span>Playing with you</span>
                <div className={styles['friends-games-list']}>
                    {games.map((game, index) => (
                        <div key={index} className={styles['friends-game']} title={game}>
                            <img src={gameImages[game]} alt={game} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FriendItem