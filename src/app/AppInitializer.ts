import { useEffect, useLayoutEffect } from "react";
import { authService } from "@features/auth/api/AuthService";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@features/user/state";
import { clearAuth } from "@features/auth/state";
import { fetchFriends, fetchRequests } from "@features/friends/state";
import type { AppDispatch, RootState } from "./store/store";

const AppInitializer = ({ children }: { children: Readonly<React.ReactNode> }) => {
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);

    const initializeUser = async () => {
        try {
            dispatch(fetchUser());
            dispatch(fetchFriends());
            dispatch(fetchRequests());
        } catch (error) {
            dispatch(clearAuth());
            authService.clearAuth();
        }
    }

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.classList.add(savedTheme);
        }
    }

    useEffect(() => {
        if (token) {
            initializeUser();
        }
    }, [token])

    useLayoutEffect(() => {
        initializeTheme();
    }, [])

    return children;
}

export default AppInitializer;