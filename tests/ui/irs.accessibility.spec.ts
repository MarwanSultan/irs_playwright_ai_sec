import { expect, test } from '../fixtures/irs.fixture';

test.describe('Accessibility surface checks', () => {
  test('landmarks and headings present', async ({ page }) => {
    // Basic checks for ARIA landmarks and headings
    const banner = page.getByRole('banner');
    const main = page.getByRole('main');
    const heading = page.locator('h1, h2').first();

    expect(await banner.count()).toBeGreaterThan(0);
    expect(await main.count()).toBeGreaterThan(0);
    expect(await heading.count()).toBeGreaterThan(0);
  });
});
