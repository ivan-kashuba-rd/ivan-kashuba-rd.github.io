import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const site = resolve(repository, 'lume-riviera');
const path = name => resolve(site, name);
const read = name => readFileSync(path(name), 'utf8');
const write = (name, value) => writeFileSync(path(name), value);
const config = JSON.parse(read('site.config.json'));
const english = value => typeof value === 'string' ? value : value.en;
const escapeAttribute = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const escapeText = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const safeJson = value => JSON.stringify(value).replaceAll('<', '\\u003c');
const siteUrl = new URL(config.seo.siteUrl);
const title = english(config.seo.title).replaceAll('{brand}', config.business.name).replaceAll('LUMÉ', config.business.name);
const description = english(config.seo.description).replaceAll('{brand}', config.business.name).replaceAll('LUMÉ', config.business.name);
const imageUrl = new URL(config.seo.image, siteUrl);
if (imageUrl.origin !== siteUrl.origin) throw new Error('seo.image must be hosted on the site origin.');
const image = imageUrl.href;

let html = read('index.html');
let headers = read('_headers');

function replaceOnce(source, pattern, replacement, label) {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
  const matches = source.match(new RegExp(pattern.source, flags));
  if (matches?.length !== 1) throw new Error(`Expected one ${label}; found ${matches?.length || 0}.`);
  return source.replace(pattern, () => replacement);
}

html = replaceOnce(
  html,
  /<meta id="metaDescription" name="description" content="[^"]*">/,
  `<meta id="metaDescription" name="description" content="${escapeAttribute(description)}">`,
  'description meta tag'
);
html = replaceOnce(
  html,
  /<meta id="robotsMeta" name="robots" content="[^"]*">/,
  `<meta id="robotsMeta" name="robots" content="${config.seo.index ? 'index,follow' : 'noindex,nofollow'}">`,
  'robots meta tag'
);
html = replaceOnce(
  html,
  /<meta id="ogTitle" property="og:title" content="[^"]*">/,
  `<meta id="ogTitle" property="og:title" content="${escapeAttribute(title)}">`,
  'Open Graph title'
);
html = replaceOnce(
  html,
  /<meta id="ogDescription" property="og:description" content="[^"]*">/,
  `<meta id="ogDescription" property="og:description" content="${escapeAttribute(description)}">`,
  'Open Graph description'
);
html = replaceOnce(
  html,
  /<meta id="ogImage" property="og:image" content="[^"]*">/,
  `<meta id="ogImage" property="og:image" content="${escapeAttribute(image)}">`,
  'Open Graph image'
);
html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`, 'title');
html = replaceOnce(
  html,
  /<link id="canonicalUrl" rel="canonical" href="[^"]*">/,
  `<link id="canonicalUrl" rel="canonical" href="${escapeAttribute(siteUrl.href)}">`,
  'canonical URL'
);
html = replaceOnce(
  html,
  /<body(?:\s+data-mode="(?:demo|production)")?>/,
  `<body data-mode="${config.mode}">`,
  'body mode'
);

const structuredData = config.mode === 'production' ? {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: config.business.name,
  legalName: config.business.legalName || undefined,
  url: siteUrl.href,
  image,
  email: config.business.email || undefined,
  telephone: config.business.phone || undefined,
  address: config.business.location.address ? {
    '@type': 'PostalAddress',
    streetAddress: config.business.location.address,
    addressLocality: config.business.location.locality,
    addressCountry: config.business.location.country
  } : undefined
} : {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: title,
  description,
  inLanguage: ['en', 'ru', 'tr', 'de'],
  isAccessibleForFree: true
};
const jsonLdBody = `\n  ${safeJson(structuredData)}\n  `;
html = replaceOnce(
  html,
  /<script\b[^>]*id="structuredData"[^>]*>[\s\S]*?<\/script>/,
  `<script id="structuredData" type="application/ld+json">${jsonLdBody}</script>`,
  'structured-data block'
);

const cspHash = `sha256-${createHash('sha256').update(jsonLdBody).digest('base64')}`;
const replaceHash = source => replaceOnce(
  source,
  /'sha256-[A-Za-z0-9+/=]+'/,
  `'${cspHash}'`,
  'JSON-LD CSP hash'
);
html = replaceHash(html);
headers = replaceHash(headers);

const manifest = JSON.parse(read('manifest.webmanifest'));
manifest.name = [config.business.name, config.business.signature].filter(Boolean).join(' — ');
manifest.short_name = config.business.name;
manifest.description = description;

const today = new Date().toISOString().slice(0, 10);
const priorities = { en: '1.0', ru: '0.8', tr: '0.8', de: '0.8' };
const sitemapEntries = config.seo.index ? Object.entries(priorities).map(([language, priority]) => {
  const url = new URL(siteUrl);
  url.searchParams.set('lang', language);
  return `  <url><loc>${escapeText(url.href)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
}).join('\n') : '';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
const robots = config.seo.index
  ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n`
  : 'User-agent: *\nDisallow: /\n';

write('index.html', html);
write('_headers', headers);
write('manifest.webmanifest', `${JSON.stringify(manifest, null, 2)}\n`);
write('sitemap.xml', sitemap);
write('robots.txt', robots);
console.log(`Generated static metadata for ${config.mode}: ${siteUrl.href}`);
