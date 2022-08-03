import { test, expect, Page } from '@playwright/test';
import { checkMac } from './testUtils/checkMac';

async function triggerCommandPaletteOpen(page: Page) {
  const isMac = await checkMac(page);

  if (isMac) {
    await page.keyboard.press('Meta+k');
  } else {
    await page.keyboard.press('Control+k');
  }
}

test.describe('Test basic interactions of Command Palette', () => {
  test('should be able to open command palette & run first action', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await page.click('text=Increment Counter by 1');
    await expect(page.locator('strong >> text=1')).toBeVisible();
  });

  test('should be able to search for actions in command palette', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await page.keyboard.type('GitHub');

    const searchLocator = page.locator('role=searchbox[name*="Search for an action"]');
    await expect(searchLocator).toHaveValue('GitHub');

    const optionLocator = page.locator(
      'role=combobox[name*="Search for an action"] >> role=option'
    );

    const optionsNum = await optionLocator.count();
    expect(optionsNum).toBe(1);

    await expect(optionLocator.first()).toContainText('Go to GitHub repo');
  });

  test('should be able to navigate between actions using keyboard', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    // Navigate to third action by pressing Down key twice.
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const optionLocator = page.locator(
      'role=combobox[name*="Search for an action"] >> role=option'
    );
    let isThirdOptionSelected = await optionLocator.nth(2).getAttribute('aria-selected');

    expect(isThirdOptionSelected).toEqual('true');

    // Navigate to second action by pressing Up key once.
    await page.keyboard.press('ArrowUp');

    isThirdOptionSelected = await optionLocator.nth(2).getAttribute('aria-selected');
    const isSecondOptionSelected = await optionLocator.nth(1).getAttribute('aria-selected');

    expect(isThirdOptionSelected).toEqual('false');
    expect(isSecondOptionSelected).toEqual('true');
  });

  test('should only render Unmute Audio action when muted', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    const paletteLocator = page.locator('role=combobox[name*="Search for an action"]');
    await expect(paletteLocator).not.toContainText('Unmute');

    await page.keyboard.press('Escape');
    const unmuteLabelLocator = page.locator('label >> text=Audible');
    await unmuteLabelLocator.check();
    await triggerCommandPaletteOpen(page);
    await paletteLocator.locator('text=Unmute').click();

    await expect(unmuteLabelLocator).toBeChecked({
      checked: false,
    });
  });

  test('should be able to run nested actions', async ({ page }) => {
    await page.goto('/demo');
    await triggerCommandPaletteOpen(page);

    await page.keyboard.type('Profile');

    const optionLocator = page.locator(
      'role=combobox[name*="Search for an action"] >> role=option'
    );

    await optionLocator.locator('text=Set profile').click();

    const searchLocator = page.locator('role=searchbox[name*="Search for an action"]');
    await expect(searchLocator).toHaveValue('');

    const optionsNum = await optionLocator.count();
    expect(optionsNum).toBe(2);

    await optionLocator.locator('text=Set to Work profile').click();

    const profileStatusLocator = page
      .locator('section', {
        hasText: 'Nested actions',
      })
      .last()
      .locator('text=Active profile is work');

    await expect(profileStatusLocator).toBeVisible();
  });
});
