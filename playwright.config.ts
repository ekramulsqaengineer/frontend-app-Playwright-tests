import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: true,
    baseURL: 'http://localhost:5004',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
