import { test, expect } from '@playwright/test';

test.describe('GFMTF Website - Smoke Tests', () => {
  const BASE_URL = 'http://localhost:3000';

  test('should load the home page successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Check basic page structure
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for main navigation elements
    const programsLink = page.locator('nav a[href="#programs"]');
    await expect(programsLink).toBeVisible();
    
    const galleryLink = page.locator('nav a[href="#gallery"]');
    await expect(galleryLink).toBeVisible();
    
    const contactLink = page.locator('nav a[href="#booking"]');
    await expect(contactLink).toBeVisible();
  });

  test('should have working Book Session button in nav', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    const bookSessionBtn = page.locator('nav a[href="/booking"]');
    await expect(bookSessionBtn).toBeVisible();
    await expect(bookSessionBtn).toHaveText('Book Session');
    
    // Click and verify navigation
    await bookSessionBtn.click();
    await expect(page).toHaveURL(`${BASE_URL}/booking`);
  });
});