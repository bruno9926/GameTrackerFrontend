import type { UserInfo } from "../model/User";
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

    async setUserInfo(body: Partial<UserInfo>): Promise<UserInfo> {
        return apiClient(`${API_URL}/me`, {
            method: "PATCH",
            body
        });
    }

    async changePassword(body: PasswordChangeRequest): Promise<void> {
        return apiClient(`${API_URL}/password`, {
            method: "PATCH",
            body
        })
    }

    async updateAvatar(file: File): Promise<UserInfo> {
        const formData = new FormData();
        formData.append('file', file);

        return apiClient(`${API_URL}/avatar`, {
            method: "POST",
            body: formData
        })
    }
}

export default UserService;

export const userService = UserService.getInstance();
