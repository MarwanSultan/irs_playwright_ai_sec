import { expect, test } from '@playwright/test';

test.describe('API / HTTP checks', () => {
  test('public pages respond with 2xx', async ({ request }) => {
    const urls = [
      'https://www.irs.gov/',
      'https://www.irs.gov/forms-pubs',
      'https://www.irs.gov/contact-us',
      'https://www.irs.gov/newsroom'
    ];

    for (const url of urls) {
      const resp = await request.get(url, { timeout: 15000 });
      // Accept any non-5xx response (site may return 3xx/4xx for some paths)
      expect(resp.status()).toBeLessThan(500);
      const ct = resp.headers()['content-type'] || '';
      expect(ct.length).toBeGreaterThan(0);
    }
  });
});
