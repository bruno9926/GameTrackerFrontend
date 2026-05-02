import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Friend } from "@features/user/model/Friend";
import type { FriendRequest } from "@features/user/model/FriendRequest";

export interface FriendsState {
    friends: Friend[];
    friendsLoading: boolean;
    friendsError: string | null;
    requests: FriendRequest[];
    requestsLoading: boolean;
    requestsError: string | null;
}

const initialState: FriendsState = {
    friends: [],
    friendsLoading: false,
    friendsError: null,
    requests: [],
    requestsLoading: false,
    requestsError: null,
};

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        setFriends: (state, action: PayloadAction<Friend[]>) => {
            state.friends = action.payload;
        },
        setFriendsLoading: (state, action: PayloadAction<boolean>) => {
            state.friendsLoading = action.payload;
        },
        setFriendsError: (state, action: PayloadAction<string | null>) => {
            state.friendsError = action.payload;
        },
        setRequests: (state, action: PayloadAction<FriendRequest[]>) => {
            state.requests = action.payload;
        },
        setRequestsLoading: (state, action: PayloadAction<boolean>) => {
            state.requestsLoading = action.payload;
        },
        setRequestsError: (state, action: PayloadAction<string | null>) => {
            state.requestsError = action.payload;
        },
        acceptRequest: (state, action: PayloadAction<number>) => {
            const request = state.requests.find(r => r.id === action.payload);
            if (request) request.status = 'accepted';
        },
    },
});

export const {
    setFriends, setFriendsLoading, setFriendsError,
    setRequests, setRequestsLoading, setRequestsError,
    acceptRequest,
} = friendsSlice.actions;
export default friendsSlice.reducer;
