import type { Friend } from "@features/user/model/Friend";

export const friendFactory = (override?: Partial<Friend>): Friend => ({
    id: "1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    friendCode: "JOHN123",
    status: "online",
    ...override
});
