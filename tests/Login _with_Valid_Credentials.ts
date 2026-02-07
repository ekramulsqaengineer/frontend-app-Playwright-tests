import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('TC-LOGIN-01: Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('validuser@example.com', 'ValidPassword123');
  await loginPage.expectDashboard();
});
