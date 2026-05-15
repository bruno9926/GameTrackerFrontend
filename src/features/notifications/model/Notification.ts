export enum NotificationType {
    FRIEND_REQUEST = "friend_request",
}

export type Notification = {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    image?: string;
    read: boolean;
    createdAt: string;
}