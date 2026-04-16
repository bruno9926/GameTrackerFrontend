import type { User } from "../types/User";
import { apiClient } from "./apiClient";

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

    async refresh(refreshToken: string): Promise<TokenResponse> {
        return apiClient(`${API_URL}/refresh`, {
            method: "POST",
            body: { refreshToken },
            auth: false
        });
    }

    async getMe(): Promise<User> {
        return apiClient(`${API_URL}/me`);
    }

    // token management
    private static TOKEN_KEY = "authToken";

    getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(AuthService.TOKEN_KEY, token);
    }

    clearToken(): void {
        localStorage.removeItem(AuthService.TOKEN_KEY);
    }

    // refresh token management
    private static REFRESH_TOKEN_KEY = "refreshToken";

    getRefreshToken(): string | null {
        return localStorage.getItem(AuthService.REFRESH_TOKEN_KEY);
    }

    setRefreshToken(token: string): void {
        localStorage.setItem(AuthService.REFRESH_TOKEN_KEY, token);
    }

    clearRefreshToken(): void {
        localStorage.removeItem(AuthService.REFRESH_TOKEN_KEY);
    }

    setAuth({ token, refreshToken }: { token: string; refreshToken: string }): void {
        this.setToken(token);
        this.setRefreshToken(refreshToken);
    }

    clearAuth(): void {
        this.clearToken();
        this.clearRefreshToken();
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

export type TokenResponse = {
    token: string;
    refreshToken: string;
}

export default AuthService;

export const authService = AuthService.getInstance();