import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from './gamesSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        user: userReducer
    },
    devTools: true
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;