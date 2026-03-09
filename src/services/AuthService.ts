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

export default AuthService;