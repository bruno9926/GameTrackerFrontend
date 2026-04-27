// useChangePassword.ts
import { getErrorMessage } from "@shared/lib/error-messages";
import { userService } from "../api/UserService";

type ChangePasswordPayload = {
    currentPassword: string;
    newPassword: string;
};

const useChangePassword = () => {

    const changePassword = async (data: ChangePasswordPayload) => {
        try {
            await userService.changePassword(data);
        } catch (error) {
            throw getErrorMessage(error);
        }
    };

    return { changePassword };
};

export default useChangePassword;