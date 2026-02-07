import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MeetingAnalyzerPage } from '../pages/MeetingAnalyzerPage';

test('TC-ANALYSIS-01: Analyze Meeting Transcript', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const analyzer = new MeetingAnalyzerPage(page);

  await loginPage.goto();
  await loginPage.login('validuser@example.com', 'ValidPassword123');

  await dashboard.goToMeetingAnalyzer();
  await analyzer.analyzeTranscript('Meeting transcript content here...');
  await analyzer.expectAnalysisResult();
});
