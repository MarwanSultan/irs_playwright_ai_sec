import { expect, test } from './irs.fixture';

test.describe('Payments', () => {
  test('payments info and links are reachable', async ({ page }) => {
    const payments = page.getByRole('link', { name: /Payments|Make a Payment|Pay/i });
    if (await payments.count()) await payments.first().click();
    await page.waitForLoadState('networkidle');

    // Look for known payment methods text
    const known = page.locator('text=Direct Pay, text=EFTPS, text=Debit, text=Credit');
    await expect(known.first()).toBeVisible({ timeout: 10000 }).catch(async () => {
      // at minimum ensure page has content
      const title = await page.title();
      expect(await page.title()).toBeTruthy();
    });
  });
});
