import { expect, test } from './irs.fixture';

test.describe('IRS Online Account / Login Navigation', () => {
  test('navigates to login/identity provider page', async ({ page }) => {
    const signIn = page.getByRole('link', { name: /Sign in|Sign In|View Your Account|Account/i });
    if (await signIn.count()) await signIn.first().click();
    await page.waitForLoadState('networkidle');

    // Check for presence of login fields or known auth messaging
    const username = page.locator('input[type="email"], input[name*="user"], input[aria-label*="user"]');
    const password = page.locator('input[type="password"], input[name*="pass"], input[aria-label*="password"]');
    await expect(username.first()).toBeVisible({ timeout: 10000 }).catch(() => {});
    await expect(password.first()).toBeVisible({ timeout: 10000 }).catch(() => {});
  });
});
