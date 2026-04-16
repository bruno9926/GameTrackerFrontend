import { useState } from "react";
import { authService } from "../../services/AuthService";
// redux
import { useDispatch } from "react-redux";
import { clearAuth, setAuth } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

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

            const user = await authService.getMe();
            dispatch(setUser(user));
        } catch (e: unknown) {
            // clean up
            authService.clearAuth();
            dispatch(clearAuth());
            
            setError((e as Error)?.message || "Login failed")
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return { login, error, loading };
}

export default useLogin;