import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@app/store/store";
import { loginUser } from "../state";
import { fetchUser } from "@features/user/state";

const useLogin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const login = async (credentials: { email: string; password: string }) => {
        await dispatch(loginUser(credentials)).unwrap();
        dispatch(fetchUser());
    };

    return { login, error, loading };
};

export default useLogin;
