import { useEffect } from "react";
import { socketService, type FriendStatusEvent } from "../api/SocketService";
import { useDispatch } from "react-redux";
import { setFriendStatus } from "../state";
import type { AppDispatch } from "@/app/store/store";
import type { Notification } from "@features/notifications/model/Notification";
import { addNotification } from "@features/notifications/state/notificationsSlice";

const useStatusSocket = (token: string | null) => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(!token) return;

        const changeFriendStatus = (event: FriendStatusEvent) => {
            dispatch(setFriendStatus({
                friendId: event.userId,
                status: event.status
            }))
        }

        const handleNotificationCreated = (notification: Notification) => {
            dispatch(addNotification(notification));
        }

        socketService.connect();
        socketService.onFriendStatus(changeFriendStatus);
        socketService.onNotificationCreated(handleNotificationCreated);

        return () => {
            socketService.offFriendStatus(changeFriendStatus);
            socketService.offNotificationCreated(handleNotificationCreated);
            socketService.disconnect();
        }
    }, [token])
}

export default useStatusSocket;