import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../api/AuthService";
import { getErrorMessage } from "@shared/lib/error-messages";

export interface AuthState {
    token: string | null,
    refreshToken: string | null,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    loading: false,
    error: null
}

type AuthPayload = { token: string; refreshToken: string };

export const loginUser = createAsyncThunk("auth/loginUser",
    async (credentials: { email: string; password: string }) => {
        try {
            const { token, refreshToken } = await authService.login(credentials);
            authService.setAuth({ token, refreshToken });
            return { token, refreshToken };
        } catch (e) {
            authService.clearAuth();
            throw new Error(getErrorMessage(e));
        }
    }
);

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
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
    }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
