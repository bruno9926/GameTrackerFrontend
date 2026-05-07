import { createAsyncThunk, createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { Game, GameToCreate, GameToUpdate } from "../model/Game";
import { gameService } from "../api/GameService";
import { withErrorMessage } from "@shared/lib/error-messages";

export interface GamesState {
    list: Game[],
    loading: boolean,
    error: string | null
}

const initialState: GamesState = {
    list: [],
    loading: false,
    error: null
}

export const fetchGames = createAsyncThunk("games/fetchGames", withErrorMessage(
    () => gameService.fetchGames()
))

export const submitGame = createAsyncThunk("games/submitGame", withErrorMessage(
    (game: GameToCreate) => gameService.postGame(game)
))

export const deleteGame = createAsyncThunk("games/deleteGame", withErrorMessage(
    (id: string) => gameService.deleteGame(id)
))

export const updateGame = createAsyncThunk("games/updateGame", withErrorMessage(
    (game: GameToUpdate) => gameService.updateGame(game)
))

const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        clearError: state => {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                isAnyOf(fetchGames.fulfilled, submitGame.fulfilled, deleteGame.fulfilled, updateGame.fulfilled),
                (state, action) => {
                    state.list = action.payload;
                    state.loading = false;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchGames.pending, submitGame.pending, deleteGame.pending, updateGame.pending),
                state => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchGames.rejected, submitGame.rejected, deleteGame.rejected, updateGame.rejected),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message ?? null;
                }
            )
    }
});

export const { clearError } = gamesSlice.actions;
export default gamesSlice.reducer;