export type User = {
    id: string;
    name: string,
    username: string,
    email: string,
    avatarUrl?: string
}

export type UserInfo = Pick<User, "name" | "email" | "username">;