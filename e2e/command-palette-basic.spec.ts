import { test, expect } from '@playwright/test';

test.describe('Test basic interactions of Command Palette', () => {
  test('should be able to open command palette & run first action', async ({ page }) => {
    await page.goto('/demo');

    await page.keyboard.press('Meta+k'); // on Mac
    await page.keyboard.press('Control+k'); // on Linux

    await page.locator('text=Increment Counter by 1').click();

    await expect(page.locator('strong:has-text("1")')).toBeVisible();
  });

  test('should be able to search for actions in command palette', async ({ page }) => {
    await page.goto('/demo');

    await page.keyboard.press('Meta+k'); // on Mac
    await page.keyboard.press('Control+k'); // on Linux

    await page.keyboard.type('GitHub');

    const optionLocator = page.locator('[role="combobox"] >> [role="option"]');

    const optionsNum = await optionLocator.count();
    await expect(optionsNum).toBe(1);

    const optionText = await optionLocator.first().textContent();
    await expect(optionText).toContain('Go to GitHub repo');
  });

  test('should be able to navigate between actions using keyboard', async ({ page }) => {
    await page.goto('/demo');

    await page.keyboard.press('Meta+k'); // on Mac
    await page.keyboard.press('Control+k'); // on Linux

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
});
