import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const isCi = Boolean(process.env.CI);

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
const reporter: PlaywrightTestConfig['reporter'] = isCi ? 'html' : 'dot';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  reporter,
  use: {
    actionTimeout: 0,
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};

export default config;
