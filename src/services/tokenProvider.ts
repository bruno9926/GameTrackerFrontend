class TokenProvider {
    private static ACCESS_TOKEN_KEY = "authToken";
    private static REFRESH_TOKEN_KEY = "refreshToken";

    static getAccessToken(): string | null {
        return localStorage.getItem(TokenProvider.ACCESS_TOKEN_KEY);
    }

    static setAccessToken(token: string): void {
        localStorage.setItem(TokenProvider.ACCESS_TOKEN_KEY, token);
    }

    static clearAccessToken(): void {
        localStorage.removeItem(TokenProvider.ACCESS_TOKEN_KEY);
    }

    static getRefreshToken(): string | null {
        return localStorage.getItem(TokenProvider.REFRESH_TOKEN_KEY);
    }

    static setRefreshToken(token: string): void {
        localStorage.setItem(TokenProvider.REFRESH_TOKEN_KEY, token);
    }

    static clearRefreshToken(): void {
        localStorage.removeItem(TokenProvider.REFRESH_TOKEN_KEY);
    }

    static clearTokens(): void {
        TokenProvider.clearAccessToken();
        TokenProvider.clearRefreshToken();
    }

    static setTokens({ token, refreshToken }: { token: string; refreshToken: string }): void {
        TokenProvider.setAccessToken(token);
        TokenProvider.setRefreshToken(refreshToken);
    }
}

export default TokenProvider;