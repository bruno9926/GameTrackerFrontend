import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@app/store/store";
import { fetchNotifications as fetchNotificationsThunk, markNotificationRead } from "../state/notificationsSlice";
import { useEffect } from "react";

const useNotifications = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, list: notifications } = useSelector((state: RootState) => state.notifications);

    const fetchNotifications = () => {
        dispatch(fetchNotificationsThunk());
    }

    const markNotificationAsRead = (id: string) => {
        dispatch(markNotificationRead(id));
    }

    useEffect(() => {
        fetchNotifications();
    }, [])

    return {
        error,
        loading,
        notifications,
        fetchNotifications,
        markNotificationAsRead,
    }
}

export default useNotifications;