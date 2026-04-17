import AuthService from "../api/AuthService";

type userToRegister = {
    username: string;
    email: string;
    password: string;
}

const useRegister = () => {
    const register = async (user: userToRegister) => {
        await AuthService.getInstance().register({
            name: user.username,
            email: user.email,
            password: user.password
        })
    }

    return register;
}

export default useRegister;