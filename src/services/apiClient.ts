import { publicRoutes } from "../routes/routes";
import { authService } from "./AuthService"

type ApiOptions<B> = Omit<RequestInit, 'body'> & {
    auth?: boolean,
    body?: B
}

export const apiClient = async <T, B = unknown>(
    url: string,
    options: ApiOptions<B> = {}
): Promise<T> => {
    const { auth = true, body, ...fetchOptions } = options;
    const token = auth ? authService.getToken() : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(fetchOptions.headers || {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    const res = await fetch(url, {
        ...fetchOptions,
        body: body ? JSON.stringify(body) : undefined,
        headers
    })

    if (!res.ok) {
        if(res.status === 401 && auth) {
            //invalid or expired token
            authService.clearToken();
            window.location.href = publicRoutes.LOGIN;
        }
        let message = res.statusText;

        try {
            const data = await res.json();
            if (data?.message) {
                message = Array.isArray(data.message) ?
                    data.message.join(", ") :
                    data.message;
            }
        } catch { }

        throw new Error(message);
    }

    return res.json();
}