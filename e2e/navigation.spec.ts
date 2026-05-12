import { test, expect } from '@playwright/test';

// Note: these tests cover the desktop Navigation sidebar only.
// The mobile BottomBar is not covered until a mobile Playwright project is configured.
test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test('navigation shows all links', async ({ page }) => {
    const nav = page.getByRole('navigation').first();
    await expect(nav.getByRole('link', { name: /gaming dashboard/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /games/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /friends/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /settings/i })).toBeVisible();
});

test('clicking Gaming Dashboard navigates to the dashboard', async ({ page }) => {
    await page.getByRole('navigation').first().getByRole('link', { name: /gaming dashboard/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
});

test('clicking Games navigates to the games page', async ({ page }) => {
    await page.getByRole('navigation').first().getByRole('link', { name: /games/i }).click();
    await expect(page).toHaveURL(/\/games/);
});

test('clicking Friends navigates to the friends page', async ({ page }) => {
    await page.getByRole('navigation').first().getByRole('link', { name: /friends/i }).click();
    await expect(page).toHaveURL(/\/friends/);
});

test('clicking Settings navigates to the settings page', async ({ page }) => {
    await page.getByRole('navigation').first().getByRole('link', { name: /settings/i }).click();
    await expect(page).toHaveURL(/\/settings/);
});
