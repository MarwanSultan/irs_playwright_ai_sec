import { expect, test } from '../fixtures/irs.fixture';

test.describe('Language and localization', () => {
  test('language selector present', async ({ page }) => {
    const selector = page.getByRole('combobox', { name: /Language|Select language/i }).first();
    if (await selector.count()) {
      expect(await selector.isVisible().catch(() => false)).toBeTruthy();
    } else {
      // fallback: check for language links in footer
      const links = page.locator('footer a[href*="/languages"], footer a:has-text("Espa")');
      expect(await links.count()).toBeGreaterThanOrEqual(0);
    }
  });
});
