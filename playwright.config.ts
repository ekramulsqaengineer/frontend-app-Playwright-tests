import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration
 * See https://playwright.dev/docs/test-configuration
 */

// CI এনভায়রনমেন্ট চেক করার জন্য 'process' এর বদলে 'globalThis' ব্যবহার করা হয়েছে যা টাইপ এরর দূর করবে
const isCI = !!(globalThis as any).process?.env?.CI;

export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5004',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests.
    এটি CI-তে 'net::ERR_CONNECTION_REFUSED' সমস্যা সমাধান করবে।
  */
  webServer: {
    command: 'npm run dev', // আপনার প্রোজেক্ট রান করার আসল কমান্ডটি এখানে লিখুন
    url: 'http://localhost:5004',
    reuseExistingServer: !isCI,
    timeout: 120 * 1000, // সার্ভার স্টার্ট হওয়ার জন্য পর্যাপ্ত সময় দিন
  },
});