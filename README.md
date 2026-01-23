# IRS Playwright Test Suite with Agentic AI & Security


[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40+-green.svg)](https://playwright.dev/)
[![Security](https://img.shields.io/badge/Security-CodeQL%20%2B%20ZAP-red.svg)](https://github.com/features/security)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue.svg)](https://github.com/features/actions)

Production-ready test automation framework for government web applications with UI, API, performance, and security testing.


---

## Overview

A comprehensive Playwright test suite for `irs.gov` demonstrating enterprise-grade QA automation architecture. This portfolio project showcases best practices for security-aware testing, modular test design, and CI/CD integration suitable for federal and regulated environments.

---

## Features

- **Multi-Layer Testing** — UI, API, and performance tests in one framework
- **Security-First Design** — CodeQL analysis, dependency scanning, OWASP ZAP integration
- **Agentic AI** — MCP (Model Context Protocol) server for intelligent test orchestration
- **Resilient Tests** — ARIA-based selectors and accessibility-friendly assertions
- **Enterprise Architecture** — Reusable fixtures, modular structure, clear separation of concerns
- **CI/CD Ready** — GitHub Actions with automated security and quality controls

---

## Quick Start

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
git clone https://github.com/MarwanSultan/irs_playwright_ai_sec.git
cd irs_playwright_ai_sec
npm ci
npx playwright install
```

### Run Tests

```bash
npx playwright test                # All tests
npx playwright test tests/ui       # UI tests only
npx playwright test tests/API      # API tests only
npx playwright test tests/perf     # Performance tests only
npx playwright show-report         # View HTML report
```

---

## Test Structure

```
tests/
├── ui/          # UI & functional tests (irs.gov user flows)
├── API/         # API validation tests (backend services)
├── perf/        # Performance & timing checks
└── fixtures/    # Shared Playwright fixtures
```

### Fixtures

The `irs.fixture.ts` provides a canonical fixture that automatically navigates to `https://www.irs.gov` before each test, ensuring consistent state across all test suites.

---

## Security Controls

Built-in security measures reflect real enterprise QA:

**Automated Security:**
- Dependency vulnerability scanning via GitHub Actions
- CodeQL static analysis for code quality
- OWASP ZAP scanning for web vulnerabilities (optional)

**Enable ZAP Scanning:**
```bash
# Add GitHub secret:
ZAP_TARGET_URL=https://www.irs.gov
```

These controls ensure automation extends beyond functional correctness into security and risk management.

---

## CI/CD Pipeline

GitHub Actions workflow includes:
- Dependency audits
- CodeQL analysis
- Playwright test execution (headless)
- HTML report generation and artifacts
- Optional OWASP ZAP security scans

Mirrors pipelines commonly used in federal, financial, and regulated environments.

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Playwright 1.40+ |
| Language | TypeScript 5.0+ |
| AI Orchestration | MCP Server, Claude AI |
| Security | CodeQL, OWASP ZAP |
| CI/CD | GitHub Actions |
| Runtime | Node.js 18+ |

---

## Best Practices Demonstrated

- **Separation of Concerns** — UI, API, and performance tests isolated by directory
- **Reusable Fixtures** — Consistent setup/teardown across test suites
- **Resilient Selectors** — ARIA roles and labels over brittle CSS selectors
- **Smart Assertions** — Avoid exact text matching; use behavior-based assertions
- **CI-First Mindset** — Security integrated into the pipeline
- **Performance Tracking** — JSON artifacts for trend analysis via `aggregate_perf.js`

---

## Scripts

### Aggregate Performance Data

```bash
node scripts/aggregate_perf.js
```
Collects performance metrics from all test runs for trend analysis.

---

## Configuration

### Playwright Config (playwright.config.ts)

Customize test behavior:

```typescript
{
  fullyParallel: true,
  workers: 4,
  retries: 1,
  timeout: 30000,
  use: {
    baseURL: 'https://www.irs.gov',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  }
}
```

---

## Reporting

- **HTML Reports** — Generated automatically in `playwright-report/`
- **Artifacts** — Performance JSON and screenshots uploaded to GitHub Actions
- **Performance Trends** — Aggregated via `scripts/aggregate_perf.js`

---

## Contributing

1. Add tests under appropriate directory (`tests/ui`, `tests/API`, `tests/perf`)
2. Update `spec/irs_core_test_plan.md` with new coverage
3. Run tests locally before submitting PR:
   ```bash
   npx playwright test <path>
   ```
4. Ensure no security warnings in CodeQL scan

---

## Why This Project Matters

This repository demonstrates **how automation should scale** in enterprise and government environments:

- Real-world QA automation architecture
- Enterprise CI/CD and security expectations
- Maintainability and clarity over test volume
- Practical testing strategies for regulated systems

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Security](https://docs.github.com/en/actions/security-guides)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Support

- [Issues](https://github.com/MarwanSultan/irs_playwright_ai_sec/issues)
- [Discussions](https://github.com/MarwanSultan/irs_playwright_ai_sec/discussions)
- Author: [Marwan Sultan](https://github.com/MarwanSultan)
