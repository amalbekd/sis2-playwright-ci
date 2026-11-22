import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('docs intro page loads', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');
  await expect(page.locator('article')).toContainText('Playwright Test');
});

test('api link navigates to reference', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'API' }).click();
  await expect(page).toHaveURL(/.*api\/class-playwright/);
});

test('search button is visible', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('button', { name: /Search/i })).toBeVisible();
});

test('community link is visible', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Docs' }).first()).toBeVisible();
});

test('language selector is visible', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
});

test('footer contains Microsoft', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.locator('footer')).toContainText('Microsoft');
});
