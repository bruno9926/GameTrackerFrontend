import { apiClient } from "@shared/api/apiClient";
import type { Friend } from "@features/user/model/Friend";

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
}

export default FriendsService;
export const friendsService = FriendsService.getInstance();
