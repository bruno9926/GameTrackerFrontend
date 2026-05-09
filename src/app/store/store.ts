import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../../features/auth/api/AuthService";
// reducers
import { gamesReducer } from '@features/games/state';
import { userReducer } from '@features/user/state';
import { authReducer } from '@features/auth/state';
import { friendsReducer } from '@features/friends/state';
import { notificationsReducer } from "@features/notifications/state";

const { token, refreshToken } = authService.getAuth();
const preloadedState = {
    auth: {
        token: token,
        refreshToken: refreshToken,
        loading: false,
        error: null
    }
}

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        user: userReducer,
        auth: authReducer,
        friends: friendsReducer,
        notifications: notificationsReducer
    },
    devTools: true,
    preloadedState
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;