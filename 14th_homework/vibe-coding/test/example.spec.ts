import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create Next App/);
});

test('has Next.js logo', async ({ page }) => {
  await page.goto('/');

  // Check if Next.js logo is visible
  await expect(page.getByAltText('Next.js logo')).toBeVisible();
});

test('has deploy button', async ({ page }) => {
  await page.goto('/');

  // Check if deploy button is visible
  await expect(page.getByRole('link', { name: /deploy now/i })).toBeVisible();
});

test('has read docs link', async ({ page }) => {
  await page.goto('/');

  // Check if read docs link is visible
  await expect(page.getByRole('link', { name: /read our docs/i })).toBeVisible();
});
