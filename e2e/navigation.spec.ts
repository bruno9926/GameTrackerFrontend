import { test, expect } from '@playwright/test';

// Note: these tests cover the desktop Navigation sidebar and the header user menu.
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

test('clicking the user avatar opens the user menu', async ({ page }) => {
    await page.getByRole('button', { name: /user menu/i }).click();
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
});

test('clicking settings in the user menu navigates to the settings page', async ({ page }) => {
    await page.getByRole('button', { name: /user menu/i }).click();
    await page.getByRole('link', { name: /go to settings/i }).click();
    await expect(page).toHaveURL(/\/settings/);
});

test('logging out redirects to the sign up page', async ({ page }) => {
    await page.getByRole('button', { name: /user menu/i }).click();
    await page.getByRole('button', { name: /logout/i }).click();
    await expect(page).toHaveURL(/\/signup/);
});

test('searching for a page name shows it as an option', async ({ page }) => {
    await page.getByRole('button', { name: /open search/i }).click();
    await page.getByRole('combobox').fill('Friends');
    await expect(page.getByRole('option', { name: /friends/i })).toBeVisible();
});

test('clicking a search result navigates to that page', async ({ page }) => {
    await page.getByRole('button', { name: /open search/i }).click();
    await page.getByRole('combobox').fill('Games');
    await page.getByRole('option', { name: /^games$/i }).click();
    await expect(page).toHaveURL(/\/games/);
});

test('searching for an unknown term shows the empty state', async ({ page }) => {
    await page.getByRole('button', { name: /open search/i }).click();
    await page.getByRole('combobox').fill('zzznomatch');
    await expect(page.getByText(/no results found/i)).toBeVisible();
});
