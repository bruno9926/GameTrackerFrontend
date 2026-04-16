import { useEffect } from "react";
import { authService } from "./services/AuthService";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
import { clearAuth } from "./redux/authSlice";

const AppInitializer = ({ children }: { children: Readonly<React.ReactNode> }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        const init = async () => {
            // Initialize user
            if (token) {
                try {
                    const user = await authService.getMe();
                    dispatch(setUser(user));
                } catch (error) {
                    dispatch(clearAuth());
                    authService.clearToken();
                    authService.clearRefreshToken();
                }
            }
        }
        init();
    }, [])

    return children;
}

export default AppInitializer;