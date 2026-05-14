import { apiClient } from "@shared/api/apiClient";
import type { Notification } from "../model/Notification";

const API_URL = import.meta.env.VITE_API_URL + "/notifications";

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
        return apiClient<Notification[]>(API_URL);
    }

    async markAsRead(id: string): Promise<void> {
        await apiClient(`${API_URL}/${id}/read`, { method: 'PATCH' });
    }
}

export const notificationService = NotificationService.getInstance();