import { test } from '@playwright/test';

test('main page', async ({ page }) => {
  await page.goto('/');
});
