import { useEffect } from "react";
import { authService } from "@features/auth/api/AuthService";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "@features/user/state";
import { clearAuth } from "@features/auth/state";
import type { RootState } from "./store/store";

const AppInitializer = ({ children }: { children: Readonly<React.ReactNode> }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    const initializeUser = async () => {
        try {
            dispatch(setLoading(true));
            const user = await authService.getMe();
            dispatch(setUser(user));
        } catch (error) {
            dispatch(clearAuth());
            authService.clearAuth();
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (token) {
            initializeUser();
        }
    }, [token])

    return children;
}

export default AppInitializer;