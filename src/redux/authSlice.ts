import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    token: string | null,
    refreshToken: string | null
}

const initialState: AuthState = {
    token: null,
    refreshToken: null
}

type AuthPayload = Required<AuthState>;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthPayload>) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        clearAuth: (state) => {
            state.token = null;
            state.refreshToken = null;
        }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;