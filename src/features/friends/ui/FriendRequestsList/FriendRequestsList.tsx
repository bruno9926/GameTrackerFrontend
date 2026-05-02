import FriendRequestItem, { FriendRequestItemSkeleton } from '../FriendRequestItem/FriendRequestItem';
import { useFriendRequests } from '../../hook/useFriendRequests';
import { anim } from '@shared/ui/Animations';
import ErrorMessage from '@shared/ui/Atoms/ErrorMessage/ErrorMessage';

const FriendRequestsList = ({ search = "" }: { search?: string }) => {
    const { requests, loading, error, fetchRequests } = useFriendRequests();

    if (loading) return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => <FriendRequestItemSkeleton key={i} />)}
        </div>
    );

    if (error) return <ErrorMessage message={error} retryAction={fetchRequests} />;

    if (requests.length === 0) return <EmptyRequestsList />;

    const filtered = search
        ? requests.filter(r => r.sender.name.toLowerCase().includes(search.toLowerCase()))
        : requests;

    if (filtered.length === 0) return (
        <div className="empty-box">
            <p className="font-medium text-subtitle text-base text-center">No requests found</p>
            <p className="mt-1 text-subtitle text-xs">Try a different name</p>
        </div>
    );

    return (
        <anim.FadeInUp key={search} className="flex flex-col gap-3">
            {filtered.map((request) => (
                <FriendRequestItem key={request.id} {...request} />
            ))}
        </anim.FadeInUp>
    );
};

const EmptyRequestsList = () => (
    <div className="empty-box">
        <p className="font-medium text-subtitle text-base text-center">No pending requests</p>
        <p className="mt-1 text-subtitle text-xs">Share your code to connect with friends</p>
    </div>
);

export default FriendRequestsList;
