import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { friendsService } from "./api/FriendsService";
import { userFactory } from "@/test/factories/user.factory";
import FriendRequestsList from "./ui/FriendRequestsList/FriendRequestsList";

vi.mock("./api/FriendsService", () => ({
    friendsService: {
        fetchFriendRequest: vi.fn(),
        fetchFriends: vi.fn(),
        acceptFriendRequest: vi.fn(),
        rejectFriendRequest: vi.fn(),
    }
}));

const mockFriendsService = vi.mocked(friendsService);

describe("FriendRequestsList", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("shows an error message when fetching fails", async () => {
        mockFriendsService.fetchFriendRequest.mockRejectedValue(new Error("Failed to load requests"));
        render(<FriendRequestsList />);
        await screen.findByText(/failed to load requests/i);
        expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("shows an empty state when there are no pending requests", async () => {
        mockFriendsService.fetchFriendRequest.mockResolvedValue([]);
        render(<FriendRequestsList />);
        await screen.findByText(/no pending requests/i);
    });

    it("renders sender name and action buttons for each pending request", async () => {
        mockFriendsService.fetchFriendRequest.mockResolvedValue([
            { id: "1", sender: userFactory({ name: "Alice" }), status: "pending" },
            { id: "2", sender: userFactory({ name: "Bob" }), status: "pending" },
        ]);
        render(<FriendRequestsList />);

        await screen.findByText("Alice");
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getAllByRole("button", { name: /accept/i })).toHaveLength(2);
        expect(screen.getAllByRole("button", { name: /ignore/i })).toHaveLength(2);
    });

    it("filters requests by sender name", async () => {
        mockFriendsService.fetchFriendRequest.mockResolvedValue([
            { id: "1", sender: userFactory({ name: "Alice" }), status: "pending" },
            { id: "2", sender: userFactory({ name: "Bob" }), status: "pending" },
        ]);
        render(<FriendRequestsList search="Alice" />);

        await screen.findByText("Alice");
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });

    it("shows the accepted state after accepting a request", async () => {
        mockFriendsService.fetchFriendRequest.mockResolvedValue([
            { id: "1", sender: userFactory({ name: "Alice" }), status: "pending" },
        ]);
        mockFriendsService.acceptFriendRequest.mockResolvedValue(undefined);
        mockFriendsService.fetchFriends.mockResolvedValue([]);

        const user = userEvent.setup();
        render(<FriendRequestsList />);

        await user.click(await screen.findByRole("button", { name: /accept/i }));
        await screen.findByText(/now friends with alice/i);
    });

    it("removes a request from the list after rejecting it", async () => {
        mockFriendsService.fetchFriendRequest.mockResolvedValue([
            { id: "1", sender: userFactory({ name: "Alice" }), status: "pending" },
        ]);
        mockFriendsService.rejectFriendRequest.mockResolvedValue(undefined);

        const user = userEvent.setup();
        render(<FriendRequestsList />);

        await user.click(await screen.findByRole("button", { name: /ignore/i }));
        expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    });

    it("shows an empty state when the search has no matches", async () => {
        mockFriendsService.fetchFriendRequest.mockResolvedValue([
            { id: "1", sender: userFactory({ name: "Alice" }), status: "pending" },
        ]);
        render(<FriendRequestsList search="zzznomatch" />);

        await screen.findByText(/no requests found/i);
    });
});
