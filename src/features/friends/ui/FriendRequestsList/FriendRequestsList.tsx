import { useEffect } from 'react';
import FriendRequestItem, { FriendRequestItemSkeleton } from '../FriendRequestItem/FriendRequestItem';
import { useFriendRequests } from '../../hook/useFriendRequests';
import { anim } from '@shared/ui/Animations';
import ErrorMessage from '@shared/ui/Atoms/ErrorMessage/ErrorMessage';

const FriendRequestsList = ({ search = "" }: { search?: string }) => {
    const { requests, loading, error, fetch } = useFriendRequests();

    useEffect(() => {
        fetch();
    }, []);

    if (loading) return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => <FriendRequestItemSkeleton key={i} />)}
        </div>
    );

    if (error) return <ErrorMessage message={error} retryAction={fetch} />;

    if (requests.length === 0) return (
        <EmptyRequestsList title='No pending requests' message='Share your code to connect with friends'/>
    );

    const filtered = search
        ? requests.filter(r => r.sender.name.toLowerCase().includes(search.toLowerCase()))
        : requests;

    if (filtered.length === 0) return (
        <EmptyRequestsList title='No requests requests' message='Try a different name'/>
    );

    return (
        <anim.FadeInUp key={search} className="flex flex-col gap-3">
            {filtered.map((request) => (
                <FriendRequestItem key={request.id} {...request} />
            ))}
        </anim.FadeInUp>
    );
};

const EmptyRequestsList = ({ title, message }: { title: string, message: string}) => (
    <div className="empty-box">
        <p className="font-medium text-subtitle text-base text-center">{title}</p>
        <p className="mt-1 text-subtitle text-xs text-center">{message}</p>
    </div>
);

export default FriendRequestsList;
