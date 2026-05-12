import { configureStore } from "@reduxjs/toolkit";
import { gamesReducer } from "@/features/games/state";
import { friendsReducer } from "@/features/friends/state";
import { userReducer } from "@/features/user/state";
import { authReducer } from "@/features/auth/state";

export const createTestStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            games: gamesReducer,
            friends: friendsReducer,
            user: userReducer,
            auth: authReducer,
        },
        preloadedState
    })
}