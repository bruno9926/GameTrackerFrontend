import { useEffect } from "react";
import { socketService, type FriendStatusEvent } from "../api/SocketService";
import { useDispatch } from "react-redux";
import { setFriendStatus } from "../state";
import type { AppDispatch } from "@/app/store/store";

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

        socketService.connect();
        socketService.onFriendStatus(changeFriendStatus);

        return () => {
            socketService.offFriendStatus(changeFriendStatus);
            socketService.disconnect();
        }
    }, [token])
}

export default useStatusSocket;