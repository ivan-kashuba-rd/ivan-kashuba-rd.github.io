# Как обновлять сайт

Сайт статический, сборка не нужна. GitHub Pages публикует то, что лежит в ветке `main`.

## Где что лежит

- `index.html` — главная страница (EN и RU в одном файле: блоки с `data-lang="en"` и `data-lang="ru"`).
- `molecular-docking/index.html` — учебный кейс по докингу.
- `web/index.html` — веб-проекты (LUMÉ, Usta Platform).
- `assets/site.css` и `assets/site.js` — общие стили и скрипт для всех трёх страниц. Меню, тема и язык настраиваются здесь.
- `assets/og-image.jpg` — картинка превью ссылки в LinkedIn и мессенджерах (1200×630).
- Изображения на страницах подключены в формате `.webp`; клик открывает исходный `.png`.

## Публикация через GitHub Desktop

1. Скопируйте изменённые файлы в локальную папку репозитория `ivan-kashuba-rd.github.io`.
2. В GitHub Desktop проверьте список изменений, укажите Summary и нажмите **Commit to main**.
3. Нажмите **Push origin**.
4. Через пару минут откройте https://ivan-kashuba-rd.github.io/ и обновите страницу с `Ctrl+F5`.

LinkedIn кэширует превью ссылок. Чтобы увидеть новую картинку, прогоните адрес через https://www.linkedin.com/post-inspector/.
