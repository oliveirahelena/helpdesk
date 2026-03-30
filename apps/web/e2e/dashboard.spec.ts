import { expect, test } from "@playwright/test";

test("renders dashboard placeholder shell", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByText(/Operational foundation ready/i)).toBeVisible();
});
