import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/AuthService";
// reducers
import gamesReducer from './gamesSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const preloadedState = {
    auth: {
        token: authService.getToken()
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