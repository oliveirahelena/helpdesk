import { expect, test } from "@playwright/test";

test("redirects unauthenticated users to the login page", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByText(/Sign in to access the operator workspace/i)).toBeVisible();
});
