import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@app/store/store";
import { fetchNotifications as fetchNotificationsThunk } from "../state/notificationsSlice";
import { useEffect } from "react";

const useNotifications = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, list: notifications } = useSelector((state: RootState) => state.notifications);

    const fetchNotifications = () => {
        dispatch(fetchNotificationsThunk());
    }

    useEffect(() => {
        fetchNotifications();
    }, [])

    return {
        error,
        loading,
        notifications,
        fetchNotifications
    }
}

export default useNotifications;