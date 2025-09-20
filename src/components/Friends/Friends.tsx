// components
import FriendItem from './FriendItem';
// styles
import styles from './Friends.module.scss';
// data
import type {Friend} from '../../types/Friend';
import friendsData from '../../data/friends.json';

const friends = friendsData as Array<Friend>;

const Friends = () => {
  return (
    <section className={`${styles['friends-section']} dashboard-container`}>
        <h2>Friends</h2>
        <div className={styles['friends-list']}>
            {friends.map(friend => (
                <FriendItem
                    key={friend.id}
                    name={friend.name}
                    status={friend.status}
                    avatar={friend.avatar}
                    games={friend.games}
                />
            ))}
        </div>
    </section>
  )
}

export default Friends