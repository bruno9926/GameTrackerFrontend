import { useState } from "react";
import { authService } from "../../services/AuthService";

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentials: { email: string; password: string }) => {

        setLoading(true);
        setError(null);

        try {
            const { token } = await authService.login({
                email: credentials.email,
                password: credentials.password
            });
            authService.setToken(token);
        } catch(e: any) {
            setError(e?.message || "Logion failed")
            throw e;
        } finally {
            setLoading(false);
        }
        
    }
    return { login, error, loading };
}

export default useLogin;