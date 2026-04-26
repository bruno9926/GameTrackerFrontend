import type { User, UserInfo } from "../model/User";
import { getErrorMessage } from "@shared/lib/error-messages";
import { userService } from "../api/UserService";

const useUpdateUserInfo = () => {
    const updateUserInfo = async (userInfoChanges: Partial<UserInfo>): Promise<User> => {
        try {
            return await userService.setUserInfo(userInfoChanges);
        } catch (error) {
            throw getErrorMessage(error);
        }
    }

    return { updateUserInfo }
}

export default useUpdateUserInfo;