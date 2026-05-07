import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { User, UserInfo } from "@features/user/model/User";
import { withErrorMessage } from "@shared/lib/error-messages";
import { authService } from "@features/auth/api/AuthService";
import { userService } from "../api/UserService";

export interface UserState {
    user: User | null,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
};

export const fetchUser = createAsyncThunk("user/fetchUser", withErrorMessage(
    () => authService.getMe()
));

export const updateUserInfo = createAsyncThunk("user/updateUserInfo", withErrorMessage(
    (userInfoChanges: Partial<UserInfo>) => userService.setUserInfo(userInfoChanges)
));

export const uploadAvatar = createAsyncThunk("user/uploadAvatar", withErrorMessage(
    (file: File) => userService.updateAvatar(file)
));

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                if (state.user) state.user = { ...state.user, ...action.payload };
                state.loading = false;
                state.error = null;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                if (state.user) state.user = { ...state.user, ...action.payload };
                state.loading = false;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(fetchUser.pending, updateUserInfo.pending, uploadAvatar.pending),
                state => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchUser.rejected, updateUserInfo.rejected, uploadAvatar.rejected),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message ?? null;
                }
            )
    }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;