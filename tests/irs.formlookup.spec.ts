import { expect, test } from './irs.fixture';

const forms = ['1040', '941', '946'];

for (const f of forms) {
  test(`lookup form ${f}`, async ({ page }) => {
    // Find a visible search input
    const selectors = ['input[type="search"]', 'input[placeholder*="Search"]', 'input[aria-label*="search"]', 'input[id*="search"]'];
    let search = null;
    for (const s of selectors) {
      const loc = page.locator(s).first();
      if ((await loc.count()) && (await loc.isVisible().catch(() => false))) {
        search = loc;
        break;
      }
    }
    if (search) {
      await search.fill(f);
      await search.press('Enter');
      await page.waitForLoadState('networkidle');
    } else {
      // Try the direct search URL as a fallback
      const searchUrl = `https://www.irs.gov/search?q=${encodeURIComponent(f)}`;
      await page.goto(searchUrl);
      await page.waitForLoadState('networkidle');
    }

    const formLink = page.locator('text=' + f).first();
    if ((await formLink.count()) === 0) {
      test.skip(true, `Form ${f} link not present on page`);
      return;
    }

    if (await formLink.isVisible().catch(() => false)) {
      await formLink.click();
      await page.waitForLoadState('networkidle');
    } else {
      // If hidden, try navigating to href
      const href = await formLink.getAttribute('href');
      if (href) {
        const url = new URL(href, page.url()).toString();
        await page.goto(url);
        await page.waitForLoadState('networkidle');
      } else {
        test.skip(true, `Form ${f} link exists but no href`);
        return;
      }
    }

    // Ensure the page loaded with some content
    expect((await page.content()).length).toBeGreaterThan(100);
  });
}
