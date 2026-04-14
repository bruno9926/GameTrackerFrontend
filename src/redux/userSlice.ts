import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/User";

export interface UserState {
    user: User | null
}

// const initialState: UserState = {
//     user: {
//         id: "123",
//         name: "Bruno",
//         email: "david.lopez9926@gmail.com",
//         profilePicture: "https://www.pockettactics.com/wp-content/sites/pockettactics/2023/09/BOTW-Link.jpg"
//     }
// }

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
        clearUser(state) {
            state.user = null
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;