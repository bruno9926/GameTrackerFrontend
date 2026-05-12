import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import { userService } from "../user/api/UserService";
import { userFactory } from "@/test/factories/user.factory";
import UserSection from "./ui/UserSection";

vi.mock("../user/api/UserService", () => ({
    userService: {
        setUserInfo: vi.fn(),
        updateAvatar: vi.fn(),
    }
}));

const mockUserService = vi.mocked(userService);

const withUser = (override?: Parameters<typeof userFactory>[0]) => ({
    user: {
        user: userFactory({ name: "Samus Aran", username: "metroidkiller01", email: "samus@federation.com", ...override }),
        loading: false,
        error: null,
    }
});

describe("UserSection", () => {
    afterEach(async () => {
        vi.clearAllMocks();
        await act(async () => { toast.dismiss(); });
    });

    it("renders the user name and username", () => {
        render(<UserSection />, withUser());
        expect(screen.getByText("Samus Aran")).toBeInTheDocument();
        expect(screen.getByText("@metroidkiller01")).toBeInTheDocument();
    });

    it("reveals the edit form with pre-filled values when 'Edit Profile' is clicked", async () => {
        const user = userEvent.setup();
        render(<UserSection />, withUser());

        await user.click(screen.getByRole("button", { name: /edit profile/i }));

        expect(screen.getByLabelText("Username")).toHaveValue("metroidkiller01");
        expect(screen.getByLabelText("Name")).toHaveValue("Samus Aran");
        expect(screen.getByLabelText("Email")).toHaveValue("samus@federation.com");
    });

    it("hides the form when cancel is clicked", async () => {
        const user = userEvent.setup();
        render(<UserSection />, withUser());

        await user.click(screen.getByRole("button", { name: /edit profile/i }));
        await user.click(screen.getByRole("button", { name: /cancel/i }));

        expect(screen.queryByLabelText("Username")).not.toBeInTheDocument();
    });

    it("calls setUserInfo with only the changed fields on submit", async () => {
        const user = userEvent.setup();
        render(<UserSection />, withUser());

        await user.click(screen.getByRole("button", { name: /edit profile/i }));
        await user.clear(screen.getByLabelText("Name"));
        await user.type(screen.getByLabelText("Name"), "New Name");
        await user.click(screen.getByRole("button", { name: /save changes/i }));

        expect(mockUserService.setUserInfo).toHaveBeenCalledWith({ name: "New Name" });
    });

    it("does not call setUserInfo when nothing changed", async () => {
        const user = userEvent.setup();
        render(<UserSection />, withUser());

        await user.click(screen.getByRole("button", { name: /edit profile/i }));
        await user.click(screen.getByRole("button", { name: /save changes/i }));

        expect(mockUserService.setUserInfo).not.toHaveBeenCalled();
    });

    it("shows a success toast after saving", async () => {
        mockUserService.setUserInfo.mockResolvedValue(userFactory({ name: "New Name" }));
        const user = userEvent.setup();
        render(<UserSection />, withUser());

        await user.click(screen.getByRole("button", { name: /edit profile/i }));
        await user.clear(screen.getByLabelText("Name"));
        await user.type(screen.getByLabelText("Name"), "New Name");
        await user.click(screen.getByRole("button", { name: /save changes/i }));

        await screen.findByText(/your data has been updated/i);
    });

    it("shows an error message when saving fails", async () => {
        mockUserService.setUserInfo.mockRejectedValue(new Error("Username already taken"));
        const user = userEvent.setup();
        render(<UserSection />, withUser());

        await user.click(screen.getByRole("button", { name: /edit profile/i }));
        await user.clear(screen.getByLabelText("Username"));
        await user.type(screen.getByLabelText("Username"), "takenuser");
        await user.click(screen.getByRole("button", { name: /save changes/i }));

        await screen.findByText(/username already taken/i);
    });
});
