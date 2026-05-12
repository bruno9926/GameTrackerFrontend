import type { User } from "@/features/user/model/User";

export const userFactory = (override?: Partial<User>): User => ({
    id: "1",
    name: "Samus Aran",
    username: "metroidkiller01",
    email: "samus.aran@federation.com",
    avatarUrl: "https://example.com/samus.jpg",
    friendCode: 'RJCH3-GMEJD',
    ...override
})