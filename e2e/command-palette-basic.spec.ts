import { test, expect } from '@playwright/test';

test.describe('Test basic interactions of Command Palette', () => {
  test('should be able to open command palette & run first action', async ({ page }) => {
    await page.goto('/demo');

    await page.keyboard.press('Meta+k'); // on Mac
    await page.keyboard.press('Control+k'); // on Linux

    await page.locator('text=Increment Counter by 1').click();

    await expect(page.locator('strong:has-text("1")')).toBeVisible();
  });
});
