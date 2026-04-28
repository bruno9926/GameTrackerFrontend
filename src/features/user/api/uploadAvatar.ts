import { userService } from '@features/user/api/UserService';
import { getErrorMessage } from '@shared/lib/error-messages';

export const uploadAvatar = async (file: File) => {
    try {
        return await userService.updateAvatar(file);
    } catch (error) {
        throw getErrorMessage(error);
    }
}