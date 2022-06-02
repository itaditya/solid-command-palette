import { test, expect } from '@playwright/test';
import { triggerCommandPaletteOpen } from './testUtils/triggerCommandPaletteOpen';

test.describe('Test `initialVisibleActions` prop of `Root` component', () => {
  test('should not show nested actions at root by default', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await expect(page.locator('text=Set to Personal profile')).not.toBeVisible();
  });

  test('should not show nested actions at root when set to `root`', async ({ page }) => {
    await page.goto('/demo/InitialVisibleActions/Root');
    await triggerCommandPaletteOpen(page);

    await expect(page.locator('text=Configure Personal profile')).not.toBeVisible();
  });

  test('should show nested actions at root when set to `all`', async ({ page }) => {
    await page.goto('/demo/InitialVisibleActions/All');
    await triggerCommandPaletteOpen(page);

    await expect(page.locator('text=Configure Personal profile')).toBeVisible();
  });
});
