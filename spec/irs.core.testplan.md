# IRS Core Functionality Test Plan

## Overview
Purpose: Verify the ten most important public-facing core functionalities of https://www.irs.gov. Each case is designed to be runnable manually or automated with Playwright. Tests assume a fresh browser context unless stated otherwise.

1) Homepage Load and Key Elements
- Objective: Confirm homepage loads and main UI elements are present.
- Preconditions: Fresh browser context.
- Steps: Open https://www.irs.gov. Verify title contains "IRS". Verify header/logo, primary navigation, and search box are visible.
- Expected: Page loads without errors; title contains "IRS"; header, nav and search are visible and interactive.

2) Site Search Functionality
- Objective: Verify site search returns relevant results.
- Preconditions: On homepage.
- Steps: Enter "Form 1040" in search; submit; wait for results; open top result.
- Expected: Results include Form 1040; results page loads and top result is relevant.

3) Forms & Publications Access and Download
- Objective: Ensure users can find and open/download public PDFs of forms.
- Preconditions: On homepage.
- Steps: Navigate to Forms & Instructions; search for "1040"; open the form detail; open/download PDF.
- Expected: Forms list loads; form detail opens; PDF viewer/download works.

4) Payments Information and Payment Options
- Objective: Verify payment options and informational pages are accessible.
- Preconditions: On homepage.
- Steps: Click Payments or Make a Payment; confirm listed payment methods and links; open one payment flow informational page.
- Expected: Payment options listed and links navigate to expected vendor/instruction pages with security notices.

5) Where's My Refund (Refund Status) Flow
- Objective: Validate navigation to refund-status tool and its inputs.
- Preconditions: On homepage.
- Steps: Open "Where's My Refund?" tool; verify fields (SSN/ITIN, filing status, refund amount); trigger client-side validation.
- Expected: Refund tool loads; fields present; validation messages shown for incomplete inputs.

6) IRS Online Account — Login Navigation
- Objective: Confirm link to IRS Online Account/login flow and presence of login UI.
- Preconditions: On homepage.
- Steps: Click "Sign in"/"View Your Account"; observe redirect to login identity provider; check for username/password or ID provider prompt.
- Expected: Redirect to recognizable login flow with input fields and security messaging; do not submit credentials.

7) Contact / Help Resources
- Objective: Verify contact information and help resources load and function.
- Preconditions: On homepage.
- Steps: Open Contact/Help; check phone numbers, online forms, and local office locator; run locator with a sample ZIP.
- Expected: Contact methods visible; locator returns results for sample ZIP; help content accessible.

8) Find Forms by Number (Direct Lookup)
- Objective: Validate form-number lookup returns correct form.
- Preconditions: On homepage or Forms page.
- Steps: Use form lookup or search for "Form 941"; verify result; open form details.
- Expected: Lookup returns the requested form link and the details page loads with metadata/instructions.

9) Basic Accessibility & Keyboard Navigation
- Objective: Ensure baseline accessibility: keyboard focus order, landmarks, alt text, labeled controls.
- Preconditions: Fresh browser context.
- Steps: Tab through header and main interactive elements; confirm landmarks (header, main, nav, footer); check images for alt text and form controls for labels.
- Expected: Logical focus order, landmarks present, images have alt text, and controls are labeled.

10) Language / Spanish Content Switching
- Objective: Verify language selector (Español) switches content to Spanish.
- Preconditions: On homepage.
- Steps: Locate and activate Spanish/other language selector; confirm visible UI strings change to Spanish; navigate to a couple of pages in Spanish.
- Expected: Page content switches to Spanish and navigation continues to function.

---
Notes:
- Convert each case to an automated Playwright spec file (suggested file names: tests/irs.homepage.spec.ts, tests/irs.search.spec.ts, etc.).
- Keep sensitive-data flows (login, refund tool) non-destructive: validate UI only, do not submit real personal data.
