import { authService } from "@features/auth/api/AuthService";
import { useDispatch } from "react-redux";
import { clearAuth } from "../state/authSlice";
import { clearUser } from "@features/user/state";
// navigation
import { useNavigate } from "react-router";
import { publicRoutes } from "@routes/routes";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        try {
            // clear in persistent storage
            authService.clearAuth();
            // clear in redux store
            dispatch(clearAuth());
            dispatch(clearUser());
        } finally {
            // navigate to sign up page
            navigate(publicRoutes.SIGNUP, { replace: true });
        }
    }

    return { logout };
}

export default useLogout;