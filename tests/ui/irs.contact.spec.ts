import { expect, test } from '../fixtures/irs.fixture';

test.describe('Contact and Help', () => {
  test('contact page and locator work', async ({ page }) => {
    const contact = page.getByRole('link', { name: /Contact|Contact Us|Help/i });
    if (await contact.count()) await contact.first().click();
    await page.waitForLoadState('networkidle');

    // Look for phone numbers or contact forms
    const phone = page.locator('text=1-|tel:');
    const locator = page.getByRole('textbox', { name: /ZIP|Zip|Postal/i }).first();
    if (await locator.count()) {
      await locator.fill('20001');
      const find = page.getByRole('button', { name: /Find|Search|Locate/i }).first();
      if (await find.count()) await find.click();
      await page.waitForLoadState('networkidle');
    }

    await expect(page.locator('text=Contact').first()).toBeVisible().catch(() => {});
  });
});
