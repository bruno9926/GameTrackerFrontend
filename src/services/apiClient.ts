import { publicRoutes } from "../routes/routes";
import { authService } from "./AuthService"

type ApiOptions<B> = Omit<RequestInit, 'body'> & {
    auth?: boolean,
    body?: B
}

let refreshPromise: Promise<void> | null = null;

export const apiClient = async <T, B = unknown>(
    url: string,
    options: ApiOptions<B> = {}
): Promise<T> => {
    // global state
    const { auth = true, body, ...fetchOptions } = options;

    // inner utilities
    const makeRequest = async (): Promise<Response> => {
        const token = auth ? authService.getToken() : null;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            ...(fetchOptions.headers || {}),
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };

        return fetch(url, {
            ...fetchOptions,
            body: body ? JSON.stringify(body) : undefined,
            headers
        })
    }

    const handleRefresh = async () => {
        const storedRefreshToken = authService.getRefreshToken();

        if (!storedRefreshToken) {
            throw new Error("Session expired. Please log in again.");
        }

        if (!refreshPromise) {
            refreshPromise = authService
                .refresh(storedRefreshToken)
                .then(({ token, refreshToken }) => {
                    authService.setAuth({ token, refreshToken });
                })
                .finally(() => {
                    refreshPromise = null;
                });
        }

        return refreshPromise;
    }

    const forceLogout = () => {
        authService.clearAuth();
        window.location.href = publicRoutes.LOGIN;
    }

    const getErrorMessage = async (res: Response) => {
        let message = res.statusText;
        try {
            const data = await res.json();
            if (data?.message) {
                message = Array.isArray(data.message) ?
                    data.message.join(", ") :
                    data.message;
            }
        } catch { }
        return message;
    }

    // execute request with automatic token refresh
    let res = await makeRequest();
    if (res.status === 401 && auth) {
        try {
            await handleRefresh();
            res = await makeRequest();
        } catch (e) {
            forceLogout();
            throw e;
        }
    }

    if (!res.ok) {
        let message = await getErrorMessage(res);
        throw new Error(message);
    }

    return res.json();
}