import { chromium } from '@playwright/test';

export default async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:5173/login');
    await page.getByLabel('Email').fill(process.env.E2E_EMAIL!);
    await page.getByLabel('Password').fill(process.env.E2E_PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL(/\/dashboard/);

    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    await browser.close();
}
