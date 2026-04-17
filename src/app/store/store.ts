import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../../features/auth/api/AuthService";
// reducers
import { gamesReducer } from '@features/games/state';
import { userReducer } from '@features/user/state';
import { authReducer } from '@features/auth/state';

const { token, refreshToken } = authService.getAuth();
const preloadedState = {
    auth: {
        token: token,
        refreshToken: refreshToken
    }
}

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        user: userReducer,
        auth: authReducer
    },
    devTools: true,
    preloadedState
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;