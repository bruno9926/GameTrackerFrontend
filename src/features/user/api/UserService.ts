import type { User, UserInfo } from "../model/User";
import { apiClient } from "@shared/api/apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/users";

type PasswordChangeRequest = {
    currentPassword: string,
    newPassword: string
}

class UserService {
    private static instance: UserService;

    private constructor() { }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async setUserInfo(body: Partial<UserInfo>): Promise<User> {
        return apiClient(`${API_URL}/me`, {
            method: "PATCH",
            body
        });
    }

    async changePassword(body: PasswordChangeRequest) {
        return apiClient(`${API_URL}/password`, {
            method: "PATCH",
            body
        })
    }
}

export default UserService;

export const userService = UserService.getInstance();
