# IRS Playwright Test Suite

A production‑style **Playwright test automation framework** demonstrating how to design, structure, and run **UI, API, performance, and security‑aware tests** for a real‑world government web application (**[https://www.irs.gov](https://www.irs.gov)**).

This project is intentionally built as a **portfolio and reference framework** to showcase modern QA automation best practices, clean test architecture, CI/CD integration, and security considerations aligned with enterprise and federal environments.

---

## 🎯 Project Objective

The goal of this project is to demonstrate how a Senior/Principal‑level QA Automation Engineer designs a scalable, maintainable, and security‑aware test framework — not just how to write individual tests.

This repository showcases:

* Clear separation of **UI, API, and performance testing** concerns
* Reusable **fixtures and shared setup** patterns
* **CI/CD automation** with GitHub Actions
* Built‑in **security and dependency scanning**
* Practical testing strategies suitable for **government and regulated systems**

---

## 🧪 Test Coverage

### UI Tests (`tests/ui`)

* Validate critical user‑facing flows and page behavior
* Emphasize accessibility‑friendly and resilient selectors (roles, aria labels)
* Avoid brittle assertions tied to exact text or page titles

### API Tests (`tests/API`)

* Validate backend responses and service availability
* Isolate API checks from UI flows to reduce execution time and flakiness

### Performance Tests (`tests/perf`)

* Capture basic performance metrics and response timing
* Generate JSON artifacts for aggregation and trend analysis

---

## 🧱 Project Structure

```
tests/
 ├── ui        # UI / functional tests
 ├── API       # API validation tests
 ├── perf      # Performance checks
 └── fixtures  # Shared Playwright fixtures
```

### Fixtures

* **Canonical fixture:** `tests/fixtures/irs.fixture.ts`
* Automatically navigates to `https://www.irs.gov` before each test
* Ensures a consistent and predictable starting state across test suites

---

## ⚡ Quickstart

### Install dependencies

```bash
npm ci
```

### Run all tests

```bash
npx playwright test
```

### Run a subset of tests

```bash
npx playwright test tests/ui
npx playwright test tests/API
npx playwright test tests/perf
```

---

## 🔐 Security & Quality Controls

This framework intentionally includes **security‑focused automation** to reflect real enterprise QA expectations.

### Implemented Security Measures

* **Dependency vulnerability scanning** via GitHub Actions
* **CodeQL static analysis** for code quality and security issues
* **Optional OWASP ZAP scanning** to detect common web vulnerabilities

To enable ZAP scanning in CI:

* Configure the GitHub secret:

  ```
  ZAP_TARGET_URL=https://www.irs.gov
  ```

These controls ensure that automation quality extends beyond functional correctness into **security and risk awareness**.

---

## 🔄 CI / GitHub Actions

The repository includes a GitHub Actions workflow that:

* Runs dependency audits
* Executes CodeQL analysis
* Runs Playwright tests headlessly
* Uploads Playwright HTML reports and artifacts
* Optionally runs OWASP ZAP security scans

This mirrors CI pipelines commonly used in **federal, financial, and regulated environments**.

---

## 📊 Reporting & Artifacts

* **Playwright HTML Report** generated after each run
* Output location:

  ```
  playwright-report/
  ```
* Performance JSON artifacts are aggregated via:

  ```
  scripts/aggregate_perf.js
  ```

---

## 🧠 Best Practices Demonstrated

* Clear separation of test concerns (UI vs API vs performance)
* Reusable fixtures for consistent setup and teardown
* Resilient selectors to reduce flakiness
* Avoidance of brittle assertions
* Strategic use of `test.skip` during refactors or test migrations
* CI‑first mindset with security built into the pipeline

---

## 🤝 Contributing

* Add new tests under the appropriate directory
* Update `spec/irs.core.testplan.md` when introducing new coverage
* Run targeted tests locally before submitting PRs:

  ```bash
  npx playwright test <path>
  ```

---

## 📌 Why This Project Matters

This repository is designed to demonstrate **how automation should scale**, not just how it runs.

It reflects:

* Real‑world QA automation architecture
* Enterprise CI/CD expectations
* Security‑aware testing practices
* Maintainability and clarity over test volume

---

## 📬 Contact

For repository‑level questions or suggestions, please open an issue.
