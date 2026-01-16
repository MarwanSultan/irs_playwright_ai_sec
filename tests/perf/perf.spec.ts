import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'homepage', url: 'https://www.irs.gov/' },
  { name: 'forms', url: 'https://www.irs.gov/forms-pubs' },
  { name: 'search-1040', url: 'https://www.irs.gov/search?q=1040' },
];

test.describe('Performance benchmarks', () => {
  for (const p of pages) {
    test(`${p.name} navigation metrics`, async ({ page }, testInfo) => {
      const start = Date.now();
      const resp = await page.goto(p.url, { waitUntil: 'load', timeout: 60000 });

      // Prefer Navigation Timing Level 2 if available, otherwise fallback to legacy timing
      const navTiming = await page.evaluate(() => {
        const nav = (performance.getEntriesByType('navigation') || [])[0];
        if (nav && (nav as any).toJSON) return (nav as any).toJSON();
        // legacy
        // @ts-ignore
        return (window.performance && window.performance.timing) ? window.performance.timing : {};
      });

      const duration = Date.now() - start;
      const metrics = {
        url: p.url,
        status: resp?.status(),
        measuredDurationMs: duration,
        navTiming,
        timestamp: new Date().toISOString(),
      } as const;

      const outDir = testInfo.outputPath('perf');
      fs.mkdirSync(outDir, { recursive: true });
      const filename = path.join(outDir, `${p.name}.json`);
      fs.writeFileSync(filename, JSON.stringify(metrics, null, 2));

      // Soft thresholds to flag regressions without being overly strict
      const loadTime = (navTiming && (navTiming.loadEventEnd || navTiming.loadEventEnd === 0)) ? navTiming.loadEventEnd : duration;
      const responseStart = navTiming && (navTiming.responseStart || navTiming.responseStart === 0) ? navTiming.responseStart : 0;

      // Expect page load to complete within 15s and responseStart within 5s
      expect(loadTime).toBeLessThanOrEqual(15000);
      expect(responseStart).toBeLessThanOrEqual(5000);
    });
  }
});
