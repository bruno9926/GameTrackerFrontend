import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Friend } from "@features/user/model/Friend";
import type { FriendRequest } from "@features/user/model/FriendRequest";
import { friendsService } from "../api/FriendsService";

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
    return friendsService.fetchFriendRequest();
});

export const acceptRequest = createAsyncThunk("friends/acceptRequest", async (requestId: string) => {
    return friendsService.acceptFriendRequest(requestId)
});

export const rejectRequest = createAsyncThunk("friends/rejectRequest", async (requestId: string) => {
    return friendsService.rejectFriendRequest(requestId)
});

export const sendRequest = createAsyncThunk("friends/sendRequest", async (receiverId: string) => {
    return friendsService.sendFriendRequest(receiverId)
});

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
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
            })
            .addCase(acceptRequest.fulfilled, (state, action) => {
                const request = state.requests.find(r => r.id === action.meta.arg);
                if (request) request.status = "accepted";
            })
            .addCase(rejectRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(r => r.id !== action.meta.arg);
            });
    },
});

export default friendsSlice.reducer;
