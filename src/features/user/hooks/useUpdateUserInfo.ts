import type { UserInfo } from "../model/User";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../state/userSlice";
import type { AppDispatch } from "@app/store/store";
import { getErrorMessage } from "@shared/lib/error-messages";

const useUpdateUserInfo = () => {
    const dispatch = useDispatch<AppDispatch>();

    const updateInfo = async (userInfoChanges: Partial<UserInfo>) => {
        try {
            return await dispatch(updateUserInfo(userInfoChanges)).unwrap();
        } catch (e) {
            throw getErrorMessage(e);
        }
    }

    return {
        updateUserInfo: updateInfo,
    }
}

export default useUpdateUserInfo;