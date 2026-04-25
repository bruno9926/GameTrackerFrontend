import { useState } from "react";
import type { User, UserInfo } from "../model/User";
import { getErrorMessage } from "@shared/lib/error-messages";
import { userService } from "../api/UserService";

const useUpdateUserInfo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUserInfo = async (userInfoChanges: Partial<UserInfo>): Promise<User> => {
        try {
            setError(null);
            setLoading(true);

            return await userService.setUserInfo(userInfoChanges);
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const clearError = () => {
        if (error) setError(null);
    }

    return {
        loading,
        error,
        updateUserInfo,
        clearError
    }
}

export default useUpdateUserInfo;