import type { Notification } from "../model/Notification";

export default class NotificationService {
    private constructor() { }

    private static instance: NotificationService;

    static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    async fetchNotifications(): Promise<Notification[]> {
        // mock notifications
        return [
            {
                id: "1",
                title: "Friend Request",
                message: "Alex_99 wants to be your friend.",
                image: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Alex",
            },
            {
                id: "2",
                title: "Achievement Unlocked",
                message: "You earned \"First Blood\" — finish a game in under 2 hours.",
            },
            {
                id: "3",
                title: "Friend is Online",
                message: "JuanGamer just logged in and is playing Elden Ring.",
                image: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Juan",
            },
            {
                id: "4",
                title: "New Comment",
                message: "Maria_X commented on your review of Hollow Knight: \"Totally agree!\"",
                image: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Maria",
            },
            {
                id: "5",
                title: "Game Added to Wishlist",
                message: "Cyberpunk 2077 you wishlisted dropped to $19.99.",
            },
            {
                id: "6",
                title: "Friend Request Accepted",
                message: "ShadowByte accepted your friend request.",
                image: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Shadow",
            },
            {
                id: "7",
                title: "Weekly Recap",
                message: "You played 14 hours this week. Your most played: The Witcher 3.",
            },
            {
                id: "8",
                title: "New Review",
                message: "Karla_Dev reviewed Disco Elysium and gave it 5 stars.",
                image: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Karla",
            },
        ];
    }
}

export const notificationService = NotificationService.getInstance();