import { describe, expect, it } from "vitest";
import { render, screen, within } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import Header from "@/shared/ui/Header/Header";
import { userFactory } from "@/test/factories/user.factory";

describe("User in navbar", () => {
    it("shows users avatar in the navbar", () => {
        const userData = userFactory();
        const preloadedState = {
            user: {
                user: userData,
                loading: false,
                error: null
            }
        }
        render(<Header />, preloadedState)
                
        const avatar = screen.getByAltText(userData.name)
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute("src", userData.avatarUrl);
    })

    it("opens user menu dialog on avatar click", async () => {
        const userData = userFactory();
        render(<Header />, { user: { user: userData, loading: false, error: null} })

        // click on the avatar
        const user = userEvent.setup();
        await user.click(screen.getByRole("button", {name: /user menu/i }));
        //opens dialog
        const menu = screen.getByRole("dialog");
        expect(menu).toBeInTheDocument();
        // expect the right content
        expect(within(menu).getByAltText(userData.name)).toBeInTheDocument();
        expect(within(menu).getByAltText(userData.name)).toHaveAttribute("src", userData.avatarUrl);
        expect(within(menu).getByText(userData.username)).toBeInTheDocument();
    })
})