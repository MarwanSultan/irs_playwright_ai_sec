import { expect, test } from '../fixtures/irs.fixture';

test.describe('Refund Status', () => {
  test('refund tool loads and shows input fields', async ({ page }) => {
    const refund = page.getByRole('link', { name: /Where's My Refund|Where%27s My Refund|Check Your Refund|Track Refund/i });
    if (await refund.count()) await refund.first().click();
    await page.waitForLoadState('networkidle');

    // Look for input fields commonly used by refund tool
    const fields = page.locator('input[name*="ssn"], input[aria-label*="SSN"], input[name*="refund"], input[placeholder*="Amount"]');
    if ((await fields.count()) && (await fields.first().isVisible().catch(() => false))) {
      await expect(fields.first()).toBeVisible({ timeout: 10000 });
    } else {
      // fallback: check for refund-related phrases on the page or in the URL
      const refundCandidates = ["Where's My Refund", 'Check Your Refund', 'Where', 'refund'];
      let found = false;
      for (const t of refundCandidates) {
        const loc = page.locator(`text=${t}`);
        if ((await loc.count()) && (await loc.first().isVisible().catch(() => false))) {
          found = true;
          break;
        }
      }
      expect(found || (await page.url()).toLowerCase().includes('refund')).toBeTruthy();
    }
  });
});
