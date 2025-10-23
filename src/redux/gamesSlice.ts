import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "../types/Game";

export interface GamesState{
    list: Game[]
}

const initialState: GamesState = {
    list: []
}

const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<Game[]>) => {
            state.list = action.payload
        }
    }
});

export const { setGames } = gamesSlice.actions;
export default gamesSlice.reducer;