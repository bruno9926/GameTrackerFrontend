import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import { friendsService } from "./api/FriendsService";
import { friendFactory } from "@/test/factories/friend.factory";
import OnlineFriendsWidget from "./ui/OnlineFriendsWidget";

vi.mock("./api/FriendsService", () => ({
    friendsService: {
        fetchFriends: vi.fn(),
    }
}));

const mockFriendsService = vi.mocked(friendsService);

describe("OnlineFriendsWidget", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the empty state when there are no online friends", async () => {
        mockFriendsService.fetchFriends.mockResolvedValue([]);

        render(<OnlineFriendsWidget />);

        await screen.findByText(/all quiet for now/i);
        expect(screen.getByText(/0 online/i)).toBeInTheDocument();
    });

    it("renders the error state", async () => {
        mockFriendsService.fetchFriends.mockRejectedValue(new Error("Failed to fetch friends"));

        render(<OnlineFriendsWidget />);

        await screen.findByText(/failed to fetch friends/i);
        screen.findByRole("button", { name: /retry/i });
    });

    it("renders online friends and the correct online count", async () => {
        const friends = [
            friendFactory({ id: "1", name: "Alice", status: "online" }),
            friendFactory({ id: "2", name: "Bob", status: "online" }),
        ];
        mockFriendsService.fetchFriends.mockResolvedValue(friends);

        render(<OnlineFriendsWidget />);

        await screen.findByText("Alice");
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText(/2 online/i)).toBeInTheDocument();
    });

    it("only shows online friends, not offline ones", async () => {
        const friends = [
            friendFactory({ id: "1", name: "Alice", status: "online" }),
            friendFactory({ id: "2", name: "Bob", status: "offline" }),
        ];
        mockFriendsService.fetchFriends.mockResolvedValue(friends);

        render(<OnlineFriendsWidget />);

        await screen.findByText("Alice");
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
        expect(screen.getByText(/1 online/i)).toBeInTheDocument();
    });

    it("renders a button to view all friends", async () => {
        mockFriendsService.fetchFriends.mockResolvedValue([]);

        render(<OnlineFriendsWidget />);

        await screen.findByText(/all quiet for now/i);
        expect(screen.getByRole("button", { name: /view all friends/i })).toBeInTheDocument();
    });
});
