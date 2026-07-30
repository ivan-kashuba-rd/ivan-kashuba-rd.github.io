import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const site = resolve(repository, 'lume-riviera');
const read = path => readFileSync(resolve(site, path), 'utf8');
const configPath = process.argv[2];
const configSource = configPath === '-'
  ? readFileSync(0, 'utf8')
  : (configPath ? readFileSync(resolve(repository, configPath), 'utf8') : read('site.config.json'));
const config = JSON.parse(configSource);
const manifest = JSON.parse(read('manifest.webmanifest'));
const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
const html = read('index.html');
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const httpsUrl = value => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};
const validPhone = value => /^\+?\d{7,15}$/.test(String(value || '').replace(/[^\d+]/g, ''));
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));
const languages = ['en', 'ru', 'tr', 'de'];
const escapeText = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const escapeAttribute = value => escapeText(value).replaceAll('"', '&quot;');
const title = escapeText(config.seo?.title?.en?.replaceAll('{brand}', config.business?.name || '').replaceAll('LUMÉ', config.business?.name || ''));
const siteUrl = httpsUrl(config.seo?.siteUrl) ? new URL(config.seo.siteUrl) : null;

assert(config.version === 1, 'version must be 1.');
assert(['demo', 'production'].includes(config.mode), 'mode must be demo or production.');
assert(Boolean(config.business?.name?.trim()), 'business.name is required.');
assert(Boolean(config.business?.location?.country?.match(/^[A-Z]{2}$/)), 'business.location.country must be an ISO two-letter code.');
assert(Array.isArray(config.services) && config.services.length > 0, 'At least one service is required.');
assert(Boolean(config.pricing?.currencies?.[config.pricing?.defaultCurrency]), 'pricing.defaultCurrency must exist in currencies.');
assert(Boolean(siteUrl), 'seo.siteUrl must be an HTTPS URL.');
assert(['whatsapp', 'external', 'phone', 'disabled'].includes(config.booking?.adapter), 'Unknown booking adapter.');
assert(/^[A-Za-z0-9_-]{1,40}$/.test(config.booking?.serviceQueryParameter), 'booking.serviceQueryParameter is invalid.');
if (config.business?.email) assert(validEmail(config.business.email), 'business.email is invalid.');
for (const key of ['privacyUrl', 'termsUrl', 'portfolioUrl']) {
  if (config.business?.[key]) assert(httpsUrl(config.business[key]), `business.${key} must use HTTPS.`);
}
if (config.features?.map) {
  assert(httpsUrl(config.business?.location?.mapUrl), 'The public map URL must use HTTPS.');
  const embedUrl = httpsUrl(config.business?.location?.embedUrl) ? new URL(config.business.location.embedUrl) : null;
  assert(
    embedUrl && ['https://www.openstreetmap.org', 'https://www.google.com'].includes(embedUrl.origin),
    'The embedded map must use an approved HTTPS origin.'
  );
}
for (const [feature, enabled] of Object.entries(config.features || {})) {
  assert(typeof enabled === 'boolean', `features.${feature} must be boolean.`);
}
for (const [currency, rules] of Object.entries(config.pricing?.currencies || {})) {
  assert(/^[A-Z]{3}$/.test(currency), `Currency code ${currency} is invalid.`);
  assert(Number.isFinite(rules?.rate) && rules.rate > 0, `${currency}.rate must be positive.`);
  assert(Number.isFinite(rules?.increment) && rules.increment > 0, `${currency}.increment must be positive.`);
  assert(Number.isFinite(rules?.minimum) && rules.minimum >= 0, `${currency}.minimum must not be negative.`);
}
if (siteUrl) {
  const imageUrl = new URL(config.seo.image, siteUrl);
  assert(imageUrl.origin === siteUrl.origin, 'seo.image must be hosted on the site origin.');
}

for (const key of ['title', 'description']) {
  for (const language of languages) {
    assert(Boolean(config.seo?.[key]?.[language]?.trim()), `seo.${key}.${language} is required.`);
  }
}

const ids = new Set();
for (const [index, service] of (config.services || []).entries()) {
  assert(Array.isArray(service) && service.length === 6, `services[${index}] must contain six fields.`);
  if (!Array.isArray(service) || service.length !== 6) continue;
  const [id, category, icon, price, duration, names] = service;
  assert(/^[a-z0-9-]+$/.test(id), `services[${index}] has an invalid id.`);
  assert(!ids.has(id), `Duplicate service id: ${id}.`);
  ids.add(id);
  assert(['hair', 'nails', 'skin'].includes(category), `services[${index}] has an invalid category.`);
  assert(Boolean(icon), `services[${index}] needs an icon.`);
  assert(Number.isFinite(price) && price >= 0, `services[${index}] has an invalid price.`);
  assert(Number.isInteger(duration) && duration >= 5, `services[${index}] has an invalid duration.`);
  for (const language of languages) {
    assert(Boolean(names?.[language]?.trim()), `services[${index}] is missing the ${language} name.`);
  }
}

assert(html.includes(`<title>${title}</title>`), 'Static HTML title is stale; run npm run build:lume:metadata.');
assert(html.includes(`href="${escapeAttribute(config.seo.siteUrl)}"`), 'Static canonical URL is stale; run npm run build:lume:metadata.');
assert(manifest.name.includes(config.business.name), 'Manifest name is stale; run npm run build:lume:metadata.');
if (config.seo.index && siteUrl) {
  assert(sitemap.includes(siteUrl.origin), 'Sitemap is stale; run npm run build:lume:metadata.');
  assert(robots.includes(new URL('sitemap.xml', siteUrl).href), 'robots.txt is stale; run npm run build:lume:metadata.');
} else {
  assert(!sitemap.includes('<url>'), 'A noindex site must have an empty sitemap.');
  assert(robots.includes('Disallow: /'), 'A noindex site must be disallowed in robots.txt.');
}

if (config.mode === 'production') {
  assert(Boolean(config.business.legalName?.trim()), 'Production requires business.legalName.');
  assert(Boolean(config.business.location.address?.trim()), 'Production requires business.location.address.');
  assert(Boolean(config.business.email?.trim() || config.business.phone?.trim()), 'Production requires a public email or phone.');
  assert(httpsUrl(config.business.privacyUrl), 'Production requires an HTTPS privacyUrl.');
  assert(config.seo.index === true, 'Production requires seo.index=true.');
  assert(!config.seo.siteUrl.includes('ivan-kashuba-rd.github.io'), 'Production siteUrl must use the client domain.');
  if (config.booking.adapter === 'whatsapp') {
    assert(/^\d{7,15}$/.test(config.business.whatsappNumber), 'WhatsApp booking requires a digits-only whatsappNumber.');
  }
  if (config.booking.adapter === 'external') {
    assert(httpsUrl(config.booking.externalUrl), 'External booking requires an HTTPS externalUrl.');
  }
  if (config.booking.adapter === 'phone') {
    assert(validPhone(config.booking.phone || config.business.phone), 'Phone booking requires a valid phone number.');
  }
  assert(config.booking.adapter !== 'disabled', 'Production booking cannot be disabled.');
}

if (failures.length) {
  console.error('LUMÉ configuration checks failed:');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`LUMÉ ${config.mode} configuration is valid.`);
}
