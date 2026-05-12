import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { userFactory } from "@/test/factories/user.factory";
import FriendRequestItem from "./FriendRequestItem";

const sender = userFactory({ name: "Alice", username: "alice99", avatarUrl: "https://example.com/alice.jpg" });

describe("FriendRequestItem", () => {
    it("renders sender name, username, avatar and action buttons for a pending request", () => {
        render(<FriendRequestItem id="1" sender={sender} status="pending" />);

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("@alice99")).toBeInTheDocument();
        expect(screen.getByAltText("Alice's avatar")).toHaveAttribute("src", "https://example.com/alice.jpg");
        expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ignore/i })).toBeInTheDocument();
    });

    it("shows the accepted state with avatar and hides action buttons", () => {
        render(<FriendRequestItem id="1" sender={sender} status="accepted" />);

        expect(screen.getByText(/now friends with alice/i)).toBeInTheDocument();
        expect(screen.getByAltText("Alice's avatar")).toHaveAttribute("src", "https://example.com/alice.jpg");
        expect(screen.queryByRole("button", { name: /accept/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /ignore/i })).not.toBeInTheDocument();
    });
});
