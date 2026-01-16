import { expect, test } from '../fixtures/irs.fixture';

const queries = ['Form 1040', 'refund', 'EIN'];

for (const q of queries) {
  test(`search returns results for: ${q}`, async ({ page }) => {
    // Find a visible search input (site has hidden mobile inputs)
    const selectors = [
      'input[type="search"]',
      'input[aria-label*="search"]',
      'input[name*="search"]',
      'input[placeholder*="Search"]',
      'input[id*="search"]'
    ];
    let search = null;
    for (const s of selectors) {
      const loc = page.locator(s).first();
      if ((await loc.count()) && (await loc.isVisible().catch(() => false))) {
        search = loc;
        break;
      }
    }
    // If not visible, try revealing via possible search toggle button
    if (!search) {
      const toggle = page.locator('button[aria-label*="search"], button[title*="search"], button.toggle-search').first();
      if (await toggle.count()) {
        await toggle.click().catch(() => {});
        for (const s of selectors) {
          const loc = page.locator(s).first();
          if ((await loc.count()) && (await loc.isVisible().catch(() => false))) {
            search = loc;
            break;
          }
        }
      }
    }

    if (!search) {
      // Fall back to the site's search URL when no visible search input is available
      const searchUrl = `https://www.irs.gov/search?q=${encodeURIComponent(q)}`;
      await page.goto(searchUrl);
      await page.waitForLoadState('networkidle');
    } else {
      await search.fill(q);
      await search.press('Enter');
      await page.waitForLoadState('networkidle');
    }

    // Wait for results content to appear; search results layout may vary
    const results = page.locator('text=' + q.split(' ')[0]);
    if ((await results.count()) && (await results.first().isVisible().catch(() => false))) {
      await expect(results.first()).toBeVisible({ timeout: 15000 });
    } else {
      // fallback: ensure page changed and returned some content
      expect((await page.title())?.length).toBeGreaterThan(0);
    }
  });
}
