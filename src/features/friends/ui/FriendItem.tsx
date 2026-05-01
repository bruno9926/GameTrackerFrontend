import type { Friend } from '@features/user/model/Friend';
import { BsJoystick } from "react-icons/bs";
import { Skeleton } from "@shared/ui/chadcn/skeleton";

type FriendItemProps = {} & Omit<Friend, 'id'>;

const statusIndicator: Record<Friend['status'], string> = {
    online: 'bg-online',
    busy: 'bg-busy',
    offline: 'bg-background border-2 border-offline',
};

const FriendItem = ({ name, avatar, status }: FriendItemProps) => {
    return (
        <div className={`flex justify-between items-center p-2 cursor-pointer ${status === "offline" ? "opacity-60" : ""}`}>
            <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className='relative'>
                    <div className="rounded-xl w-12 aspect-square overflow-hidden">
                        {avatar
                            ? <img className="w-full h-full object-cover" src={avatar} alt={`${name}'s avatar`} />
                            : <div className="flex justify-center items-center bg-primary w-full h-full font-bold text-primary-foreground">{name.charAt(0).toUpperCase()}</div>
                        }
                    </div>
                    <span className={`block right-0 -bottom-1 absolute rounded-full w-3.5 aspect-square outline-3 outline-background ${statusIndicator[status]}`} />
                </div>
                <div className='flex flex-col flex-1 min-w-0'>
                    <span className="text-lg">{name}</span>
                    <div className='flex gap-2 text-subtitle'>
                        <BsJoystick />
                        <span className='text-sm truncate'>
                            Playing League of Legends
                        </span>
                    </div>
                </div>

            </div>
        </div>
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