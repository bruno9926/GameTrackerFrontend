import type { Friend } from '@features/user/model/Friend';
import { BsJoystick } from "react-icons/bs";
import { Skeleton } from "@shared/ui/chadcn/skeleton";
import { Link } from "react-router";
import { userRoutes } from "@routes/routes";
import UserAvatar from './UserAvatar/UserAvatar';

type FriendItemProps = Friend;

const FriendItem = ({ id, name, username, avatarUrl, status = "online" }: FriendItemProps) => {
    return (
        <Link
            to={`${userRoutes.FRIENDS}/${id}`}
            className={`flex justify-between items-center p-2 rounded-lg hover:bg-card transition-colors ${status === "offline" ? "opacity-60" : ""}`}
        >
            <div className="flex flex-1 items-center gap-4 min-w-0">
                <UserAvatar name={name} avatarUrl={avatarUrl} status={status}/>
                <div className='flex flex-col flex-1 min-w-0'>
                    <div className="flex items-baseline gap-2 min-w-0">
                        <h3 className="text-lg">{name}</h3>
                        <span className="text-subtitle text-sm truncate">@{username}</span>
                    </div>
                    <div className='flex gap-2 text-subtitle'>
                        <BsJoystick />
                        <span className='text-sm truncate'>
                            Playing League of Legends
                        </span>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export const FriendListItemSkeleton = () => (
    <div className="flex justify-between items-center p-2">
        <div className="flex flex-1 items-center gap-4 min-w-0">
            <div className="relative shrink-0">
                <Skeleton className="rounded-xl w-12 aspect-square" />
            </div>
            <div className="flex flex-col flex-1 gap-2 min-w-0">
                <Skeleton className="w-30 h-5" />
                <Skeleton className="w-full max-w-50 h-4" />
            </div>
        </div>
    </div>
);

export default FriendItem