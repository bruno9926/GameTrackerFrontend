import type { UserInfo } from "@features/user/model/User";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@app/store/store";
import { registerUser } from "../state";

type userToRegister = UserInfo & {
    password: string
}

const useRegister = () => {
    const dispatch = useDispatch<AppDispatch>();

    const register = (user: userToRegister) =>
        dispatch(registerUser({
            name: user.name,
            username: user.username.toLowerCase(),
            email: user.email,
            password: user.password
        })).unwrap();

    return { register };
};

export default useRegister;
