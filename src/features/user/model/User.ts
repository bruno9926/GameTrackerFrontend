export type User = {
    id: string;
    name: string,
    username?: string,
    email: string,
    profilePicture?: string
}

export type UserInfo = Pick<User, "name" | "email" | "username">;