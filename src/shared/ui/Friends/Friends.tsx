// components
import FriendItem from './FriendItem';
import { userRoutes } from '@app/routes/routes';
import { useNavigate } from 'react-router';
// data
import type { Friend } from '@features/user/model/Friend';
import friendsData from './friends.json';

const friends = friendsData as Array<Friend>;

const Friends = () => {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col gap-5 dashboard-tile-content">
            <div className='flex justify-between items-center'>
                <h2>Online Friends</h2>
                <span className='text-subtitle badge'>3 Online</span>
            </div>
            <div className="gap-3 mb-3 card">
                {friends.map(friend => (
                    <FriendItem
                        key={friend.id}
                        name={friend.name}
                        status={friend.status}
                        avatar={friend.avatar}
                        games={friend.games}
                    />
                ))}
                <button
                    onClick={() => navigate(userRoutes.GAMES)}
                    className='hover:bg-brand active:bg-brand mt-3 p-3 border hover:border-transparent active:border-transparent rounded-xl w-full text-subtitle hover:text-white active:text-white transition-colors cursor-pointer animation-duration'>
                    View all friends
                </button>
            </div>
        </section>
    )
}

export default Friends