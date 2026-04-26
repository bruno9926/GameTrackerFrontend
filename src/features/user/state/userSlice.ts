import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserInfo } from "@features/user/model/User";

export interface UserState {
    user: User | null,
    loading: boolean
}

const initialState: UserState = {
    user: null,
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        setUserInfo(state, action: PayloadAction<UserInfo>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        },
        clearUser(state) {
            state.user = null
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
});

export const { setUser, setUserInfo, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;