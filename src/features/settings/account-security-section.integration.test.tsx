import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import { userService } from "../user/api/UserService";
import AccountAndSecuritySection from "./ui/AccountAndSecuritySection";

vi.mock("../user/api/UserService", () => ({
    userService: {
        setUserInfo: vi.fn(),
        updateAvatar: vi.fn(),
        changePassword: vi.fn(),
    }
}));

const mockUserService = vi.mocked(userService);

describe("AccountAndSecuritySection", () => {
    afterEach(async () => {
        vi.clearAllMocks();
        await act(async () => { toast.dismiss(); });
    });

    it("shows the Change Password button and no form initially", () => {
        render(<AccountAndSecuritySection />);
        expect(screen.getByRole("button", { name: /change password/i })).toBeInTheDocument();
        expect(screen.queryByLabelText("Current Password")).not.toBeInTheDocument();
    });

    it("reveals the password form when Change Password is clicked", async () => {
        const user = userEvent.setup();
        render(<AccountAndSecuritySection />);

        await user.click(screen.getByRole("button", { name: /change password/i }));

        expect(screen.getByLabelText("Current Password")).toBeInTheDocument();
        expect(screen.getByLabelText("New Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm New Password")).toBeInTheDocument();
    });

    it("hides the form when Cancel is clicked", async () => {
        const user = userEvent.setup();
        render(<AccountAndSecuritySection />);

        await user.click(screen.getByRole("button", { name: /change password/i }));
        await user.click(screen.getByRole("button", { name: /cancel/i }));

        expect(screen.queryByLabelText("Current Password")).not.toBeInTheDocument();
    });

    it("calls changePassword with the correct data, shows a success toast and hides the form", async () => {
        mockUserService.changePassword.mockResolvedValue(undefined);
        const user = userEvent.setup();
        render(<AccountAndSecuritySection />);

        await user.click(screen.getByRole("button", { name: /change password/i }));
        await user.type(screen.getByLabelText("Current Password"), "oldpass123");
        await user.type(screen.getByLabelText("New Password"), "newpass123");
        await user.type(screen.getByLabelText("Confirm New Password"), "newpass123");
        await user.click(screen.getByRole("button", { name: /^change password$/i }));

        expect(mockUserService.changePassword).toHaveBeenCalledWith({
            currentPassword: "oldpass123",
            newPassword: "newpass123",
        });
        await screen.findByText(/password updated/i);
        expect(screen.queryByLabelText("Current Password")).not.toBeInTheDocument();
    });

    it("shows an error message when the request fails", async () => {
        mockUserService.changePassword.mockRejectedValue(new Error("Incorrect password"));
        const user = userEvent.setup();
        render(<AccountAndSecuritySection />);

        await user.click(screen.getByRole("button", { name: /change password/i }));
        await user.type(screen.getByLabelText("Current Password"), "wrongpass");
        await user.type(screen.getByLabelText("New Password"), "newpass123");
        await user.type(screen.getByLabelText("Confirm New Password"), "newpass123");
        await user.click(screen.getByRole("button", { name: /^change password$/i }));

        await screen.findByText(/incorrect password/i);
    });

    it("shows a validation error when passwords do not match", async () => {
        const user = userEvent.setup();
        render(<AccountAndSecuritySection />);

        await user.click(screen.getByRole("button", { name: /change password/i }));
        await user.type(screen.getByLabelText("Current Password"), "oldpass123");
        await user.type(screen.getByLabelText("New Password"), "newpass123");
        await user.type(screen.getByLabelText("Confirm New Password"), "different");
        await user.click(screen.getByRole("button", { name: /^change password$/i }));

        await screen.findByText(/passwords do not match/i);
        expect(mockUserService.changePassword).not.toHaveBeenCalled();
    });
});
