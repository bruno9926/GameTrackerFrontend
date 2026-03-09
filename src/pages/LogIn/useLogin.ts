import AuthService from "../../services/AuthService";

const useLogin = () => {
    const login = async (credentials: { email: string; password: string }) => {
        const { token } = await AuthService.getInstance().login({
            email: credentials.email,
            password: credentials.password
        });

        localStorage.setItem("authToken", token);
    }
    return login;
}

export default useLogin;