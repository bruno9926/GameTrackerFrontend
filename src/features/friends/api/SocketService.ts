import { io, type Socket } from "socket.io-client";
import TokenProvider from "@shared/api/TokenProvider";
import type { FriendStatus } from "@/features/user/model/Friend";

const API_URL = import.meta.env.VITE_API_URL + "/status";

class SocketService {
    private static instance: SocketService;

    private constructor() {}

    private socket: Socket | null = null;

    static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    connect() {
        if (this.socket?.connected) return;
        if (!TokenProvider.getAccessToken()) {
            throw new Error("Access token needed for socket connection")
        }
        this.socket = io(API_URL, {
            auth: { token: TokenProvider.getAccessToken() }
        })
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }

    onFriendStatus(callback: (friendStatusEvent: FriendStatusEvent) => void) {
        this.socket?.on("friend:status", callback)
    }

    offFriendStatus(callback: (friendStatusEvent: FriendStatusEvent) => void) {
        this.socket?.off("friend:status", callback)
    }
}

export interface FriendStatusEvent {
    userId: string,
    status: FriendStatus
}

export default SocketService;

export const socketService = SocketService.getInstance();