import { test, expect } from '@playwright/test';

test.describe('Test basic interactions of Demo Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo');
  });

  test('should be able to increment count', async ({ page }) => {
    await page.locator('button >> text=Increment Count').click();
    await expect(page.locator('strong >> text=1')).toBeVisible();
  });

  test('should be able to toggle mute', async ({ page }) => {
    const unmuteLabelLocator = page.locator('label >> text=Audible');
    const muteLabelLocator = page.locator('label >> text=Muted');
    const kbdShortcutLocator = page.locator('kbd >> text=⌘U').first();

    await unmuteLabelLocator.check();
    await expect(muteLabelLocator).toBeChecked();
    await expect(kbdShortcutLocator).toBeVisible();

    await muteLabelLocator.uncheck();
    await expect(unmuteLabelLocator).toBeChecked({
      checked: false,
    });
    await expect(kbdShortcutLocator).not.toBeVisible();
  });
});
