/**
 * E2E Smoke Test: アプリケーション基本動作確認
 */
import { test, expect } from "@playwright/test";

test.describe("Application Smoke Test", () => {
  test("should load home page correctly", async ({ page }) => {
    await page.goto("/");

    // タイトルの確認
    await expect(page).toHaveTitle("My Static WebSite");

    // ローディング完了後のコンテンツ確認
    await expect(page.getByRole("heading", { name: /Welcome to My Static Site/ })).toBeVisible({
      timeout: 5000,
    });

    // エラーページに遷移していないことを確認
    await expect(page).not.toHaveURL(/error/);
  });
});
