import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/test-utils";
import FriendGameItem from "./FriendGameItem";
import { gameFactory } from "@/test/factories/game.factory";
import { userEvent } from "@testing-library/user-event";

describe("FriendGameItem", () => {
    it("shows the add to library option when the options button is clicked", async () => {
        const game = gameFactory();
        render(<FriendGameItem {...game} />);

        const user = userEvent.setup();
        await user.click(
            screen.getByRole("button", { name: /options/i })
        );

        expect(screen.getByRole("menuitem", { name: /add to my library/i })).toBeInTheDocument();
    });
});
