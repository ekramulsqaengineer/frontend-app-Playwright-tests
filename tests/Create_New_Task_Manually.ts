import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TasksPage } from '../pages/TasksPage';

test('TC-TASK-02: Create New Task Manually', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const tasksPage = new TasksPage(page);

  await loginPage.goto();
  await loginPage.login('validuser@example.com', 'ValidPassword123');

  await dashboard.goToTasks();
  await tasksPage.addTask('New Task Title', 'Task Description');
  await tasksPage.expectTaskVisible('New Task Title');
});
