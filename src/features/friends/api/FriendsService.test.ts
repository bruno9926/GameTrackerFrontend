import { describe, it, vi, expect } from "vitest";
import { friendsService } from "./FriendsService";
import { apiClient } from "@shared/api/apiClient";
import { friendFactory } from "@/test/factories/friend.factory";
import { friendRequestFactory } from "@/test/factories/friendRequest.factory";

vi.mock("@shared/api/apiClient", () => ({
    apiClient: vi.fn()
}));

const FRIENDS_URL = "http://test-api/friends"
const mockApiClient = vi.mocked(apiClient);

describe("FriendsService", () => {
    describe("fetch friends", () => {
        it("calls the correct endpoint", async () => {
            mockApiClient.mockResolvedValueOnce([]);

            await friendsService.fetchFriends();
            expect(mockApiClient).toHaveBeenCalledWith(FRIENDS_URL)
        })

        it("returns friends from the backend", async () => {
            const friends = [
                friendFactory({ id: "1", username: "link_hyrule" }),
                friendFactory({ id: "2", username: "masterchief117" }),
                friendFactory({ id: "3", username: "kratos_god" }),
            ]
            mockApiClient.mockResolvedValueOnce([...friends])

            const returnedFriends = await friendsService.fetchFriends();
            expect(returnedFriends).toHaveLength(friends.length);
            expect(returnedFriends.map(f => f.id)).toEqual(friends.map(f => f.id));
        })
    })

    describe("fetch friend requests", () => {
        it("calls the correct endpoint", async () => {
            mockApiClient.mockResolvedValueOnce([]);

            await friendsService.fetchFriendRequest();
            expect(apiClient).toHaveBeenCalledWith(FRIENDS_URL + '/requests');
        })

        it("returns friend requests from the backend", async () => {
            const friendRequests = [
                friendRequestFactory({ id: "req-1" }),
                friendRequestFactory({ id: "req-2" }),
                friendRequestFactory({ id: "req-3" }),
            ];
            mockApiClient.mockResolvedValueOnce([...friendRequests])

            const returnedRequests = await friendsService.fetchFriendRequest();
            expect(returnedRequests).toHaveLength(friendRequests.length);
            expect(returnedRequests.map(fr => fr.id)).toEqual(friendRequests.map(fr => fr.id));
        })
    })

    describe("send friend request", () => {
        it("calls the correct endpoint with the correct method and body", async () => {
            mockApiClient.mockResolvedValueOnce(undefined);

            const friendCode = "ABC123";
            await friendsService.sendFriendRequest(friendCode);

            expect(apiClient).toHaveBeenCalledWith(FRIENDS_URL + '/requests', { method: "POST", body: { friendCode }})
        })
    })

    describe("reject friend request", () => {
        it("calls the correct endpoint with the correct method", async () => {
            mockApiClient.mockResolvedValueOnce(undefined);

            const requestId = "req-1";
            await friendsService.rejectFriendRequest(requestId);

            expect(apiClient).toHaveBeenCalledWith(FRIENDS_URL + `/requests/${requestId}/reject`, { method: "PATCH" });
        })
    })

    describe("accept friend request", () => {
        it("calls the correct endpoint with the correct method", async () => {
            mockApiClient.mockResolvedValueOnce(undefined);

            const requestId = "req-1";
            await friendsService.acceptFriendRequest(requestId);

            expect(apiClient).toHaveBeenCalledWith(FRIENDS_URL + `/requests/${requestId}/accept`, { method: "PATCH" });
        })
    })

    describe("fetch friend", () => {
        it("calls the correct endpoint", async () => {
            const friend = friendFactory();
            mockApiClient.mockResolvedValueOnce(friend);

            await friendsService.fetchFriend(friend.id);

            expect(apiClient).toHaveBeenCalledWith(FRIENDS_URL + `/${friend.id}`);
        })

        it("returns the friend from the backend", async () => {
            const friend = friendFactory();
            mockApiClient.mockResolvedValueOnce(friend);

            const returnedFriend = await friendsService.fetchFriend(friend.id);

            expect(returnedFriend.id).toEqual(friend.id);
        })
    })

    describe("remove friend", () => {
        it("calls the correct endpoint with the correct method", async () => {
            mockApiClient.mockResolvedValueOnce(undefined);

            const friend = friendFactory();
            await friendsService.removeFriend(friend.id);

            expect(apiClient).toHaveBeenCalledWith(FRIENDS_URL + `/${friend.id}`, { method: "DELETE" });
        })
    })
})