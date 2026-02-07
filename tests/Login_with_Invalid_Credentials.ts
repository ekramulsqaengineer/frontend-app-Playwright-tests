import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('TC-LOGIN-02: Login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invaliduser@example.com', 'WrongPassword');
  await loginPage.expectLoginError();
});
