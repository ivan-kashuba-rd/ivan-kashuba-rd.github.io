import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const site = resolve(repository, 'lume-riviera');
const read = path => readFileSync(resolve(site, path), 'utf8');
const html = read('index.html');
const plan = read('launch-plan.html');
const projectDocuments = [
  ['launch-plan.html', plan],
  ['client-questionnaire.html', read('client-questionnaire.html')],
  ['commercial-offer.html', read('commercial-offer.html')],
  ['account-matrix.html', read('account-matrix.html')]
];
const app = read('app.js');
const projectDocsI18n = read('project-docs-i18n.js');
const worker = read('sw.js');
const headers = read('_headers');
const workflow = readFileSync(resolve(repository, '.github/workflows/lume-security.yml'), 'utf8');
const checkedFiles = [
  html,
  plan,
  app,
  projectDocsI18n,
  worker,
  read('styles.css'),
  read('launch-plan.css'),
  read('project-docs.css'),
  read('site.config.json'),
  read('site-config.schema.json'),
  read('manifest.webmanifest'),
  read('sitemap.xml'),
  read('robots.txt'),
  headers
];

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const jsonLd = html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
assert(jsonLd, 'The JSON-LD block is missing.');
if (jsonLd) {
  try {
    JSON.parse(jsonLd[1]);
  } catch {
    failures.push('The JSON-LD block is not valid JSON.');
  }
  const hash = `sha256-${createHash('sha256').update(jsonLd[1]).digest('base64')}`;
  assert(html.includes(`'${hash}'`), 'The meta CSP does not contain the current JSON-LD hash.');
  assert(headers.includes(`'${hash}'`), 'The response-header CSP does not contain the current JSON-LD hash.');
}

const metaPolicy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1] || '';
[
  "default-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "script-src-attr 'none'",
  "style-src-attr 'none'",
  "require-trusted-types-for 'script'",
  "trusted-types 'none'"
].forEach(directive => assert(metaPolicy.includes(directive), `Meta CSP is missing: ${directive}.`));

[
  "frame-ancestors 'none'",
  'Permissions-Policy:',
  'Referrer-Policy: no-referrer',
  'Strict-Transport-Security:',
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options: DENY'
].forEach(header => assert(headers.includes(header), `The deployment headers are missing: ${header}.`));

assert(!/\b(?:innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval\s*\(|new\s+Function)\b/.test(app),
  'A prohibited DOM or code-generation sink was added to app.js.');
assert(!/\son[a-z]+\s*=/i.test(html), 'An inline event handler was added to index.html.');
assert(!/\sstyle\s*=/i.test(html), 'An inline style was added to index.html.');
assert(!/<script(?![^>]*type="application\/ld\+json")(?![^>]*\bsrc="app\.js")/i.test(html),
  'Only the JSON-LD block and the local app.js script are allowed.');

for (const [path, document] of projectDocuments) {
  assert(/<meta\b[^>]*name="robots"[^>]*content="noindex,nofollow,noarchive"/i.test(document),
    `${path} must remain excluded from search indexing.`);
  const scripts = [...document.matchAll(/<script\b[^>]*>/gi)];
  assert(scripts.length === 1
    && /\bsrc="project-docs-i18n\.js"/i.test(scripts[0][0])
    && /\bdefer\b/i.test(scripts[0][0]),
  `${path} may load only the deferred local translation script.`);
  assert(/script-src 'self'/.test(document), `${path} must limit scripts to local files.`);
  assert(!/\son[a-z]+\s*=/i.test(document), `An inline event handler was added to ${path}.`);
  assert(!/\sstyle\s*=/i.test(document), `An inline style was added to ${path}.`);
  ['ru', 'en', 'uk', 'tr'].forEach(language => {
    assert(document.includes(`data-doc-lang="${language}"`),
      `${path} is missing the ${language} language control.`);
  });
  assert(headers.includes(`/${path}\n  Cache-Control: no-cache\n  X-Robots-Tag: noindex, nofollow, noarchive`),
    `${path} is missing its no-cache and X-Robots-Tag deployment headers.`);
}

assert(!/\b(?:fetch|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|indexedDB|document\.cookie|innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval\s*\(|new\s+Function)\b/.test(projectDocsI18n),
  'The project-document translation script must not use network, storage, cookies, HTML sinks or code generation.');
[
  "const languages = ['ru', 'en', 'uk', 'tr']",
  'element.textContent = value',
  "url.searchParams.set('lang', language)",
  'window.history.replaceState'
].forEach(control => assert(projectDocsI18n.includes(control),
  `The project-document translation control is missing: ${control}.`));

const declaredTranslationKeys = new Set(
  [...projectDocsI18n.matchAll(/^\s*'([^']+)':\s*m\(/gm)].map(match => match[1])
);
for (const [path, document] of projectDocuments) {
  for (const match of document.matchAll(/\bdata-i18n(?:-title|-placeholder|-aria)?="([^"]+)"/g)) {
    assert(declaredTranslationKeys.has(match[1]),
      `${path} uses an undeclared translation key: ${match[1]}.`);
  }
}

for (const [path, document] of projectDocuments.slice(1)) {
  assert(!/<form\b[^>]*\baction=/i.test(document),
    `${path} must not define a form submission endpoint.`);
  assert(/<button\b[^>]*class="offline-submit"[^>]*type="submit"[^>]*disabled/i.test(document),
    `${path} must keep its submit control disabled.`);
}

for (const anchor of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
  assert(/\brel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/i.test(anchor[0]),
    `External-window link lacks noopener noreferrer: ${anchor[0]}`);
}

const mapFrame = html.match(/<iframe\b[^>]*>/i)?.[0] || '';
assert(/\breferrerpolicy="no-referrer"/i.test(mapFrame), 'The map iframe lacks a no-referrer policy.');
assert(/\bsandbox="/i.test(mapFrame), 'The map iframe is not sandboxed.');

[
  'url.origin === self.location.origin',
  'url.pathname.startsWith(SCOPE_PATH)',
  "request.mode === 'navigate'",
  'configurationResponse(request)',
  "fetch(request, { cache: 'no-cache' })",
  'response.ok',
  'key.startsWith(CACHE_PREFIX)'
].forEach(control => assert(worker.includes(control), `Service Worker control is missing: ${control}.`));

for (const action of workflow.matchAll(/uses:\s*[^@\s]+@([^\s#]+)/g)) {
  assert(/^[0-9a-f]{40}$/.test(action[1]), `GitHub Action is not pinned to a full commit SHA: ${action[0]}.`);
}

const combined = checkedFiles.join('\n');
[
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,
  /\bsk_(?:live|test)_[A-Za-z0-9]{16,}\b/
].forEach(pattern => assert(!pattern.test(combined), `Potential secret detected by ${pattern}.`));

if (failures.length) {
  console.error('LUMÉ security checks failed:');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('LUMÉ static security controls are valid.');
}
