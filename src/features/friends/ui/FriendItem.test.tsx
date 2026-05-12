import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { friendFactory } from "@/test/factories/friend.factory";
import FriendItem from "./FriendItem";

describe("FriendItem", () => {
    it("renders the friend's name and username", () => {
        const friend = friendFactory({ name: "Alice", username: "alice99" });
        render(<FriendItem {...friend} />);

        expect(screen.getByRole("heading", { name: "Alice" })).toBeInTheDocument();
        expect(screen.getByText("@alice99")).toBeInTheDocument();
    });

    it("links to the friend's profile page", () => {
        const friend = friendFactory({ id: "42" });
        render(<FriendItem {...friend} />);

        expect(screen.getByRole("link")).toHaveAttribute("href", "/friends/42");
    });

    it("shows the avatar image when avatarUrl is provided", () => {
        const friend = friendFactory({ name: "Alice", avatarUrl: "https://example.com/alice.jpg" });
        render(<FriendItem {...friend} />);

        const avatar = screen.getByRole("img", { name: "Alice's avatar" });
        expect(avatar).toHaveAttribute("src", "https://example.com/alice.jpg");
    });

    it("shows initials when no avatarUrl is provided", () => {
        const friend = friendFactory({ name: "Alice Doe", avatarUrl: undefined });
        render(<FriendItem {...friend} />);

        expect(screen.queryByRole("img")).not.toBeInTheDocument();
        expect(screen.getByText("AD")).toBeInTheDocument();
    });
});
