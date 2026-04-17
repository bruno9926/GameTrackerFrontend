import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";

const useAuth = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    return {
        isAuthenticated: !!token
    }
}

export default useAuth