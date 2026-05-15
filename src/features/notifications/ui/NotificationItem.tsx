import { Skeleton } from '@shared/ui/chadcn/skeleton';
import { NotificationType, type Notification } from '../model/Notification';
import { useNavigate } from 'react-router';
import { userRoutes } from '@routes/routes';

type NotificationProps = Notification & { onRead: () => void };

const notificationRoute: Record<NotificationType, string> = {
    [NotificationType.FRIEND_REQUEST]: userRoutes.FRIENDS,
};

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

const NotificationItem = ({ title, message, image, read, type, onRead }: NotificationProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        onRead();
        navigate(notificationRoute[type]);
    };

    return (
        <div onClick={handleClick} className='flex flex-row items-center gap-3 p-2 hover:bg-border rounded-lg transition-colors cursor-pointer animation-duration'>
            <div className='relative rounded-md w-10 aspect-square overflow-hidden shrink-0'>
                {image
                    ? <img src={image} alt={title} className='w-full h-full object-cover' />
                    : <div className={`w-full h-full flex items-center justify-center text-primary-foreground font-semibold text-sm ${getColorFromTitle(title)}`}>
                        {title.charAt(0).toUpperCase()}
                    </div>
                }
            </div>
            <div className='flex flex-col flex-1'>
                <h3 className='text-md'>{title}</h3>
                <p className='text-subtitle text-xs'>{message}</p>
            </div>
            {!read && <div className='bg-notification rounded-full w-2 aspect-square shrink-0' />}
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