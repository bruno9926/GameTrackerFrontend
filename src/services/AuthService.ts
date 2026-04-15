import type { User } from "../types/User";
import { apiClient } from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/auth";
class AuthService {
    private static instance: AuthService;

    private constructor() {}

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
}

export default AuthService;

export const authService = AuthService.getInstance();