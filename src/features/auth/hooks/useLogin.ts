import { useState } from "react";
import { authService } from "../api/AuthService";
// redux
import { useDispatch } from "react-redux";
import { clearAuth, setAuth } from "../../auth/state";
import { fetchUser } from "@features/user/state";
import type { AppDispatch } from "@app/store/store";
import { getErrorMessage } from "@shared/lib/error-messages";

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const login = async (credentials: { email: string; password: string }) => {
        setLoading(true);
        setError(null);

        try {
            const { token, refreshToken } = await authService.login({
                email: credentials.email,
                password: credentials.password
            });

            authService.setAuth({token, refreshToken});
            dispatch(setAuth({ token, refreshToken }));

            dispatch(fetchUser());
        } catch (e: unknown) {
            // clean up
            authService.clearAuth();
            dispatch(clearAuth());
            
            setError(getErrorMessage(e))
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return { login, error, loading };
}

export default useLogin;