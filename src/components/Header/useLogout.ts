import { authService } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../redux/authSlice";
import { clearUser } from "../../redux/userSlice";
// navigation
import { useNavigate } from "react-router";
import { publicRoutes } from "../../routes/routes";

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
            // navigate to login page
            navigate(publicRoutes.LOGIN, { replace: true });
        }
    }

    return { logout };
}

export default useLogout;