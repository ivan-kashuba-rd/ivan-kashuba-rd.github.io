import { readFileSync } from 'node:fs';

const reportPath = process.argv[2] || '.lighthouseci/lume.json';
const report = JSON.parse(reportPath === '-' ? readFileSync(0, 'utf8') : readFileSync(reportPath, 'utf8'));
const requirements = {
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9
};
const warnings = {
  performance: 0.8
};
const failures = [];

for (const [category, minimum] of Object.entries(requirements)) {
  const score = report.categories?.[category]?.score;
  if (!Number.isFinite(score) || score < minimum) {
    failures.push(`${category}: ${score ?? 'missing'}; required ${minimum}.`);
  }
}

for (const [category, minimum] of Object.entries(warnings)) {
  const score = report.categories?.[category]?.score;
  if (!Number.isFinite(score) || score < minimum) {
    console.warn(`Lighthouse warning — ${category}: ${score ?? 'missing'}; target ${minimum}.`);
  }
}

if (failures.length) {
  console.error('Lighthouse quality budgets failed:');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Lighthouse accessibility, best-practices and SEO budgets passed.');
}
