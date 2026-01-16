import { expect, test } from '@playwright/test';

test.describe('Sitemap checks', () => {
  test('sitemap.xml is reachable and contains loc entries', async ({ request }) => {
    const url = 'https://www.irs.gov/sitemap.xml';
    const resp = await request.get(url, { timeout: 15000 });
    expect(resp.status()).toBeLessThan(500);
    const ct = resp.headers()['content-type'] || '';
    expect(ct.length).toBeGreaterThan(0);
    const text = await resp.text();
    // Basic checks: sitemap should be non-empty XML and contain <loc> entries
    expect(text.length).toBeGreaterThan(50);
    const locMatches = text.match(/<loc>\s*([^<]+)\s*<\/loc>/gi) || [];
    expect(locMatches.length).toBeGreaterThan(0);

    // Log a soft warning if forms-pubs isn't present, but don't fail the test
    if (!/forms-pubs/i.test(text)) {
      test.info().annotations.push({ type: 'notice', description: 'sitemap does not reference forms-pubs (soft)'} as any);
    }
  });
});
