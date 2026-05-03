import type { User } from "./User";

export type Friend = User & {
    status: 'online' | 'offline' | 'busy',
}