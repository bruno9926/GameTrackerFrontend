export const NotificationType = {
    FRIEND_REQUEST: "friend_request",
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

export type Notification = {
    id: string;
    type: NotificationType; // "friend_request" | ...
    title: string;
    message: string;
    image?: string;
    read: boolean;
    createdAt: string;
}