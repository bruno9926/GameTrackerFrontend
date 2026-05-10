import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/test-utils";
import GameItem from "./GameItem";
import { gameFactory } from "@/test/factories/game.factory";
import { userEvent } from "@testing-library/user-event";

describe("GameItem", () => {

    it("shows edit and delete options when the options button is clicked", async () => {
        const game = gameFactory();
        render(<GameItem {...game} />)

        const user = userEvent.setup();
        await user.click(
            screen.getByRole("button", { name: /options/i })
        );

        expect(screen.getByRole("menuitem", { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole("menuitem", { name: /delete/i })).toBeInTheDocument();
    })
})