import { test, expect } from "@playwright/test";
import path from "path";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Clear localStorage
  await page.evaluate(() => localStorage.clear());

  // Reload after clearing
  await page.reload();

  // Wait for input to be ready
  await page.waitForSelector('[data-testid="task-input"]');
});

//User can upload image
//
test("User can upload an image file", async ({ page }) => {
  // Create task
  const input = page.locator('[data-testid="task-input"]');
  await input.click();
  await input.fill("Image Upload Task");
  await page.click('[data-testid="add-task-btn"]');

  // Click Edit on latest task
  await page.locator('[data-testid^="edit-"]').last().click();

  const filePath = path.resolve("tests/fixtures/sample.png");

  await page.setInputFiles('[data-testid="file-input"]', filePath);

  // Verify image preview appears
  await expect(
    page.locator("img.attachment-image").last()
  ).toBeVisible();

});


//
//User can upload PDF
//
test("User can upload a PDF file", async ({ page }) => {
  const input = page.locator('[data-testid="task-input"]');
  await input.click();
  await input.fill("PDF Upload Task");
  await page.click('[data-testid="add-task-btn"]');

  await page.locator('[data-testid^="edit-"]').last().click();

  const filePath = path.resolve("tests/fixtures/sample.pdf");

  await page.setInputFiles('[data-testid="file-input"]', filePath);

  // Verify PDF link appears
  await expect(
    page.getByRole("link", { name: /sample\.pdf/ }).last()
  ).toBeVisible();

});
