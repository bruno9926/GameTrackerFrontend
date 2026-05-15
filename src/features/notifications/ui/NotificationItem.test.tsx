import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/test-utils";
import NotificationItem from "./NotificationItem";
import { NotificationType, type Notification } from "../model/Notification";

const notificationFactory = (override?: Partial<Notification>) => ({
    id: "1",
    title: "Friend Request",
    message: "peach_princess22 wants to be your friend",
    image: "https://example.com/peach.jpg",
    type: NotificationType.FRIEND_REQUEST,
    read: false,
    createdAt: new Date().toISOString(),
    ...override
});

describe("NotificationItem", () => {
    it("renders the notification information", () => {
        const notification = notificationFactory();
        render(<NotificationItem {...notification} onRead={() => { }} />)

        expect(screen.getByRole("heading", { name: notification.title })).toBeInTheDocument();
        expect(screen.getByText(notification.message)).toBeInTheDocument();
        const image = screen.getByAltText(notification.title, { exact: false })
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", notification.image);

    })

    it("renders title initial as image fallback", () => {
        const notification = notificationFactory();
        render(<NotificationItem {...notification} onRead={() => { }} />)

        expect(screen.getByText("F")).toBeInTheDocument();
        expect(screen.queryByAltText(notification.title, { exact: false })).not.toBeInTheDocument();
    })
});