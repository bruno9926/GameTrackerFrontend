import type { UserInfo } from "@features/user/model/User";
import { authService } from "../api/AuthService";
import { getErrorMessage } from "@shared/lib/error-messages";

type userToRegister = UserInfo & {
    password: string
}

const useRegister = () => {

    const register = async (user: userToRegister) => {
        try {
            await authService.register({
                name: user.name,
                username: user.username.toLowerCase(),
                email: user.email,
                password: user.password
            })
        } catch (error) {
            throw getErrorMessage(error);
        }
    }

    return { register };
}

export default useRegister;
