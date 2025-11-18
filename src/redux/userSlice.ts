import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    user?: {
        id: string,
        name: string,
        email: string,
        profilePicture?: string
    }
}

const initialState: UserState = {
    user: {
        id: "123",
        name: "Bruno",
        email: "david.lopez9926@gmail.com",
        profilePicture: "https://www.pockettactics.com/wp-content/sites/pockettactics/2023/09/BOTW-Link.jpg"
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
});

export default userSlice.reducer;