import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});
//create
test("User can create a task", async ({ page }) => {
  const taskName = `Playwright-${Date.now()}`;
  await page.fill('[data-testid="task-input"]', taskName);
  await page.click('[data-testid="add-task-btn"]');

  const task = page.locator('[data-testid^="task-"]', {
    hasText: taskName
  });

  await expect(task).toBeVisible()
  
});
//delete
test("User can delete a task", async ({ page }) => {
  const taskName = `Delete-${Date.now()}`;
  await page.fill('[data-testid="task-input"]', taskName);
  await page.click('[data-testid="add-task-btn"]');

  const task = page.locator('[data-testid^="task-"]', {
    hasText: taskName
  });

  await expect(task).toBeVisible();

  // click delete inside this task only
  await task.getByLabel("delete").click();

  await expect(task).toHaveCount(0);

  
});
