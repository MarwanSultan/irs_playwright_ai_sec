import { expect, test } from '../fixtures/irs.fixture';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // page is already navigated to https://www.irs.gov by the fixture
    await expect(page).toHaveTitle(/^Internal Revenue Service/);
  });
});
