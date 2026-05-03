import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Friend } from "@features/user/model/Friend";
import type { FriendRequest } from "@features/user/model/FriendRequest";
import { friendsService } from "../api/FriendsService";
import requestsData from "../ui/requests.json";

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

export const fetchFriends = createAsyncThunk("friends/fetchFriends", async () => {
    return friendsService.fetchFriends();
});

export const fetchRequests = createAsyncThunk("friends/fetchRequests", async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return (requestsData as FriendRequest[]).filter(r => r.status === "pending");
});

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        acceptRequest: (state, action: PayloadAction<number>) => {
            const request = state.requests.find(r => r.id === action.payload);
            if (request) request.status = "accepted";
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFriends.pending, state => {
                state.friendsLoading = true;
                state.friendsError = null;
            })
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.friendsLoading = false;
                state.friends = action.payload;
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.friendsLoading = false;
                state.friendsError = action.error.message ?? "Failed to load friends";
            })
            .addCase(fetchRequests.pending, state => {
                state.requestsLoading = true;
                state.requestsError = null;
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.requestsLoading = false;
                state.requests = action.payload;
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.requestsLoading = false;
                state.requestsError = action.error.message ?? "Failed to load requests";
            });
    },
});

export const { acceptRequest } = friendsSlice.actions;
export default friendsSlice.reducer;
