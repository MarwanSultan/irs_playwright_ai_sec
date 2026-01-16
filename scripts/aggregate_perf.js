const fs = require('fs');
const path = require('path');

function findPerfFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findPerfFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.json') && full.includes(path.join('perf', ''))) {
      results.push(full);
    }
  }
  return results;
}

const root = process.cwd();
const files = findPerfFiles(root);
const summary = {};

for (const f of files) {
  try {
    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    const name = path.basename(f, '.json');
    if (!summary[name]) summary[name] = { count: 0, totalMs: 0, samples: [] };
    const ms = data.measuredDurationMs || (data.navTiming && data.navTiming.loadEventEnd) || 0;
    summary[name].count += 1;
    summary[name].totalMs += ms;
    summary[name].samples.push({ file: f, ms, url: data.url || null });
  } catch (e) {
    // ignore parse errors
  }
}

const out = { generatedAt: new Date().toISOString(), summary };
const outFile = path.join(root, 'perf-summary.json');
fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
console.log('Wrote', outFile, 'with', Object.keys(summary).length, 'entries');
