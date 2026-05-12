import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import { friendsService } from "./api/FriendsService";
import { friendFactory } from "@/test/factories/friend.factory";
import FriendsList from "./ui/FriendsList/FriendsList";

vi.mock("./api/FriendsService", () => ({
    friendsService: {
        fetchFriends: vi.fn(),
    }
}));

const mockFriendsService = vi.mocked(friendsService);

describe("FriendsList", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("shows an error message when fetching fails", async () => {
        mockFriendsService.fetchFriends.mockRejectedValue(new Error("Failed to load friends"));
        render(<FriendsList />);
        await screen.findByText(/failed to load friends/i);
        expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("shows an empty state when there are no friends", async () => {
        mockFriendsService.fetchFriends.mockResolvedValue([]);
        render(<FriendsList />);
        await screen.findByText(/boo... no one around/i);
    });

    it("renders friends grouped by online, busy, and offline status", async () => {
        mockFriendsService.fetchFriends.mockResolvedValue([
            friendFactory({ id: "1", name: "Alice", status: "online" }),
            friendFactory({ id: "2", name: "Bob", status: "busy" }),
            friendFactory({ id: "3", name: "Charlie", status: "offline" }),
        ]);
        render(<FriendsList />);

        await screen.findByText("Alice");
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("Charlie")).toBeInTheDocument();
        expect(screen.getByText(/online/i)).toBeInTheDocument();
        expect(screen.getByText(/busy/i)).toBeInTheDocument();
        expect(screen.getByText(/offline/i)).toBeInTheDocument();
    });

    it("does not show status groups with no friends", async () => {
        mockFriendsService.fetchFriends.mockResolvedValue([
            friendFactory({ id: "1", name: "Alice", status: "online" }),
        ]);
        render(<FriendsList />);

        await screen.findByText("Alice");
        expect(screen.queryByText(/busy/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/offline/i)).not.toBeInTheDocument();
    });

    it("filters friends by the search prop", async () => {
        mockFriendsService.fetchFriends.mockResolvedValue([
            friendFactory({ id: "1", name: "Alice", status: "online" }),
            friendFactory({ id: "2", name: "Bob", status: "online" }),
        ]);
        render(<FriendsList search="Alice" />);

        await screen.findByText("Alice");
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });

    it("shows 'No friends found' when the search has no matches", async () => {
        mockFriendsService.fetchFriends.mockResolvedValue([
            friendFactory({ id: "1", name: "Alice", status: "online" }),
        ]);
        render(<FriendsList search="zzznomatch" />);

        await screen.findByText(/no friends found/i);
    });
});
