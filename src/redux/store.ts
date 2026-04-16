import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/AuthService";
// reducers
import gamesReducer from './gamesSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

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