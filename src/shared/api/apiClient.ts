import { publicRoutes } from "@routes/routes";
import TokenProvider from "@shared/api/TokenProvider";
import type { ApiError } from "./ApiError";

type ApiOptions<B> = Omit<RequestInit, 'body'> & {
    auth?: boolean,
    body?: B
}

type Tokens = {
    token: string;
    refreshToken: string;
}

let refreshPromise: Promise<void> | null = null;

const API_URL = import.meta.env.VITE_API_URL;

const refresh = async (refreshToken: string): Promise<Tokens> => {
    const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
    });

    if (!res.ok) throw new Error("Refresh failed");
    return res.json();
}

export const apiClient = async <T, B = unknown>(
    url: string,
    options: ApiOptions<B> = {}
): Promise<T> => {
    // global state
    const { auth = true, body, ...fetchOptions } = options;

    // inner utilities
    const makeRequest = async (): Promise<Response> => {
        const token = auth ? TokenProvider.getAccessToken() : null;

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
        const storedRefreshToken = TokenProvider.getRefreshToken();

        if (!storedRefreshToken) {
            throw new Error("Session expired. Please log in again.");
        }

        if (!refreshPromise) {
            refreshPromise = refresh(storedRefreshToken)
                .then(({ token, refreshToken }) => {
                    TokenProvider.setTokens({ token, refreshToken });
                })
                .finally(() => {
                    refreshPromise = null;
                });
        }

        return refreshPromise;
    }

    const forceLogout = () => {
        TokenProvider.clearTokens();
        window.location.href = publicRoutes.SIGNUP;
    }

    // const getErrorMessage = async (res: Response) => {
    //     let message = res.statusText;
    //     try {
    //         const data = await res.json();
    //         if (data?.message) {
    //             message = Array.isArray(data.message) ?
    //                 data.message.join(", ") :
    //                 data.message;
    //         } else {
    //             message = "Unknown error";
    //         }
    //     } catch { }
    //     return message;
    // }

    const parseApiError = async (res: Response): Promise<ApiError> => {
        try {
            const clone = res.clone();
            const data = await clone.json();
            console.log(data)
            return {
                message: data?.message ?? 'Unknown error',
                code: data?.code ?? 'UNKNOWN_ERROR',
                status: res.status,
            };
        } catch {
            return {
                message: 'Unknown error',
                code: 'UNKNOWN_ERROR',
                status: res.status,
            };
        }
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
        //let message = await getErrorMessage(res);
        //throw new Error(message);
        const error = await parseApiError(res);
        throw error;
    }

    const data = await res.json();
    return data;
}