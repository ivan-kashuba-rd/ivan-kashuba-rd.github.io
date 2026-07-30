import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const site = resolve(repository, 'lume-riviera');
const scriptPath = resolve(site, 'project-docs-i18n.js');
const originalSource = readFileSync(scriptPath, 'utf8');
const source = originalSource.replace(
  '  const requestedLanguage =',
  '  globalThis.__copy = copy;\n  const requestedLanguage ='
);

const makeElement = dataset => ({
  dataset,
  textContent: '',
  value: 'entered value',
  attributes: new Map(),
  listeners: new Map(),
  classList: { toggle() {} },
  setAttribute(name, value) {
    this.attributes.set(name, value);
  },
  getAttribute(name) {
    return this.attributes.get(name) || '';
  },
  addEventListener(name, listener) {
    this.listeners.set(name, listener);
  }
});

const textElement = makeElement({ i18n: 'plan.heading' });
const placeholderElement = makeElement({ i18nPlaceholder: 'questionnaire.contactPh' });
const ariaElement = makeElement({ i18nAria: 'matrix.owner' });
const buttons = ['ru', 'en', 'uk', 'tr'].map(language => makeElement({ docLang: language }));
const link = makeElement({});
link.attributes.set('href', 'client-questionnaire.html');

const selectorResults = new Map([
  ['[data-i18n]', [textElement]],
  ['[data-i18n-placeholder]', [placeholderElement]],
  ['[data-i18n-aria]', [ariaElement]],
  ['[data-doc-lang]', buttons],
  ['[data-doc-link]', [link]]
]);

const context = {
  URL,
  URLSearchParams,
  navigator: { language: 'tr-TR' },
  window: {
    location: {
      search: '?lang=tr',
      href: 'https://example.test/lume-riviera/launch-plan.html?lang=tr'
    },
    history: { replaceState() {} }
  },
  document: {
    documentElement: { lang: 'ru' },
    body: { dataset: { i18nTitle: 'plan.title' } },
    title: '',
    querySelectorAll(selector) {
      return selectorResults.get(selector) || [];
    }
  }
};

vm.runInNewContext(source, context, { filename: scriptPath });

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const copy = context.__copy;
for (const [key, values] of Object.entries(copy)) {
  assert(Array.isArray(values) && values.length === 4
    && values.every(value => typeof value === 'string' && value.trim()),
  `${key} must contain four non-empty translations.`);
}

const pages = [
  'launch-plan.html',
  'client-questionnaire.html',
  'commercial-offer.html',
  'account-matrix.html'
];
for (const page of pages) {
  const html = readFileSync(resolve(site, page), 'utf8');
  for (const match of html.matchAll(/\bdata-i18n(?:-title|-placeholder|-aria)?="([^"]+)"/g)) {
    assert(Boolean(copy[match[1]]), `${page} uses a missing translation key: ${match[1]}.`);
  }
}

assert(context.document.documentElement.lang === 'tr', 'The requested Turkish language was not applied.');
assert(textElement.textContent === copy['plan.heading'][3], 'Visible Turkish text was not applied.');
assert(placeholderElement.attributes.get('placeholder') === copy['questionnaire.contactPh'][3],
  'The Turkish form placeholder was not applied.');
assert(ariaElement.attributes.get('aria-label') === copy['matrix.owner'][3],
  'The Turkish accessible label was not applied.');
assert(link.attributes.get('href').endsWith('?lang=tr'), 'The document link did not preserve Turkish.');

const enteredValue = placeholderElement.value;
buttons[1].listeners.get('click')();
assert(context.document.documentElement.lang === 'en', 'The English language switch did not run.');
assert(textElement.textContent === copy['plan.heading'][1], 'Visible English text was not applied.');
assert(placeholderElement.value === enteredValue, 'Switching language cleared a filled field.');
assert(link.attributes.get('href').endsWith('?lang=en'), 'The document link did not preserve English.');

if (failures.length) {
  console.error('LUMÉ document translation checks failed:');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`LUMÉ project documents contain ${Object.keys(copy).length} complete translation keys.`);
}
