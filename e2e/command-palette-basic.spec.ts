import { test, expect } from '@playwright/test';

test.describe('Test basic interactions of Command Palette', () => {
  test('should be able to open command palette & find actions by title', async ({ page }) => {
    await page.goto('/demo');
    await expect(page.locator('text=Bring it up by pressing')).toBeVisible();
  });
});
