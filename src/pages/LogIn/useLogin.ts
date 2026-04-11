import { useState } from "react";
import AuthService from "../../services/AuthService";

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentials: { email: string; password: string }) => {

        setLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const { token } = await AuthService.getInstance().login({
                email: credentials.email,
                password: credentials.password
            });
            localStorage.setItem("authToken", token);
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