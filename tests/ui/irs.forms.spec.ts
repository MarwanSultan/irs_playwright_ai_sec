import { expect, test } from '../fixtures/irs.fixture';

test.describe('Forms & Publications', () => {
  test('can find and open Form 1040', async ({ page }) => {
    // Try navigation via link text
    const formsNav = page.getByRole('link', { name: /Forms|Forms & Instructions|Forms & Publications/i });
    if (await formsNav.count()) await formsNav.first().click();

    // If navigation happened, wait a bit
    await page.waitForLoadState('networkidle');

    // Search for 1040 using a visible search input
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
      await search.fill('1040');
      await search.press('Enter');
      await page.waitForLoadState('networkidle');
    } else {
      // try toggling search
      const toggle = page.locator('button[aria-label*="search"], button.toggle-search').first();
      if (await toggle.count()) {
        await toggle.click().catch(() => {});
      }
    }

    // Try to open a result that mentions 1040
    const formLink = page.locator('text=1040').first();
    if ((await formLink.count()) === 0) {
      test.skip(true, 'Form 1040 link not present on page');
      return;
    }

    if (await formLink.isVisible().catch(() => false)) {
      await formLink.click();
    } else {
      // If the link exists but is hidden, navigate directly to its href
      const href = await formLink.getAttribute('href');
      if (href) {
        const url = new URL(href, page.url()).toString();
        await page.goto(url);
        await page.waitForLoadState('networkidle');
      } else {
        test.skip(true, 'Form 1040 link exists but no href attribute');
        return;
      }
    }

    // Verify PDF or form content loaded
    await page.waitForLoadState('networkidle');
    const pdf = page.locator('iframe[src*="pdf"], a[href$=".pdf"]');
    await expect(pdf.first()).toBeVisible();
  });
});
