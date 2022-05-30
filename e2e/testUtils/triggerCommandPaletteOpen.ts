import { Page } from '@playwright/test';
import { checkMac } from './checkMac';

export async function triggerCommandPaletteOpen(page: Page) {
  const isMac = await checkMac(page);

  if (isMac) {
    await page.keyboard.press('Meta+k');
  } else {
    await page.keyboard.press('Control+k');
  }
}
