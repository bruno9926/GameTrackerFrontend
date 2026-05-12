import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";

const root = document.documentElement;

describe("ThemeToggle", () => {
    beforeEach(() => {
        localStorage.clear();
        root.className = "";
    });

    afterEach(() => {
        root.className = "";
    });

    it("applies the dark class when Dark is selected", async () => {
        const user = userEvent.setup();
        render(<ThemeToggle />);

        await user.click(screen.getByRole("button", { name: "Dark" }));

        expect(root.classList.contains("dark")).toBe(true);
    });

    it("removes the previous theme class when switching themes", async () => {
        const user = userEvent.setup();
        render(<ThemeToggle />);

        await user.click(screen.getByRole("button", { name: "Dark" }));
        await user.click(screen.getByRole("button", { name: "Light" }));

        expect(root.classList.contains("dark")).toBe(false);
    });

    it("persists the selected theme to localStorage", async () => {
        const user = userEvent.setup();
        render(<ThemeToggle />);

        await user.click(screen.getByRole("button", { name: "Berry" }));

        expect(localStorage.getItem("theme")).toBe("theme-berry");
    });

    it("reads the initial theme from localStorage", () => {
        localStorage.setItem("theme", "dark");
        render(<ThemeToggle />);

        expect(root.classList.contains("dark")).toBe(true);
    });
});
