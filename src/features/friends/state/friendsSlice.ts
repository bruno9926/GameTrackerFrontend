import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Friend } from "@features/user/model/Friend";
import type { FriendRequest } from "@features/user/model/FriendRequest";
import { friendsService } from "../api/FriendsService";
import { withErrorMessage } from "@shared/lib/error-messages";

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

export const fetchFriends = createAsyncThunk("friends/fetchFriends", withErrorMessage(() => friendsService.fetchFriends()));
export const fetchRequests = createAsyncThunk("friends/fetchRequests", withErrorMessage(() => friendsService.fetchFriendRequest()));
export const acceptRequest = createAsyncThunk("friends/acceptRequest", withErrorMessage((id: string) => friendsService.acceptFriendRequest(id)));
export const rejectRequest = createAsyncThunk("friends/rejectRequest", withErrorMessage((id: string) => friendsService.rejectFriendRequest(id)));
export const sendRequest = createAsyncThunk("friends/sendRequest", withErrorMessage((id: string) => friendsService.sendFriendRequest(id)));
export const removeFriend = createAsyncThunk("friends/removeFriend", withErrorMessage((id: string) => friendsService.removeFriend(id)));

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
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.friends = state.friends.filter(f => f.id !== action.meta.arg);
            });
    },
});

export default friendsSlice.reducer;
