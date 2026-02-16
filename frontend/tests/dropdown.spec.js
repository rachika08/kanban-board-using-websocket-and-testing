
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("User can select priority and create task", async ({ page }) => {
  const taskName = `Priority Task ${Date.now()}`;

  await page.fill('[data-testid="task-input"]', taskName);

  // Click priority dropdown (force click in case it's hidden)
  await page.locator('[data-testid="priority-select"]').first().click({ force: true });

  // Wait for "High" option to appear and click
  const highOption = page.locator('[role="option"]', { hasText: "High" });
  await highOption.waitFor({ state: "visible" });
  await highOption.click();

  await page.click('[data-testid="add-task-btn"]');

  await expect(
    page.locator('[data-testid^="task-"]').filter({ hasText: taskName })
  ).toContainText("High");
});

test("User can select category and create task", async ({ page }) => {
  const taskName = `Category Task ${Date.now()}`;

  await page.fill('[data-testid="task-input"]', taskName);

  // Click category dropdown (force click in case it's hidden)
  await page.locator('[data-testid="category-select"]').first().click({ force: true });

  // Wait for "Feature" option to appear and click
  const featureOption = page.locator('[role="option"]', { hasText: "Feature" });
  await featureOption.waitFor({ state: "visible" });
  await featureOption.click();

  await page.click('[data-testid="add-task-btn"]');

  await expect(
    page.locator('[data-testid^="task-"]').filter({ hasText: taskName })
  ).toContainText("Feature");
});
