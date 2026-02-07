import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DecisionsPage } from '../pages/DecisionsPage';

test('TC-DECISION-01: View Decisions from Meeting', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const decisionsPage = new DecisionsPage(page);

  await loginPage.goto();
  await loginPage.login('validuser@example.com', 'ValidPassword123');

  await dashboard.goToDecisions();
  await decisionsPage.expectDecisions();
});
