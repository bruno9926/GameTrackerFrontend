import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { notificationService } from "../api/NotificationsService"
import { withErrorMessage } from "@shared/lib/error-messages"
import type { Notification } from "../model/Notification"

interface NotificationsState {
    list: Notification[],
    loading: boolean,
    error: string | null
}

const initialState: NotificationsState = {
    list: [],
    loading: false,
    error: null
}

export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", withErrorMessage(
    () => notificationService.fetchNotifications()
))

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchNotifications.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.list = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch notifications";
            })
    }
})

export default notificationsSlice.reducer;