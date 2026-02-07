import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MeetingAnalyzerPage } from '../pages/MeetingAnalyzerPage';

test('TC-ANALYSIS-02: Analyze Empty Transcript', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const analyzer = new MeetingAnalyzerPage(page);

  await loginPage.goto();
  await loginPage.login('validuser@example.com', 'ValidPassword123');

  await dashboard.goToMeetingAnalyzer();
  await analyzer.analyzeEmpty();
  await analyzer.expectTranscriptError();
});
