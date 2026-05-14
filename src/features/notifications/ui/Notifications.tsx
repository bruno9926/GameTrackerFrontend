import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/chadcn/popover";
import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import useNotifications from "../hooks/useNotifications";
import NotificationItem, { NotificationItemSkeleton } from "./NotificationItem";

const NotificationTrigger = ({ hasNotifications }: { hasNotifications: boolean }) => (
    <div className="relative">
        {hasNotifications && <div className="top-0.5 right-0.5 absolute bg-notification rounded-full w-2 aspect-square" />}
        <IoIosNotifications />
    </div>
)

const Notifications = () => {

    const { error, loading, notifications, fetchNotifications, markNotificationAsRead } = useNotifications();
    const hasUnread = notifications.some(n => !n.read);

    const [open, setOpen] = useState(false);

    const states = {
        loading: (
            <div className="flex flex-col">
                {Array.from({ length: 4 }).map((_, i) => <NotificationItemSkeleton key={i} />)}
            </div>
        ),
        error: <ErrorMessage message={error!} retryAction={fetchNotifications} />,
        empty: (
            <div className="flex flex-col items-center py-6 text-muted-foreground">
                <span className="opacity-40 grayscale text-2xl">🦗</span>
                <p className="text-xs">No notifications</p>
            </div>
        ),
        success: (
            <div className="flex flex-col">
                {notifications.map(notification => (
                    <NotificationItem key={notification.id} {...notification} onRead={() => markNotificationAsRead(notification.id)} />
                ))}
            </div>
        ),
    };

    const haveNotifications = notifications.length > 0;
    const activeState = loading ? 'loading' : error ? 'error' : haveNotifications ? 'success' : 'empty';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="navbar-icon">
                    <NotificationTrigger hasNotifications={hasUnread} />
                </button>
            </PopoverTrigger>
            <PopoverContent align="center" className="bg-card p-2 w-80 max-h-100 overflow-auto no-scrollbar">
                {states[activeState]}
            </PopoverContent>
        </Popover>
    )
}

export default Notifications