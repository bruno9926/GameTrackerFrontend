import type { Friend } from '@features/user/model/Friend';
import { BsJoystick } from "react-icons/bs";
import { Skeleton } from "@shared/ui/chadcn/skeleton";

type FriendItemProps = {} & Omit<Friend, 'id'>;

const FriendItem = ({ name, avatar }: FriendItemProps) => {
    return (
        <div className="flex justify-between items-center p-2 cursor-pointer">
            <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className='relative'>
                    <div className="rounded-xl w-12 aspect-square overflow-hidden">
                        {avatar ? <img className="w-full h-full object-cover" src={avatar} alt={`${name}'s avatar`} /> : name.charAt(0).toUpperCase()}
                    </div>
                    <span className="block right-0 -bottom-1 absolute bg-green-500 rounded-full w-3.5 aspect-square" />
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