import { test, expect } from '@playwright/test';

// override global auth state so these tests start unauthenticated
test.use({ storageState: { cookies: [], origins: [] } });

const EMAIL = process.env.E2E_EMAIL!;
const PASSWORD = process.env.E2E_PASSWORD!;

test('user can log in successfully', async ({ page }) => {
    // given we are on the login page
    await page.goto('/login');
    // when we fill in the login form and submit
    await page.getByLabel('Email').fill(EMAIL);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In'}).click();
    // then we are redirected to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
});

test('user sees error message on failed login', async ({ page }) => {
    // given we are on the login page
    await page.goto('/login');
    // when we fill in the login form with invalid credentials and submit
    await page.getByLabel('Email').fill(EMAIL);
    await page.getByLabel('Password').fill('***' + PASSWORD + '***');
    await page.getByRole('button', { name: 'Sign In'}).click();
    // then we see an error message
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
});

test('user can navigate to registration page from login page', async ({ page }) => {
    // given we are on the login page
    await page.goto('/login');
    // when we click on the "Don't have an account? Sign Up" link
    await page.getByRole('link', { name: /sign up/i }).click();

    // then we are navigated to the registration page
    await expect(page).toHaveURL(/\/signup/);
})