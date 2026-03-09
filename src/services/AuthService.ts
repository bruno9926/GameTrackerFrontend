const API_URL = import.meta.env.VITE_API_URL + "/auth";

class AuthService {
    private static instance: AuthService;

    private static defaultHeaders = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
    };

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async register(body: RegisterBody): Promise<void> {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: AuthService.defaultHeaders,
            body: JSON.stringify(body),
        });
        return this.handleResponse<void>(res);
    }

    async login(body: LoginBody): Promise<TokenResponse> {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: AuthService.defaultHeaders,
            body: JSON.stringify(body),
        });
        return this.handleResponse<TokenResponse>(res);
    }

    private async handleResponse<T>(res: Response): Promise<T> {
        if (!res.ok) {
            let message = res.statusText;
            const data = await res.json();
            if (data?.message) {
                message = Array.isArray(data.message)
                    ? data.message.join(", ")
                    : data.message;
            }
            console.log(data)
            throw new Error(message);
        }
        return res.json();
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