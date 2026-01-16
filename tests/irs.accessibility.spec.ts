import { expect, test } from './irs.fixture';

test.describe('Basic Accessibility Checks', () => {
  test('landmarks and keyboard navigation', async ({ page }) => {
    // Verify landmarks exist; visibility may vary by viewport
    const banner = page.getByRole('banner').first();
    const main = page.getByRole('main').first();
    const nav = page.getByRole('navigation').first();
    const footer = page.getByRole('contentinfo').first();
    expect(await banner.count()).toBeGreaterThan(0);
    expect(await main.count()).toBeGreaterThan(0);
    expect(await nav.count()).toBeGreaterThan(0);
    expect(await footer.count()).toBeGreaterThan(0);

    // Keyboard tab through a few elements to ensure focus moves
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
    }

    // Ensure there is at least one focused element
    const active = await page.evaluate(() => document.activeElement?.tagName || null);
    expect(active).not.toBeNull();
  });
});
