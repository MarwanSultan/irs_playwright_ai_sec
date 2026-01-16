import { expect, test } from '@playwright/test';

const endpoints = [
  'https://www.irs.gov/',
  'https://www.irs.gov/forms-pubs',
  'https://www.irs.gov/contact-us',
  'https://www.irs.gov/newsroom',
  'https://www.irs.gov/robots.txt',
  'https://www.irs.gov/sitemap.xml'
];

test.describe('Public endpoint status', () => {
  for (const url of endpoints) {
    test(`GET ${url}`, async ({ request }) => {
      const resp = await request.get(url, { timeout: 15000 });
      // Non-5xx responses are acceptable for monitoring
      expect(resp.status()).toBeLessThan(500);
      const ct = resp.headers()['content-type'] || '';
      expect(ct.length).toBeGreaterThan(0);
    });
  }
});
