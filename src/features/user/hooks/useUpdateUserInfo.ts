import type { UserInfo } from "../model/User";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../state/userSlice";
import type { AppDispatch } from "@app/store/store";

const useUpdateUserInfo = () => {
    const dispatch = useDispatch<AppDispatch>();

    const updateInfo = (userInfoChanges: Partial<UserInfo>) =>
        dispatch(updateUserInfo(userInfoChanges)).unwrap()

    return {
        updateUserInfo: updateInfo,
    }
}

export default useUpdateUserInfo;