import { test, expect } from '@playwright/test';
import { createGame, deleteAllGames } from './helpers/api';

test.afterEach(async ({ request }) => {
    await deleteAllGames(request);
});

test.describe('status filter', () => {

    test.beforeEach(async ({ page, request }) => {
        // given a library with games of different statuses
        await createGame(request, 'super mario bros', 'playing');
        await createGame(request, 'zelda', 'completed');
        await createGame(request, 'sonic the hedgehog', 'wishlist');
        await page.goto('/games');
    });

    test('user can hide games by deselecting a status', async ({ page }) => {
        // when the user deselects the "Completed" filter
        await page.getByRole('button', { name: 'Completed' }).click();

        // then completed games are hidden and the rest remain visible
        await expect(page.getByRole('article', { name: /zelda/i })).not.toBeVisible();
        await expect(page.getByRole('article', { name: /super mario bros/i })).toBeVisible();
        await expect(page.getByRole('article', { name: /sonic/i })).toBeVisible();
    });

    test('user can show all games by clicking All', async ({ page }) => {
        // given "Completed" is deselected
        await page.getByRole('button', { name: 'Completed' }).click();
        await expect(page.getByRole('article')).toHaveCount(2);

        // when the user clicks "All"
        await page.getByRole('button', { name: 'All' }).click();

        // then all games are shown again
        await expect(page.getByRole('article')).toHaveCount(3);
    });
});

test.describe('search', () => {

    test.beforeEach(async ({ page, request }) => {
        // given a library with multiple games
        await createGame(request, 'super mario bros');
        await createGame(request, 'zelda');
        await page.goto('/games');
    });

    test('user can search games by name', async ({ page }) => {
        // when the user types in the search input
        await page.getByPlaceholder('Search games...').fill('mario');

        // then only matching games are shown
        await expect(page.getByRole('article', { name: /super mario bros/i })).toBeVisible();
        await expect(page.getByRole('article', { name: /zelda/i })).not.toBeVisible();
    });

    test('user sees empty state when search has no results', async ({ page }) => {
        // when the user searches for something that does not match any game
        await page.getByPlaceholder('Search games...').fill('halo');

        // then an empty message is shown
        await expect(page.getByText(/no results found for/i)).toBeVisible();
    });
});
