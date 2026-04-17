import { test, expect } from '@playwright/test';

test.describe('AustinHumphrey.com smoke', () => {
  test('home renders key identity text', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('#hero-heading')).toBeVisible();
  });

  test('primary navigation renders', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
    const navLinks = nav.locator('a[href^="#"]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
