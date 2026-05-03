import { apiClient } from "@shared/api/apiClient";
import type { Friend } from "@features/user/model/Friend";
import type { FriendRequest } from "@features/user/model/FriendRequest";

const API_URL = import.meta.env.VITE_API_URL + "/friends";

class FriendsService {
  private static instance: FriendsService;

  private constructor() {}

  static getInstance(): FriendsService {
    if (!FriendsService.instance) {
      FriendsService.instance = new FriendsService();
    }
    return FriendsService.instance;
  }

  async fetchFriends(): Promise<Friend[]> {
    const friends: Friend[] = await apiClient(API_URL);
    // temporal fix, we dont have status from the server
    return friends.map(f => ({...f, status: "online"}))
  }

  async fetchFriendRequest(): Promise<FriendRequest[]> {
    // the server returns only the pending requests
    return apiClient(API_URL + "/requests")
  }

  async sendFriendRequest(receiverId: string): Promise<void> {
    return apiClient(`${API_URL}/requests`, { method: "POST", body: { receiverId } })
  }

  async rejectFriendRequest(requestId: string): Promise<void> {
    return apiClient(`${API_URL}/requests/${requestId}/reject`, { method: "PATCH" })
  }

  async acceptFriendRequest(requestId: string): Promise<void> {
    return apiClient(`${API_URL}/requests/${requestId}/accept`, { method: "PATCH" })
  }
}

export default FriendsService;
export const friendsService = FriendsService.getInstance();
