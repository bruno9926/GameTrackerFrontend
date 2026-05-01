import { useState } from 'react';
import type { FriendRequest } from '@features/user/model/FriendRequest';
import { Skeleton } from '@shared/ui/chadcn/skeleton';
import Button from '@shared/ui/Atoms/Button/Button';
import UserAvatar from '../UserAvatar/UserAvatar';
import { cn } from '@shared/lib/utils';

type FriendRequestItemProps = Omit<FriendRequest, 'status' | 'id'>;

const FriendRequestItem = ({ sender }: FriendRequestItemProps) => {
    const [accepted, setAccepted] = useState(false);

    return (
        <article className={cn('flex flex-col gap-3 card', accepted && 'border-online/30')}>
            {accepted ? (
                <div className="flex items-center gap-3">
                    <UserAvatar name={sender.name} avatarUrl={sender.avatarUrl} />
                    <span className="font-semibold text-online">Now friends with {sender.name}!</span>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3">
                        <UserAvatar name={sender.name} avatarUrl={sender.avatarUrl} />
                        <div className="flex flex-col min-w-0">
                            <h3 className="font-semibold text-title truncate">{sender.name}</h3>
                            <span className="text-subtitle text-sm">@{sender.username}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" fullWidth>Ignore</Button>
                        <Button variant="primary" size="sm" fullWidth onClick={() => setAccepted(true)}>Accept</Button>
                    </div>
                </>
            )}
        </article>
    );
};

export const FriendRequestItemSkeleton = () => (
    <div className="flex flex-col gap-3 card">
        <div className="flex items-center gap-3">
            <Skeleton className="rounded-xl w-12 aspect-square shrink-0" />
            <div className="flex flex-col flex-1 gap-2 min-w-0">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-24 h-4" />
            </div>
        </div>
        <div className="flex gap-2">
            <Skeleton className="flex-1 rounded-xl h-8" />
            <Skeleton className="flex-1 rounded-xl h-8" />
        </div>
    </div>
);

export default FriendRequestItem;
