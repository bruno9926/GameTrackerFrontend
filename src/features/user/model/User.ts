import type { Game } from "@features/games/model/Game";

export type User = {
    id: string;
    name: string,
    username: string,
    email: string,
    avatarUrl?: string,
    friendCode: string,
    games?: Game[];
}

export type UserInfo = Pick<User, "name" | "email" | "username" | "avatarUrl">;