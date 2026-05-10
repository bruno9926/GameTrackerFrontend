import { gamesReducer } from "@/features/games/state";
import { configureStore } from "@reduxjs/toolkit";

export const createTestStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            games: gamesReducer
        },
        preloadedState
    })
}