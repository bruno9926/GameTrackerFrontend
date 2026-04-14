import { authService } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/authSlice";
import { clearUser } from "../../redux/userSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const logout = () => {
        // clear in persistent storage
        authService.clearToken();
        // clear in redux store
        dispatch(clearToken());
        dispatch(clearUser());
    }
    return { logout };
}

export default useLogout;