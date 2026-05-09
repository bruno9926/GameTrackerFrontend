import { Skeleton } from '@shared/ui/chadcn/skeleton';
import type { Notification } from '../model/Notification';

type NotificationProps = Notification;

const INITIAL_COLORS = [
    'bg-avatar-1',
    'bg-avatar-2',
    'bg-avatar-3',
    'bg-avatar-4',
    'bg-avatar-5',
    'bg-avatar-6',
];

const getColorFromTitle = (title: string) => {
    const index = title.charCodeAt(0) % INITIAL_COLORS.length;
    return INITIAL_COLORS[index];
};

const NotificationItem = ({ title, message, image }: NotificationProps) => {
    return (
        <div className='flex flex-row items-center gap-3 p-2 hover:bg-border rounded-xl transition-colors cursor-pointer animation-duration'>
            <div className='relative rounded-md w-10 aspect-square overflow-hidden shrink-0'>
                {image
                    ? <img src={image} alt={title} className='w-full h-full object-cover' />
                    : <div className={`w-full h-full flex items-center justify-center text-primary-foreground font-semibold text-sm ${getColorFromTitle(title)}`}>
                        {title.charAt(0).toUpperCase()}
                    </div>
                }
            </div>
            <div className='flex flex-col'>
                <h3 className='text-md'>{title}</h3>
                <p className='text-subtitle text-xs'>{message}</p>
            </div>
        </div>
    )
}

export const NotificationItemSkeleton = () => (
    <div className="flex items-center gap-3 p-2">
        <Skeleton className="rounded-md w-10 aspect-square shrink-0" />
        <div className="flex flex-col flex-1 gap-2">
            <Skeleton className="w-28 h-3.5" />
            <Skeleton className="w-full max-w-52 h-3" />
        </div>
    </div>
)

export default NotificationItem;