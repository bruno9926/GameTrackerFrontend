import { useState } from "react";
import AuthService from "../api/AuthService";

type userToRegister = {
    username: string;
    email: string;
    password: string;
}

const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const register = async (user: userToRegister) => {
        setLoading(true);
        setError(null);

        try {
            await AuthService.getInstance().register({
                name: user.username,
                email: user.email,
                password: user.password
            })
        } catch (e: unknown) {
            setError((e as Error)?.message || "Registration failed");
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return {
        register,
        error,
        loading
    };
}

export default useRegister;