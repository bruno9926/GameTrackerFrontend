export type Friend = {
    id: number,
    name: string,
    status: 'online' | 'offline' | 'busy',
    avatar: string,
    games: string[]
}