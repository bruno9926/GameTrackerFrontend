import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserInfo } from "@features/user/model/User";

export interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
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
        }
    }
});

export const { setUser, setUserInfo, clearUser } = userSlice.actions;
export default userSlice.reducer;