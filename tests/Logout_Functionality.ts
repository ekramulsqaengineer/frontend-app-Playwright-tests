import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('TC-LOGOUT-01: Logout Functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('validuser@example.com', 'ValidPassword123');

  await dashboard.logout();
  // Expect login page
  await page.locator('#loginButton').isVisible();
});
