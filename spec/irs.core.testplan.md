**Overview**
- **Purpose:** Canonical test plan enumerating automated UI, API, and performance tests for the IRS Playwright suite.
- **Repo root:** `/` (Playwright + Node.js test runner)

**Test Suites**
- **UI tests (Playwright fixtures):** Located under [tests/ui](tests/ui)
  - `irs.homepage.spec.ts`: homepage smoke and key-element checks
  - `irs.search.spec.ts`: data-driven search queries and results validation
  - `irs.forms.spec.ts`: find/open Form 1040 and verify PDF/form content
  - `irs.formlookup.spec.ts`: data-driven form lookups (`1040`, `941`, `946`)
  - `irs.refund.spec.ts`: refund tool navigation and input presence
  - `irs.contact.spec.ts`: contact/help page and contact-locator flow
  - `irs.accessibility.spec.ts`: basic ARIA landmarks and focus/keyboard checks
  - `irs.language.spec.ts`: language selector / Spanish selector checks
  - `irs.login.spec.ts`: navigation to login/account page (non-auth)
  - `irs.payments.spec.ts`: payments page/link checks
  - `seed.spec.ts`: lightweight smoke test that uses the fixture

- **API tests (Playwright request fixture):** Located under [tests/API](tests/API)
  - `api.status.spec.ts`: public endpoint status and content-type checks
  - `api.search_autocomplete.spec.ts`: search/autocomplete endpoint behavior
  - `api.sitemap.spec.ts`: sitemap.xml reachable and contains <loc> entries
  - `irs.api.spec.ts`: additional HTTP checks (moved here from root)

- **Performance tests:** Located under [tests/perf](tests/perf)
  - `perf.spec.ts`: collects navigation/perf metrics and emits JSON artifacts
  - Aggregation script: `scripts/aggregate_perf.js` — consolidates perf JSON into `perf-summary.json`

- **Fixtures:**
  - Canonical fixture: [tests/fixtures/irs.fixture.ts](tests/fixtures/irs.fixture.ts) — overrides `page` to navigate to `https://www.irs.gov` before each test.

**CI / Workflow Notes**
- The GitHub Actions workflow runs Playwright tests, includes dependency-audit and CodeQL jobs, and uploads Playwright artifacts and perf artifacts for aggregation.
- An optional OWASP ZAP baseline job exists and is gateable via repository secrets (`ZAP_TARGET_URL`).

**How to run locally**
- Install dependencies:

```bash
npm ci
```

- Run the whole suite:

```bash
npx playwright test
```

- Run a specific category:

```bash
npx playwright test tests/ui
npx playwright test tests/API
npx playwright test tests/perf
```

**Artifact locations**
- Playwright HTML report: `playwright-report/`
- Perf JSON outputs created in the Playwright output directory per run and aggregated by `scripts/aggregate_perf.js`.

**Test maintenance notes**
- Keep `tests/fixtures/irs.fixture.ts` as the canonical fixture; remove duplicates if they appear elsewhere.
- When moving tests, update relative imports to `../fixtures/irs.fixture` (UI files) or use `@playwright/test` for API-only specs.
- Use `test.skip` for legacy/migrated files if you prefer non-destructive moves before deleting originals.

**Next actions / backlog**
- Add CI badge(s) to `README.md` after the workflow is committed and runs successfully.
- Add threshold/assertions for perf tests and alerting for regressions.
- Consider adding visual regression tests (Playwright snapshot) and accessibility scans (axe or pa11y) in CI.
