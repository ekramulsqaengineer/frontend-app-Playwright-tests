import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: 'html',
  
use: {
  baseURL: 'http://localhost:5004',
  trace: 'on',
  video: 'on', // Eta add korle protiti test-er video record hobe
  headless: true,
},

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  // Shurute webServer bad diye check korun tests load hoy kina
});