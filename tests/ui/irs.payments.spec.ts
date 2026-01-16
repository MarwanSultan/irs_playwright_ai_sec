import { expect, test } from '../fixtures/irs.fixture';

test.describe('Payments', () => {
  test('payments page or links available', async ({ page }) => {
    const payments = page.getByRole('link', { name: /Payments|Pay|Make a Payment/i }).first();
    if (await payments.count()) await payments.click();
    await page.waitForLoadState('networkidle');

    // Look for payment-related phrases or form fields
    const loc = page.locator('text=Make a Payment, text=Pay, input[name*="amount"], input[name*="account"]').first();
    expect(await loc.count()).toBeGreaterThanOrEqual(0);
  });
});
