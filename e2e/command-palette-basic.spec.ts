import { test, expect, Page } from '@playwright/test';

async function triggerCommandPaletteOpen(page: Page) {
  await page.keyboard.press('Meta+k'); // on Mac
  await page.keyboard.press('Control+k'); // on Linux
}

test.describe('Test basic interactions of Command Palette', () => {
  test('should be able to open command palette & run first action', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await page.click('text=Increment Counter by 1');
    await expect(page.locator('strong:has-text("1")')).toBeVisible();
  });

  test('should be able to search for actions in command palette', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await page.keyboard.type('GitHub');

    const searchLocator = page.locator('input[type="search"]');
    await expect(searchLocator).toHaveValue('GitHub');

    const optionLocator = page.locator('[role="combobox"] >> [role="option"]');

    const optionsNum = await optionLocator.count();
    await expect(optionsNum).toBe(1);

    await expect(optionLocator.first()).toContainText('Go to GitHub repo');
  });

  test('should be able to navigate between actions using keyboard', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    // Navigate to third action by pressing Down key twice.
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    let optionLocator = page.locator('[role="combobox"] >> [role="option"]');
    let isThirdOptionSelected = await optionLocator.nth(2).getAttribute('aria-selected');

    await expect(isThirdOptionSelected).toEqual('true');

    // Navigate to second action by pressing Up key once.
    await page.keyboard.press('ArrowUp');

    optionLocator = page.locator('[role="combobox"] >> [role="option"]');
    isThirdOptionSelected = await optionLocator.nth(2).getAttribute('aria-selected');
    const isSecondOptionSelected = await optionLocator.nth(1).getAttribute('aria-selected');

    await expect(isThirdOptionSelected).toEqual('false');
    await expect(isSecondOptionSelected).toEqual('true');
  });

  test('should only render Unmute Audio action when muted', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await expect(page.locator('[role="combobox"]')).not.toContainText('Unmute');

    await page.keyboard.press('Escape');
    await page.check('label[for="audio-mute"]');
    await triggerCommandPaletteOpen(page);
    await page.click('[role="combobox"] >> text=Unmute');

    const isUnmuted = await page.isChecked('label[for="audio-mute"]');
    await expect(isUnmuted).toBeFalsy();
  });

  test('should be able to run nested actions', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await page.keyboard.type('Profile');

    const optionLocator = page.locator('[role="combobox"] >> [role="option"]');

    await optionLocator.locator('text=Set profile').click();

    const searchLocator = page.locator('input[type="search"]');
    await expect(searchLocator).toHaveValue('');

    const optionsNum = await optionLocator.count();
    await expect(optionsNum).toBe(2);

    await optionLocator.locator('text=Set to Work profile').click();

    const profileStatusLocator = await page
      .locator('section', {
        hasText: 'Nested actions',
      })
      .last()
      .locator('text=Active profile is work');

    await expect(profileStatusLocator).toBeVisible();
  });
});
