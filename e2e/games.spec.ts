import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }) => {
    // cleanup: delete all games after each test
    await page.goto('/dashboard');
    while (await page.getByRole('article').first().isVisible()) {
        const count = await page.getByRole('article').count();
        await page.getByRole('article').first().getByRole('button', { name: /options/i }).click();
        await page.getByRole('menuitem', { name: /delete/i }).click();
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await expect(page.getByRole('article')).toHaveCount(count - 1);
    }
})

test('user can add a game to their library', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('button', { name: /add game/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: /add a new game/i })).toBeVisible();

    await page.getByPlaceholder('Search for a game title').fill('Zelda');

    const option = page.getByRole('option', { name: /zelda/i }).first();
    await expect(option).toBeVisible();
    await option.click();

    await page.getByRole('button', { name: 'Add', exact: true }).click();

    await expect(page.getByText(/game added successfully/i)).toBeVisible({ timeout: 10000 });

    const gameCard = page.getByRole('article', { name: /zelda/i });
    await expect(gameCard).toBeVisible();
    await expect(gameCard.getByText(/playing/i)).toBeVisible();
});

test.describe('editing and deleting games', () => {

    test.beforeEach(async ({ page }) => {
        // given a created game
        await page.goto('/dashboard');
        await page.getByRole('button', { name: /add game/i }).click();

        await page.getByPlaceholder(/search for a game title/i).fill('super mario bros');
        const option = page.getByRole('option', { name: /super mario bros/i }).first();
        await option.click();

        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(page.getByText(/game added successfully/i)).toBeVisible({ timeout: 10000 });

        const gameCard = page.getByRole('article', { name: /super mario bros/i });
        await expect(gameCard).toBeVisible();
        await expect(gameCard.getByText(/playing/i)).toBeVisible();
    });

    test('user can update game status', async ({ page }) => {
        // given a created game
        const gameCard = page.getByRole('article', { name: /super mario bros/i });

        // when user change the game status to "completed"
        await gameCard.getByRole("button", { name: /options/i }).click();
        await page.getByRole("menuitem", { name: /edit/i }).click();

        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByRole('heading', { name: /edit game/i })).toBeVisible();

        await page.getByRole('combobox', { name: /status/i }).click();
        await page.getByRole('option', { name: /completed/i }).click();
        await page.getByRole('button', { name: /save$/i }).click();

        // then it should show the updated status in the game card
        await expect(page.getByText(/game updated successfully/i)).toBeVisible({ timeout: 10000 });
        await expect(gameCard.getByText(/completed/i)).toBeVisible();
    })

    test('user can change the game title of a game', async ({ page }) => {
        // given a created game
        const gameCard = page.getByRole('article', { name: /super mario bros/i });

        // when user change the game title
        await gameCard.getByRole("button", { name: /options/i }).click();
        await page.getByRole("menuitem", { name: /edit/i }).click();

        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByRole('heading', { name: /edit game/i })).toBeVisible();

        await page.getByPlaceholder(/search for a game title/i).fill('Super Mario Bros 2');
        const newOption = page.getByRole('option', { name: /super mario bros 2/i }).first();
        await newOption.click();
        await page.getByRole('button', { name: /save$/i }).click();

        // then it should show the updated title in the game card
        await expect(page.getByText(/game updated successfully/i)).toBeVisible({ timeout: 10000 });
        const updatedGameCard = page.getByRole('article', { name: /super mario bros 2/i });
        await expect(updatedGameCard).toBeVisible();
        await expect(updatedGameCard.getByText(/playing/i)).toBeVisible();
    })

    test.only('users can delete a game from their library', async ({ page }) => {
        // given a created game
        const gameCard = page.getByRole('article', { name: /super mario bros/i });

        // when user delete the game
        await gameCard.getByRole("button", { name: /options/i }).click();
        await page.getByRole("menuitem", { name: /delete/i }).click();
        await page.getByRole('button', { name: 'Delete', exact: true }).click();

        // then the game should be removed from the library
        await expect(page.getByText(/game deleted successfully/i)).toBeVisible({ timeout: 10000 });
        await expect(gameCard).not.toBeVisible();
    });
})

test('user can navigate to games page', async ({ page }) => {
    // given we are on the dashboard
    await page.goto('/dashboard');
    // when we click on the "Games" link in the sidebar
    await page.getByRole('link', { name: /recent games/i }).click();
    // then we are navigated to the games page
    await expect(page).toHaveURL(/\/games/);
})


