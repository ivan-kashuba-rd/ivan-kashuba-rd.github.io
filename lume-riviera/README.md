# LUMÉ Riviera

Готовый к адаптации мультиязычный сайт-концепт студии красоты. В деморежиме он
не принимает реальные записи и не хранит контактные данные. Для клиента сайт
переводится в `production` через один конфигурационный файл.

## Что уже подготовлено

- четыре языка: английский, русский, турецкий и немецкий;
- каталог услуг, цены, валюты, избранное и фильтры;
- сменные сценарии записи: WhatsApp, телефон или внешний сервис;
- отдельные режимы `demo` и `production`;
- Content Security Policy, защитные HTTP-заголовки и безопасный Service Worker;
- проверки конфигурации, HTML, JavaScript и Lighthouse в GitHub Actions;
- SEO-метаданные и структурированные данные из конфигурации;
- документы для продажи, сбора данных клиента и запуска.

## Быстрый путь

1. Заполнить [`site.config.json`](site.config.json).
2. Пройти [`CLIENT-QUESTIONNAIRE.md`](CLIENT-QUESTIONNAIRE.md) вместе с клиентом.
3. Выполнить `npm run build:lume:metadata`.
4. Выполнить [`CUSTOMIZATION.md`](CUSTOMIZATION.md).
5. Запустить проверки из раздела «Проверка перед публикацией».
6. Только после этого сменить `"mode": "demo"` на `"mode": "production"` и
   снова сгенерировать метаданные.

## Локальный запуск

Для автоматических проверок нужен Node.js 22.19 или новее; в CI используется
Node.js 24. Из корня репозитория:

```bash
python3 -m http.server 8000 --directory lume-riviera
```

Открыть `http://localhost:8000/`. Открытие `index.html` напрямую через `file://`
не поддерживается, потому что конфигурация загружается отдельным запросом.

## Проверка перед публикацией

```bash
npm ci --ignore-scripts
npm run check:lume
mkdir -p .lighthouseci
python3 -m http.server 4173 --directory lume-riviera
```

В другом терминале:

```bash
npx lighthouse http://127.0.0.1:4173/ \
  --chrome-flags="--headless --no-sandbox" \
  --output=json \
  --output-path=.lighthouseci/lume.json \
  --quiet
npm run check:lume:lighthouse-report
```

Сведения о модели угроз и безопасном подключении записи находятся в
[`SECURITY.md`](SECURITY.md).
