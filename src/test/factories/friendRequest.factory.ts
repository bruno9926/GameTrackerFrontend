import type { FriendRequest } from "@features/user/model/FriendRequest";
import { userFactory } from "./user.factory";

export const friendRequestFactory = (override?: Partial<FriendRequest>): FriendRequest => ({
    id: "1",
    sender: userFactory(),
    status: "pending",
    ...override
});
