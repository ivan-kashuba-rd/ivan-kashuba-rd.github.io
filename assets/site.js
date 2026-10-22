// Shared behavior: language, theme, mobile menu, back-to-top button.
(function () {
  const body = document.body;
  const nav = document.querySelector('nav');
  const langBtn = document.getElementById('langBtn');
  const themeBtn = document.getElementById('themeBtn');
  const menuBtn = document.getElementById('menuBtn');
  const topBtn = document.getElementById('topBtn');
  const year = document.getElementById('year');

  function store(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  // Language: ?lang= in the URL wins, then the saved choice.
  const queryLang = new URLSearchParams(location.search).get('lang');
  const lang = queryLang === 'ru' || queryLang === 'en' ? queryLang : read('lang');
  if (lang === 'ru') body.classList.add('ru');
  if (read('theme') === 'light') body.classList.add('light');

  function syncLanguage() {
    const ru = body.classList.contains('ru');
    if (langBtn) {
      langBtn.textContent = ru ? 'EN' : 'RU';
      langBtn.setAttribute('aria-label', ru ? 'Switch to English' : 'Переключить на русский');
    }
    document.documentElement.lang = ru ? 'ru' : 'en';
    if (menuBtn) menuBtn.setAttribute('aria-label', ru ? 'Меню' : 'Menu');
  }
  function syncTheme() {
    const light = body.classList.contains('light');
    if (themeBtn) themeBtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#eef6fb' : '#07111f');
  }
  function setMenu(open) {
    if (!nav || !menuBtn) return;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (langBtn) langBtn.addEventListener('click', () => {
    body.classList.toggle('ru');
    store('lang', body.classList.contains('ru') ? 'ru' : 'en');
    syncLanguage();
  });
  if (themeBtn) themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    store('theme', body.classList.contains('light') ? 'light' : 'dark');
    syncTheme();
  });
  if (menuBtn) {
    menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', e => { if (nav.classList.contains('open') && !nav.contains(e.target)) setMenu(false); });
  }
  if (topBtn) {
    window.addEventListener('scroll', () => { topBtn.style.display = window.scrollY > 700 ? 'block' : 'none'; }, { passive: true });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  if (year) year.textContent = new Date().getFullYear();
  syncLanguage();
  syncTheme();
})();
