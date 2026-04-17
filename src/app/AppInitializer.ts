import { useEffect } from "react";
import { authService } from "@features/auth/api/AuthService";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@features/user/state";
import { clearAuth } from "@features/auth/state";

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
                    authService.clearAuth();
                }
            }
        }
        init();
    }, [])

    return children;
}

export default AppInitializer;