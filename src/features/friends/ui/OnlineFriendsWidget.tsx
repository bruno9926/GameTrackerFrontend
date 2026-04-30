// components
import FriendItem, { FriendListItemSkeleton } from './FriendItem';
import { userRoutes } from '@app/routes/routes';
import { useNavigate } from 'react-router';
import { useFriends } from '../hook/useFriends';

const Friends = () => {
    const navigate = useNavigate();

    const { onlineFriends, loading, error} = useFriends();

    const states = {
        loading: (
            <div className="flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, i) => <FriendListItemSkeleton key={i} />)}
            </div>
        ),
        error: (error && <div className="p-2 text-destructive text-xs">{error}</div>),
        empty: <EmptyFriendsList />,
        success: (
            <div className="flex flex-col gap-3">
                {onlineFriends.map(({ id, ...data }) => (
                    <FriendItem key={id} {...data} />
                ))}
            </div>
        ),
    };

    const activeState = loading ? 'loading' : error ? 'error' : onlineFriends.length === 0 ? 'empty' : 'success';

    return (
        <section className="flex flex-col gap-5 dashboard-tile-content">
            <div className='flex justify-between items-center'>
                <h2>Online Friends</h2>
                <span className='text-subtitle badge'>{onlineFriends.length} Online</span>
            </div>
            <div className="gap-3 mb-3 card">
                {states[activeState]}
                <button
                    onClick={() => navigate(userRoutes.FRIENDS)}
                    className='hover:bg-accent active:bg-accent mt-3 p-3 border hover:border-transparent active:border-transparent rounded-xl w-full text-subtitle hover:text-white active:text-white transition-colors cursor-pointer animation-duration'>
                    View all friends
                </button>
            </div>
        </section>
    )
}

const EmptyFriendsList = () => (
    <div className="flex flex-col justify-center items-center px-4 py-8 border-2 border-border border-dashed rounded-xl">
        <span className="opacity-80 mb-2 text-2xl">😶‍🌫️</span>
        <p className="font-medium text-subtitle text-sm text-center">
            All quiet for now...
        </p>
        <p className="mt-1 text-subtitle text-xxs">
            Your online friends will appear here
        </p>
    </div>
);

export default Friends