import { expect, test } from '@playwright/test';

test.describe('Search Autocomplete API', () => {
  test('autocomplete endpoint returns JSON for common query', async ({ request }) => {
    const url = 'https://www.irs.gov/search_api_autocomplete/pup_site_index_search?display=site_search_srt_relevance&&filter=search&q=1040';
    const resp = await request.get(url, { timeout: 10000 });
    expect(resp.status()).toBeLessThan(500);
    const ct = resp.headers()['content-type'] || '';
    expect(ct).toContain('json');
    const body = await resp.json().catch(() => null);
    expect(body).not.toBeNull();
  });
});
