import { Page } from '@playwright/test';

export async function checkMac(page: Page) {
  const platform = await page.evaluate(() => window.navigator.platform);
  const isMac = platform.includes('Mac');

  return isMac;
}
