import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { KnowledgeBasePage } from '../pages/KnowledgeBasePage';

test('TC-KB-01: Search Knowledge Base', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const kbPage = new KnowledgeBasePage(page);

  await loginPage.goto();
  await loginPage.login('validuser@example.com', 'ValidPassword123');

  await dashboard.goToKnowledgeBase();
  await kbPage.search('Keyword');
  await kbPage.expectResults();
});
