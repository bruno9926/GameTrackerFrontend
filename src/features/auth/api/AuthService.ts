import type { User } from "../model/User";
import { apiClient } from "@shared/api/apiClient";
import TokenProvider from "@shared/api/TokenProvider";

const API_URL = import.meta.env.VITE_API_URL + "/auth";
class AuthService {
    private static instance: AuthService;

    private constructor() { }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async register(body: RegisterBody): Promise<void> {
        return apiClient(`${API_URL}/register`, {
            method: "POST",
            body,
            auth: false
        });
    }

    async login(body: LoginBody): Promise<TokenResponse> {
        return apiClient(`${API_URL}/login`, {
            method: "POST",
            body,
            auth: false
        });
    }

    async getMe(): Promise<User> {
        return apiClient(`${API_URL}/me`);
    }

    // token management
    getAuth(): { token: string | null; refreshToken: string | null } {
        return {
            token: TokenProvider.getAccessToken(),
            refreshToken: TokenProvider.getRefreshToken()
        }
    }
    setAuth({ token, refreshToken }: { token: string; refreshToken: string }): void {
        TokenProvider.setTokens({ token, refreshToken });
    }
    clearAuth(): void {
        TokenProvider.clearTokens();
    }

}

type RegisterBody = {
    name: string;
    email: string;
    password: string;
}

type LoginBody = {
    email: string;
    password: string;
}

type TokenResponse = {
    token: string;
    refreshToken: string;
}

export default AuthService;

export const authService = AuthService.getInstance();