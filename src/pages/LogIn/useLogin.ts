import { useState } from "react";
import { authService } from "../../services/AuthService";
import { useNavigate, useLocation } from "react-router";
import { defaultRoute } from "../../routes/routes";
// redux
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const login = async (credentials: { email: string; password: string }) => {
        setLoading(true);
        setError(null);

        try {
            const { token } = await authService.login({
                email: credentials.email,
                password: credentials.password
            });

            authService.setToken(token);
            dispatch(setToken(token));

            const user = await authService.getMe();
            dispatch(setUser(user));

        } catch(e: any) {
            setError(e?.message || "Login failed")
            throw e;
        } finally {
            setLoading(false);
        }
    }
    return { login, error, loading };
}

export default useLogin;