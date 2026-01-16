# IRS Playwright Test Suite

Concise Playwright test suite for smoke, functional, API and performance checks targeting https://www.irs.gov.

Overview
- Tests are written in TypeScript using Playwright Test runner.
- Tests are grouped into `tests/ui`, `tests/API`, and `tests/perf` with shared fixtures in `tests/fixtures`.

Quickstart
1. Install dependencies:

```bash
npm ci
```

2. Run all tests locally:

```bash
npx playwright test
```

3. Run a subset:

```bash
npx playwright test tests/ui
npx playwright test tests/API
npx playwright test tests/perf
```

Fixtures
- Canonical fixture: `tests/fixtures/irs.fixture.ts` — overrides `page` to navigate to `https://www.irs.gov` before each test.

CI / GitHub Actions
- The repository includes a GitHub Actions workflow to run dependency audits, CodeQL, and Playwright tests with artifact uploads and optional ZAP scanning.
- Configure secret `ZAP_TARGET_URL` to enable the OWASP ZAP job in CI.

Best practices
- Keep `tests/ui` focused on user-facing flows; keep API checks in `tests/API` and long-running perf checks in `tests/perf`.
- Use the canonical fixture for consistent startup state.
- Prefer resilient selectors (roles, aria labels); avoid brittle exact-title assertions.
- Use `test.skip` for migrated files during reorgs to avoid duplicate runs.

Reporting and artifacts
- Playwright HTML report generated to `playwright-report/` after runs.
- Performance JSON artifacts are aggregated by `scripts/aggregate_perf.js` into a perf summary.

Contributing
- Add new tests under the appropriate directory and update `spec/irs.core.testplan.md`.
- Run `npx playwright test <path>` locally before submitting PRs.

Contact
- For repo-level questions, open an issue.
