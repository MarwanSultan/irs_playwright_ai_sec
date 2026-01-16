import { expect, test } from './irs.fixture';

test.describe('IRS Homepage', () => {
  test('loads and shows key elements', async ({ page }) => {
    // Title may not include the acronym 'IRS' — accept common variants
    await expect(page).toHaveTitle(/Internal Revenue Service|IRS|official website/i);

    // Banner/header
    await expect(page.getByRole('banner').first()).toBeVisible();

    // Navigation may be hidden behind a toggle depending on viewport; assert presence instead
    const nav = page.getByRole('navigation').first();
    expect(await nav.count()).toBeGreaterThan(0);

    // Search input (robust selector)
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

    if (!search) {
      // If there's no visible search input, ensure the DOM contains a search input (may be hidden/responsive)
      let foundAny = false;
      for (const s of selectors) {
        if ((await page.locator(s).count()) > 0) {
          foundAny = true;
          break;
        }
      }
      expect(foundAny).toBeTruthy();
    }
  });
});
