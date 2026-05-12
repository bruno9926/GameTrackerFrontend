import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { friendsService } from "./api/FriendsService";
import { userFactory } from "@/test/factories/user.factory";
import FriendCodeCard from "./ui/FriendCodeCard/FriendCodeCard";

vi.mock("./api/FriendsService", () => ({
    friendsService: {
        sendFriendRequest: vi.fn(),
    }
}));

const mockFriendsService = vi.mocked(friendsService);

describe("FriendCodeCard", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("displays the user's friend code", () => {
        const userData = userFactory({ friendCode: "RJCH3-GMEJD" });
        render(<FriendCodeCard />, {
            user: { user: userData, loading: false, error: null }
        });
        expect(screen.getByText("RJCH3-GMEJD")).toBeInTheDocument();
    });

    it("shows a dash when the user has no friend code", () => {
        render(<FriendCodeCard />, {
            user: { user: null, loading: false, error: null }
        });
        expect(screen.getByText("—")).toBeInTheDocument();
    });

    it("copies the friend code to clipboard and shows 'Copied!' feedback", async () => {
        const user = userEvent.setup();
        render(<FriendCodeCard />, {
            user: { user: userFactory({ friendCode: "RJCH3-GMEJD" }), loading: false, error: null }
        });

        const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
        await user.click(screen.getByRole("button", { name: /copy/i }));
        expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
        expect(writeTextSpy).toHaveBeenCalledWith("RJCH3-GMEJD");
    });

    it("sends a friend request when the submit button is clicked", async () => {
        mockFriendsService.sendFriendRequest.mockResolvedValue(undefined);

        const user = userEvent.setup();
        render(<FriendCodeCard />, {
            user: { user: userFactory(), loading: false, error: null }
        });

        await user.type(screen.getByPlaceholderText(/friend's code/i), "ABC12");
        await user.click(screen.getByRole("button", { name: /send friend request/i }));

        expect(mockFriendsService.sendFriendRequest).toHaveBeenCalledWith("ABC12");
    });

    it("clears the input after sending a friend request", async () => {
        mockFriendsService.sendFriendRequest.mockResolvedValue(undefined);

        const user = userEvent.setup();
        render(<FriendCodeCard />, {
            user: { user: userFactory(), loading: false, error: null }
        });

        const input = screen.getByPlaceholderText(/friend's code/i);
        await user.type(input, "ABC12");
        await user.click(screen.getByRole("button", { name: /send friend request/i }));

        expect(input).toHaveValue("");
    });

    it("sends a friend request when Enter is pressed in the input", async () => {
        mockFriendsService.sendFriendRequest.mockResolvedValue(undefined);

        const user = userEvent.setup();
        render(<FriendCodeCard />, {
            user: { user: userFactory(), loading: false, error: null }
        });

        await user.type(screen.getByPlaceholderText(/friend's code/i), "ABC12{Enter}");

        expect(mockFriendsService.sendFriendRequest).toHaveBeenCalledWith("ABC12");
    });

    it("does not send a request when the input is empty", async () => {
        const user = userEvent.setup();
        render(<FriendCodeCard />, {
            user: { user: userFactory(), loading: false, error: null }
        });

        await user.click(screen.getByRole("button", { name: /send friend request/i }));

        expect(mockFriendsService.sendFriendRequest).not.toHaveBeenCalled();
    });
});
