import { authService } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/authSlice";
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
            authService.clearToken();
            // clear in redux store
            dispatch(clearToken());
            dispatch(clearUser());
        } finally {
            // navigate to login page
            navigate(publicRoutes.LOGIN, { replace: true });
        }
    }

    return { logout };
}

export default useLogout;