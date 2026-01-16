import { expect, test } from './irs.fixture';

test.describe('Language Switching', () => {
  test('switches to Spanish when available', async ({ page }) => {
    const spanish = page.getByRole('link', { name: /Español|Espanol/i });
    if (await spanish.count()) {
      await spanish.first().click();
      await page.waitForLoadState('networkidle');

      const candidates = ['Español', 'Inicio', 'Página', 'Página principal', 'Inicio'];
      let found = false;
      for (const txt of candidates) {
        const locator = page.locator(`text=${txt}`);
        if ((await locator.count()) && (await locator.first().isVisible().catch(() => false))) {
          found = true;
          break;
        }
      }
      expect(found).toBeTruthy();
    } else {
      test.skip(true, 'Spanish language selector not present');
    }
  });
});
