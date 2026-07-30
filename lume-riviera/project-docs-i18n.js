(() => {
  'use strict';

  const languages = ['ru', 'en', 'uk', 'tr'];
  const languageIndex = Object.fromEntries(languages.map((language, index) => [language, index]));
  const m = (ru, en, uk, tr) => [ru, en, uk, tr];
  const copy = {
    'common.skip': m('К содержанию', 'Skip to content', 'До змісту', 'İçeriğe geç'),
    'common.plan': m('План', 'Plan', 'План', 'Plan'),
    'common.open': m('Открыть', 'Open', 'Відкрити', 'Aç'),
    'common.yes': m('Да', 'Yes', 'Так', 'Evet'),
    'common.no': m('Нет', 'No', 'Ні', 'Hayır'),
    'common.ifAny': m('если есть', 'if available', 'якщо є', 'varsa'),
    'common.decideLater': m('Решить позже', 'Decide later', 'Вирішити пізніше', 'Daha sonra karar ver'),
    'common.howToSave': m('Как сохранить:', 'How to save:', 'Як зберегти:', 'Nasıl kaydedilir:'),
    'common.savePdf': m('Печать → Сохранить как PDF', 'Print → Save as PDF', 'Друк → Зберегти як PDF', 'Yazdır → PDF olarak kaydet'),
    'common.dataStatus': m('Данные:', 'Data:', 'Дані:', 'Veriler:'),
    'common.notSent': m('не отправляются с этой страницы', 'are not sent from this page', 'не надсилаються з цієї сторінки', 'bu sayfadan gönderilmez'),
    'common.noSecrets': m('Не вводите секреты.', 'Do not enter secrets.', 'Не вводьте секретні дані.', 'Gizli bilgi girmeyin.'),
    'common.noSecretsText': m('Не указывайте пароли, коды восстановления, ключи доступа или данные банковских карт.', 'Do not enter passwords, recovery codes, access keys or bank card details.', 'Не вказуйте паролі, коди відновлення, ключі доступу або дані банківських карток.', 'Parola, kurtarma kodu, erişim anahtarı veya banka kartı bilgisi girmeyin.'),
    'common.offlineButton': m('Данные не отправляются · сохраните страницу как PDF', 'Nothing is submitted · save this page as PDF', 'Дані не надсилаються · збережіть сторінку як PDF', 'Veriler gönderilmez · sayfayı PDF olarak kaydedin'),
    'common.saveInstruction': m('откройте печать браузера, выберите «Сохранить как PDF» и отправьте файл исполнителю безопасным способом.', 'open your browser’s print dialog, choose “Save as PDF” and send the file to the contractor securely.', 'відкрийте друк у браузері, виберіть «Зберегти як PDF» і безпечно надішліть файл виконавцю.', 'tarayıcının yazdırma penceresini açın, “PDF olarak kaydet” seçeneğini seçin ve dosyayı güvenli şekilde yükleniciye gönderin.'),
    'common.legalNote': m('Это рабочий документ, а не юридическая консультация или гарантия абсолютной безопасности.', 'This is a working document, not legal advice or a guarantee of absolute security.', 'Це робочий документ, а не юридична консультація чи гарантія абсолютної безпеки.', 'Bu bir çalışma belgesidir; hukuki danışmanlık veya mutlak güvenlik garantisi değildir.'),
    'common.noLegal': m('Документ помогает собрать информацию, но не заменяет юридическую консультацию.', 'This document helps collect information but does not replace legal advice.', 'Документ допомагає зібрати інформацію, але не замінює юридичну консультацію.', 'Bu belge bilgi toplamaya yardımcı olur; hukuki danışmanlığın yerini tutmaz.'),

    'plan.title': m('LUMÉ Riviera — план запуска', 'LUMÉ Riviera — launch plan', 'LUMÉ Riviera — план запуску', 'LUMÉ Riviera — yayına alma planı'),
    'plan.eyebrow': m('Короткий план для клиента', 'Quick client plan', 'Короткий план для клієнта', 'Müşteri için kısa plan'),
    'plan.heading': m('Как запустить сайт', 'How to launch the website', 'Як запустити сайт', 'Web sitesi nasıl yayına alınır'),
    'plan.lead': m('Что уже работает, что нужно выбрать и кто отвечает за каждый шаг.', 'What already works, what must be chosen and who owns each step.', 'Що вже працює, що потрібно обрати й хто відповідає за кожен крок.', 'Nelerin hazır olduğu, nelerin seçilmesi gerektiği ve her adımdan kimin sorumlu olduğu.'),
    'plan.status': m('Сейчас: демонстрация', 'Current status: demo', 'Зараз: демонстрація', 'Şu an: demo'),
    'plan.statusTitle': m('Запись через WhatsApp', 'Booking through WhatsApp', 'Запис через WhatsApp', 'WhatsApp üzerinden randevu'),
    'plan.statusText': m('Клиент выбирает услугу на сайте, затем сайт открывает готовое сообщение в WhatsApp. Свободное время подтверждает администратор.', 'The client chooses a service on the website, then a prepared WhatsApp message opens. A staff member confirms the available time.', 'Клієнт обирає послугу на сайті, після чого відкривається готове повідомлення у WhatsApp. Вільний час підтверджує адміністратор.', 'Müşteri web sitesinden hizmeti seçer, ardından hazır bir WhatsApp mesajı açılır. Uygun saati çalışan onaylar.'),
    'plan.summaryReadyTitle': m('Уже готово', 'Already ready', 'Уже готово', 'Hazır olanlar'),
    'plan.summaryReadyText': m('Дизайн, мобильная версия, четыре языка, услуги, цены и кнопки записи.', 'Design, mobile layout, four languages, services, prices and booking buttons.', 'Дизайн, мобільна версія, чотири мови, послуги, ціни та кнопки запису.', 'Tasarım, mobil görünüm, dört dil, hizmetler, fiyatlar ve randevu düğmeleri.'),
    'plan.summaryNeedTitle': m('Нужно от клиента', 'Needed from the client', 'Потрібно від клієнта', 'Müşteriden gerekenler'),
    'plan.summaryNeedText': m('Реальные контакты, фото, цены, правила записи, домен и выбранный способ записи.', 'Real contact details, photos, prices, booking rules, domain and chosen booking method.', 'Справжні контакти, фото, ціни, правила запису, домен і обраний спосіб запису.', 'Gerçek iletişim bilgileri, fotoğraflar, fiyatlar, randevu kuralları, alan adı ve seçilen randevu yöntemi.'),
    'plan.summaryResultTitle': m('Результат', 'Result', 'Результат', 'Sonuç'),
    'plan.summaryResultText': m('Рабочий сайт на домене клиента с проверенной записью и понятными владельцами аккаунтов.', 'A working website on the client’s domain, with tested booking and clear account ownership.', 'Робочий сайт на домені клієнта з перевіреним записом і зрозумілими власниками акаунтів.', 'Müşterinin alan adında çalışan, randevu akışı test edilmiş ve hesap sahipleri belli bir web sitesi.'),
    'plan.bookingEyebrow': m('Запись клиентов', 'Client booking', 'Запис клієнтів', 'Müşteri randevusu'),
    'plan.bookingHeading': m('Два простых варианта', 'Two simple options', 'Два прості варіанти', 'İki basit seçenek'),
    'plan.bookingNowBadge': m('Можно использовать сейчас', 'Ready to use now', 'Можна використовувати зараз', 'Şimdi kullanılabilir'),
    'plan.bookingWaTitle': m('WhatsApp', 'WhatsApp', 'WhatsApp', 'WhatsApp'),
    'plan.bookingWaText': m('Сайт передаёт выбранную услугу в WhatsApp. Администратор вручную предлагает время и подтверждает запись.', 'The website passes the selected service to WhatsApp. A staff member offers a time and confirms the booking manually.', 'Сайт передає обрану послугу у WhatsApp. Адміністратор вручну пропонує час і підтверджує запис.', 'Web sitesi seçilen hizmeti WhatsApp’a aktarır. Çalışan uygun saati önerir ve randevuyu elle onaylar.'),
    'plan.bookingAutoBadge': m('Если нужен календарь', 'If you need a calendar', 'Якщо потрібен календар', 'Takvim gerekiyorsa'),
    'plan.bookingExternalTitle': m('Внешний сервис записи', 'External booking service', 'Зовнішній сервіс запису', 'Harici randevu sistemi'),
    'plan.bookingExternalText': m('Клиент видит свободное время и записывается в готовой системе. Мы подключаем её ссылку к сайту; собственную CRM создавать не нужно.', 'The client sees available times and books in a ready-made system. We connect its link to the website; a custom CRM is not needed.', 'Клієнт бачить вільний час і записується в готовій системі. Ми підключаємо її посилання до сайту; власну CRM створювати не потрібно.', 'Müşteri uygun saatleri görür ve hazır sistemde randevu alır. Sistemin bağlantısını siteye ekleriz; özel CRM geliştirmek gerekmez.'),
    'plan.paymentLabel': m('Оплата:', 'Payment:', 'Оплата:', 'Ödeme:'),
    'plan.paymentText': m('если нужна предоплата, клиент переходит на безопасную платёжную страницу банка или платёжного сервиса. Данные карты не попадают на этот сайт.', 'if a deposit is needed, the client goes to a secure payment page run by a bank or payment provider. Card details never reach this website.', 'якщо потрібна передоплата, клієнт переходить на безпечну платіжну сторінку банку або платіжного сервісу. Дані картки не потрапляють на цей сайт.', 'ön ödeme gerekiyorsa müşteri bankanın veya ödeme kuruluşunun güvenli ödeme sayfasına gider. Kart bilgileri bu web sitesine gelmez.'),
    'plan.stepsEyebrow': m('Путь к запуску', 'Path to launch', 'Шлях до запуску', 'Yayına alma yolu'),
    'plan.stepsHeading': m('Пять шагов', 'Five steps', 'П’ять кроків', 'Beş adım'),
    'plan.stepsLead': m('Переходим к следующему шагу только после подтверждения предыдущего.', 'Move to the next step only after the previous one is approved.', 'Переходимо до наступного кроку лише після підтвердження попереднього.', 'Önceki adım onaylandıktan sonra sonraki adıma geçilir.'),
    'plan.step1Title': m('Заполнить анкету', 'Complete the questionnaire', 'Заповнити анкету', 'Formu doldurun'),
    'plan.step1Text': m('Название бизнеса, контакты, адрес, услуги, цены, языки и ответственный человек.', 'Business name, contacts, address, services, prices, languages and the decision-maker.', 'Назва бізнесу, контакти, адреса, послуги, ціни, мови та відповідальна особа.', 'İşletme adı, iletişim bilgileri, adres, hizmetler, fiyatlar, diller ve karar verecek kişi.'),
    'plan.step2Title': m('Передать материалы', 'Provide the materials', 'Передати матеріали', 'İçerikleri teslim edin'),
    'plan.step2Text': m('Логотип, фотографии с разрешением на использование, реальные отзывы и утверждённые тексты.', 'Logo, photos with permission to use them, genuine reviews and approved texts.', 'Логотип, фотографії з дозволом на використання, справжні відгуки та затверджені тексти.', 'Logo, kullanım izni olan fotoğraflar, gerçek yorumlar ve onaylanmış metinler.'),
    'plan.step3Title': m('Выбрать запись', 'Choose booking', 'Обрати спосіб запису', 'Randevu yöntemini seçin'),
    'plan.step3Text': m('WhatsApp для ручного подтверждения или готовый сервис с календарём и напоминаниями.', 'WhatsApp for manual confirmation or a ready-made service with a calendar and reminders.', 'WhatsApp для ручного підтвердження або готовий сервіс із календарем і нагадуваннями.', 'Elle onay için WhatsApp veya takvim ve hatırlatma içeren hazır bir sistem.'),
    'plan.step4Title': m('Подключить домен', 'Connect the domain', 'Підключити домен', 'Alan adını bağlayın'),
    'plan.step4Text': m('Домен и основные аккаунты принадлежат бизнесу. На них включается дополнительная защита входа.', 'The business owns the domain and key accounts. Extra login protection is enabled on them.', 'Домен і основні акаунти належать бізнесу. Для них вмикається додатковий захист входу.', 'Alan adı ve temel hesaplar işletmeye ait olur. Bu hesaplarda ek giriş koruması açılır.'),
    'plan.step5Title': m('Проверить и опубликовать', 'Test and publish', 'Перевірити й опублікувати', 'Test edin ve yayınlayın'),
    'plan.step5Text': m('Проверяем контакты, цены, четыре языка, запись, мобильную версию и защиту сайта.', 'Check contacts, prices, four languages, booking, mobile layout and website protection.', 'Перевіряємо контакти, ціни, чотири мови, запис, мобільну версію та захист сайту.', 'İletişim bilgileri, fiyatlar, dört dil, randevu akışı, mobil görünüm ve site koruması test edilir.'),
    'plan.wordsEyebrow': m('Простыми словами', 'In plain language', 'Простими словами', 'Basit anlatım'),
    'plan.wordsHeading': m('Что означают термины', 'What the terms mean', 'Що означають терміни', 'Terimler ne anlama gelir'),
    'plan.wordDomain': m('Домен', 'Domain', 'Домен', 'Alan adı'),
    'plan.wordDomainText': m('Адрес сайта, например example.com.', 'The website address, for example example.com.', 'Адреса сайту, наприклад example.com.', 'Web sitesinin adresi; örneğin example.com.'),
    'plan.wordHosting': m('Хостинг', 'Hosting', 'Хостинг', 'Hosting'),
    'plan.wordHostingText': m('Сервис, где опубликован сайт.', 'The service where the website is published.', 'Сервіс, де опубліковано сайт.', 'Web sitesinin yayınlandığı hizmet.'),
    'plan.wordMfa': m('Дополнительная защита входа', 'Extra login protection', 'Додатковий захист входу', 'Ek giriş koruması'),
    'plan.wordMfaText': m('Кроме пароля нужен код, приложение или электронный ключ.', 'A code, app or electronic key is required in addition to the password.', 'Крім пароля потрібен код, застосунок або електронний ключ.', 'Parolaya ek olarak kod, uygulama veya elektronik anahtar gerekir.'),
    'plan.wordCrm': m('CRM / сервис записи', 'CRM / booking service', 'CRM / сервіс запису', 'CRM / randevu sistemi'),
    'plan.wordCrmText': m('Отдельная система с календарём, клиентами и напоминаниями.', 'A separate system for the calendar, clients and reminders.', 'Окрема система з календарем, клієнтами та нагадуваннями.', 'Takvim, müşteriler ve hatırlatmalar için ayrı sistem.'),
    'plan.wordBackup': m('Резервная копия', 'Backup copy', 'Резервна копія', 'Yedek kopya'),
    'plan.wordBackupText': m('Копия данных для восстановления после ошибки или сбоя.', 'A copy used to restore data after an error or outage.', 'Копія даних для відновлення після помилки або збою.', 'Hata veya kesinti sonrası geri yüklemek için veri kopyası.'),
    'plan.wordScope': m('Объём работ', 'Project scope', 'Обсяг робіт', 'İş kapsamı'),
    'plan.wordScopeText': m('Точный список того, что входит и не входит в цену.', 'The exact list of what is and is not included in the price.', 'Точний список того, що входить і не входить у ціну.', 'Fiyata dahil olan ve olmayan işlerin kesin listesi.'),
    'plan.docsEyebrow': m('Документы', 'Documents', 'Документи', 'Belgeler'),
    'plan.docsHeading': m('Открыть и заполнить', 'Open and complete', 'Відкрити й заповнити', 'Açın ve doldurun'),
    'plan.docsText': m('Ответы не отправляются на сервер. После заполнения сохраните страницу как PDF через печать браузера.', 'Answers are not sent to a server. When finished, use the browser’s print function to save the page as PDF.', 'Відповіді не надсилаються на сервер. Після заповнення збережіть сторінку як PDF через друк у браузері.', 'Yanıtlar sunucuya gönderilmez. Doldurduktan sonra tarayıcının yazdırma özelliğiyle sayfayı PDF olarak kaydedin.'),
    'plan.docQuestionnaire': m('Анкета клиента', 'Client questionnaire', 'Анкета клієнта', 'Müşteri formu'),
    'plan.docOffer': m('Предложение · €1 250', 'Offer · €1,250', 'Пропозиція · €1 250', 'Teklif · €1.250'),
    'plan.docMatrix': m('Аккаунты и контакты', 'Accounts and contacts', 'Акаунти й контакти', 'Hesaplar ve kişiler'),
    'plan.docTech': m('Подробности для специалиста', 'Technical details', 'Деталі для спеціаліста', 'Teknik ayrıntılar'),
    'plan.docTechLink': m('Модель безопасного запуска', 'Secure launch model', 'Модель безпечного запуску', 'Güvenli yayına alma modeli'),
    'plan.footer': m('План запуска', 'Launch plan', 'План запуску', 'Yayına alma planı'),

    'questionnaire.title': m('LUMÉ Riviera — анкета клиента', 'LUMÉ Riviera — client questionnaire', 'LUMÉ Riviera — анкета клієнта', 'LUMÉ Riviera — müşteri formu'),
    'questionnaire.eyebrow': m('Заполнить за 10–15 минут', 'Takes 10–15 minutes', 'Заповнення за 10–15 хвилин', '10–15 dakikada doldurun'),
    'questionnaire.heading': m('Анкета перед запуском', 'Pre-launch questionnaire', 'Анкета перед запуском', 'Yayın öncesi form'),
    'questionnaire.lead': m('Заполните только то, что уже известно. Неясные пункты можно обсудить с исполнителем.', 'Complete what you already know. You can discuss unclear points with the contractor.', 'Заповніть те, що вже відомо. Незрозумілі пункти можна обговорити з виконавцем.', 'Bildiğiniz alanları doldurun. Belirsiz konuları yükleniciyle görüşebilirsiniz.'),
    'questionnaire.businessHeading': m('Бизнес', 'Business', 'Бізнес', 'İşletme'),
    'questionnaire.publicName': m('Название на сайте', 'Name shown on the website', 'Назва на сайті', 'Sitede görünecek ad'),
    'questionnaire.publicNamePh': m('Например: LUMÉ Riviera', 'For example: LUMÉ Riviera', 'Наприклад: LUMÉ Riviera', 'Örneğin: LUMÉ Riviera'),
    'questionnaire.legalName': m('Юридическое имя', 'Legal business name', 'Юридична назва', 'Yasal işletme adı'),
    'questionnaire.legalNamePh': m('Компания или имя предпринимателя', 'Company or sole trader name', 'Компанія або ім’я підприємця', 'Şirket veya şahıs işletmesi adı'),
    'questionnaire.country': m('Страна работы', 'Country of operation', 'Країна роботи', 'Faaliyet ülkesi'),
    'questionnaire.approver': m('Кто принимает решения', 'Who approves decisions', 'Хто ухвалює рішення', 'Kararları kim onaylar'),
    'questionnaire.personPh': m('Имя и должность', 'Name and role', 'Ім’я та посада', 'Ad ve görev'),
    'questionnaire.domain': m('Желаемый адрес сайта', 'Preferred website address', 'Бажана адреса сайту', 'İstenen web sitesi adresi'),
    'questionnaire.serviceLanguages': m('Языки обслуживания', 'Service languages', 'Мови обслуговування', 'Hizmet dilleri'),
    'questionnaire.languagesPh': m('Например: TR, EN, RU', 'For example: TR, EN, RU', 'Наприклад: TR, EN, UK', 'Örneğin: TR, EN, RU'),
    'questionnaire.contactsHeading': m('Контакты и материалы', 'Contacts and materials', 'Контакти й матеріали', 'İletişim ve içerikler'),
    'questionnaire.publicEmail': m('Email для клиентов', 'Client-facing email', 'Email для клієнтів', 'Müşteri e-postası'),
    'questionnaire.publicPhone': m('Телефон для клиентов', 'Client-facing phone', 'Телефон для клієнтів', 'Müşteri telefonu'),
    'questionnaire.whatsapp': m('WhatsApp', 'WhatsApp', 'WhatsApp', 'WhatsApp'),
    'questionnaire.hours': m('Часы работы', 'Opening hours', 'Години роботи', 'Çalışma saatleri'),
    'questionnaire.hoursPh': m('Пн–Сб 09:00–20:00', 'Mon–Sat 09:00–20:00', 'Пн–Сб 09:00–20:00', 'Pzt–Cmt 09:00–20:00'),
    'questionnaire.address': m('Адрес салона', 'Salon address', 'Адреса салону', 'Salon adresi'),
    'questionnaire.addressPh': m('Полный адрес и ориентир', 'Full address and nearby landmark', 'Повна адреса й орієнтир', 'Tam adres ve yakın bir işaret noktası'),
    'questionnaire.materials': m('Где находятся логотип, фото и тексты?', 'Where are the logo, photos and texts?', 'Де знаходяться логотип, фото й тексти?', 'Logo, fotoğraflar ve metinler nerede?'),
    'questionnaire.materialsPh': m('Ссылка на папку и имя владельца материалов', 'Folder link and the material owner’s name', 'Посилання на папку та ім’я власника матеріалів', 'Klasör bağlantısı ve içerik sahibinin adı'),
    'questionnaire.services': m('Услуги и цены', 'Services and prices', 'Послуги й ціни', 'Hizmetler ve fiyatlar'),
    'questionnaire.servicesPh': m('Ссылка на таблицу или краткий список', 'Link to a spreadsheet or a short list', 'Посилання на таблицю або короткий список', 'Tablo bağlantısı veya kısa liste'),
    'questionnaire.bookingHeading': m('Как клиенты будут записываться?', 'How will clients book?', 'Як клієнти записуватимуться?', 'Müşteriler nasıl randevu alacak?'),
    'questionnaire.bookingChoice': m('Выберите один основной вариант', 'Choose one main option', 'Оберіть один основний варіант', 'Bir ana seçenek seçin'),
    'questionnaire.bookingWa': m('WhatsApp — время подтверждает администратор', 'WhatsApp — staff confirm the time', 'WhatsApp — час підтверджує адміністратор', 'WhatsApp — saati çalışan onaylar'),
    'questionnaire.bookingExternal': m('Готовый сервис — клиент видит свободное время', 'Booking service — the client sees available times', 'Готовий сервіс — клієнт бачить вільний час', 'Randevu sistemi — müşteri uygun saatleri görür'),
    'questionnaire.bookingPhone': m('Телефон', 'Phone', 'Телефон', 'Telefon'),
    'questionnaire.bookingUrl': m('Ссылка на сервис записи', 'Booking service link', 'Посилання на сервіс запису', 'Randevu sistemi bağlantısı'),
    'questionnaire.bookingOwner': m('Кто отвечает на заявки?', 'Who responds to booking requests?', 'Хто відповідає на заявки?', 'Randevu taleplerini kim yanıtlar?'),
    'questionnaire.cancellation': m('Правила переноса и отмены', 'Rescheduling and cancellation rules', 'Правила перенесення та скасування', 'Değişiklik ve iptal kuralları'),
    'questionnaire.cancellationPh': m('За сколько часов можно отменить и возвращается ли предоплата', 'How many hours before the visit can it be cancelled, and is the deposit refunded?', 'За скільки годин можна скасувати та чи повертається передоплата', 'Kaç saat önce iptal edilebilir ve ön ödeme iade edilir mi?'),
    'questionnaire.prepayment': m('Нужна ли предоплата?', 'Is a deposit required?', 'Чи потрібна передоплата?', 'Ön ödeme gerekli mi?'),
    'questionnaire.prepaymentYes': m('Да, через безопасную страницу платёжного сервиса', 'Yes, through the payment provider’s secure page', 'Так, через безпечну сторінку платіжного сервісу', 'Evet, ödeme kuruluşunun güvenli sayfasında'),
    'questionnaire.rulesHeading': m('Правила и данные клиентов', 'Rules and client data', 'Правила й дані клієнтів', 'Kurallar ve müşteri verileri'),
    'questionnaire.rulesHelp': m('Если ответов пока нет, их нужно согласовать с владельцем бизнеса и местным юристом до запуска.', 'If these answers are not ready, agree them with the business owner and a local lawyer before launch.', 'Якщо відповідей ще немає, їх потрібно погодити з власником бізнесу та місцевим юристом до запуску.', 'Bu yanıtlar hazır değilse yayın öncesinde işletme sahibi ve yerel hukuk danışmanıyla netleştirin.'),
    'questionnaire.privacyUrl': m('Ссылка на политику конфиденциальности', 'Privacy notice link', 'Посилання на політику конфіденційності', 'Gizlilik bildirimi bağlantısı'),
    'questionnaire.termsUrl': m('Ссылка на правила записи и отмены', 'Booking and cancellation rules link', 'Посилання на правила запису та скасування', 'Randevu ve iptal kuralları bağlantısı'),
    'questionnaire.dataUse': m('Какие данные получает бизнес и зачем?', 'What client data does the business receive and why?', 'Які дані отримує бізнес і навіщо?', 'İşletme hangi müşteri verilerini neden alıyor?'),
    'questionnaire.dataUsePh': m('Например: имя и телефон — чтобы подтвердить запись', 'For example: name and phone number — to confirm the booking', 'Наприклад: ім’я й телефон — щоб підтвердити запис', 'Örneğin: ad ve telefon — randevuyu onaylamak için'),
    'questionnaire.dataDelete': m('Когда ненужные данные удаляются?', 'When is unneeded data deleted?', 'Коли непотрібні дані видаляються?', 'Gereksiz veriler ne zaman silinir?'),
    'questionnaire.dataDeletePh': m('Срок и ответственный человек', 'Time period and responsible person', 'Строк і відповідальна особа', 'Süre ve sorumlu kişi'),
    'questionnaire.launchHeading': m('Запуск и поддержка', 'Launch and support', 'Запуск і підтримка', 'Yayın ve destek'),
    'questionnaire.accountOwner': m('Кому принадлежат домен и основные аккаунты?', 'Who owns the domain and key accounts?', 'Кому належать домен і основні акаунти?', 'Alan adı ve temel hesaplar kime ait?'),
    'questionnaire.businessOwnerPh': m('Владелец бизнеса или компания', 'Business owner or company', 'Власник бізнесу або компанія', 'İşletme sahibi veya şirket'),
    'questionnaire.incidentContact': m('Кому звонить при сбое?', 'Who should be called if something fails?', 'Кому телефонувати в разі збою?', 'Bir sorun olduğunda kimi aramalıyız?'),
    'questionnaire.contactPh': m('Имя, телефон, email', 'Name, phone, email', 'Ім’я, телефон, email', 'Ad, telefon, e-posta'),
    'questionnaire.contentOwner': m('Кто обновляет цены и услуги?', 'Who updates prices and services?', 'Хто оновлює ціни та послуги?', 'Fiyatları ve hizmetleri kim günceller?'),
    'questionnaire.launchDate': m('Желаемая дата запуска', 'Preferred launch date', 'Бажана дата запуску', 'İstenen yayın tarihi'),
    'questionnaire.confirmHeading': m('Перед отправкой анкеты', 'Before sharing the questionnaire', 'Перед передаванням анкети', 'Formu paylaşmadan önce'),
    'questionnaire.confirmContacts': m('Контакты и адрес проверены', 'Contacts and address are correct', 'Контакти й адресу перевірено', 'İletişim bilgileri ve adres doğru'),
    'questionnaire.confirmPrices': m('Услуги и цены утверждены', 'Services and prices are approved', 'Послуги й ціни затверджено', 'Hizmetler ve fiyatlar onaylandı'),
    'questionnaire.confirmRights': m('Фото и отзывы можно публиковать', 'Photos and reviews may be published', 'Фото й відгуки можна публікувати', 'Fotoğraflar ve yorumlar yayınlanabilir'),
    'questionnaire.footer': m('Анкета клиента', 'Client questionnaire', 'Анкета клієнта', 'Müşteri formu'),

    'offer.title': m('LUMÉ Riviera — коммерческое предложение', 'LUMÉ Riviera — commercial offer', 'LUMÉ Riviera — комерційна пропозиція', 'LUMÉ Riviera — ticari teklif'),
    'offer.eyebrow': m('Предложение для клиента', 'Client offer', 'Пропозиція для клієнта', 'Müşteri teklifi'),
    'offer.heading': m('Адаптация и запуск сайта', 'Website adaptation and launch', 'Адаптація та запуск сайту', 'Web sitesinin uyarlanması ve yayına alınması'),
    'offer.lead': m('Настроим готовый сайт под реальный бизнес, подключим выбранную запись и опубликуем на домене клиента.', 'We will adapt the ready-made website to the real business, connect the chosen booking method and publish it on the client’s domain.', 'Налаштуємо готовий сайт під реальний бізнес, підключимо обраний спосіб запису й опублікуємо на домені клієнта.', 'Hazır web sitesini gerçek işletmeye uyarlayacak, seçilen randevu yöntemini bağlayacak ve müşterinin alan adında yayınlayacağız.'),
    'offer.termLabel': m('Срок:', 'Time:', 'Строк:', 'Süre:'),
    'offer.term': m('7–10 рабочих дней', '7–10 business days', '7–10 робочих днів', '7–10 iş günü'),
    'offer.validLabel': m('Предложение действует:', 'Offer valid for:', 'Пропозиція діє:', 'Teklif geçerliliği:'),
    'offer.valid': m('30 дней', '30 days', '30 днів', '30 gün'),
    'offer.client': m('Клиент', 'Client', 'Клієнт', 'Müşteri'),
    'offer.clientPh': m('Компания или имя', 'Company or name', 'Компанія або ім’я', 'Şirket veya ad'),
    'offer.contact': m('Контакт клиента', 'Client contact', 'Контакт клієнта', 'Müşteri iletişim kişisi'),
    'offer.date': m('Дата', 'Date', 'Дата', 'Tarih'),
    'offer.priceEyebrow': m('Фиксированная стоимость', 'Fixed price', 'Фіксована вартість', 'Sabit fiyat'),
    'offer.priceHeading': m('Готовый многоязычный сайт, а не простой одностраничный шаблон', 'A ready multilingual website, not a basic one-page template', 'Готовий багатомовний сайт, а не простий односторінковий шаблон', 'Basit tek sayfalık şablon değil, hazır çok dilli web sitesi'),
    'offer.advance': m('Перед началом', 'Before work starts', 'Перед початком', 'Başlamadan önce'),
    'offer.advanceText': m('После оплаты начинаются работы и бронируется время.', 'Work starts and time is reserved after payment.', 'Після оплати починаються роботи та резервується час.', 'Ödeme sonrası çalışma başlar ve takvimde zaman ayrılır.'),
    'offer.balance': m('После проверки', 'After acceptance', 'Після перевірки', 'Kontrol sonrası'),
    'offer.balanceText': m('После выполнения согласованных критериев и до закрытия проекта.', 'After the agreed acceptance checks are met and before the project is closed.', 'Після виконання погоджених критеріїв і до закриття проєкту.', 'Kararlaştırılan kabul ölçütleri tamamlandıktan ve proje kapatılmadan önce.'),
    'offer.includedHeading': m('Что входит в цену', 'What is included', 'Що входить у ціну', 'Fiyata dahil olanlar'),
    'offer.included1': m('Название, логотип, контакты, адрес и часы работы.', 'Business name, logo, contacts, address and opening hours.', 'Назва, логотип, контакти, адреса та години роботи.', 'İşletme adı, logo, iletişim bilgileri, adres ve çalışma saatleri.'),
    'offer.included2': m('До 32 услуг, цены и длительность.', 'Up to 32 services, prices and duration.', 'До 32 послуг, ціни та тривалість.', 'En fazla 32 hizmet, fiyat ve süre.'),
    'offer.included3': m('Четыре языка интерфейса; клиент предоставляет переводы своих текстов.', 'Four interface languages; the client provides translations of business content.', 'Чотири мови інтерфейсу; клієнт надає переклади своїх текстів.', 'Dört arayüz dili; işletme metinlerinin çevirilerini müşteri sağlar.'),
    'offer.included4': m('Один способ записи: WhatsApp, телефон или готовый сервис.', 'One booking method: WhatsApp, phone or a ready-made booking service.', 'Один спосіб запису: WhatsApp, телефон або готовий сервіс.', 'Bir randevu yöntemi: WhatsApp, telefon veya hazır randevu sistemi.'),
    'offer.included5': m('Один домен, защищённое соединение и публикация.', 'One domain, secure connection and publication.', 'Один домен, захищене з’єднання та публікація.', 'Bir alan adı, güvenli bağlantı ve yayınlama.'),
    'offer.included6': m('Настройка отображения сайта в поиске и при отправке ссылки.', 'Setup for search results and link previews.', 'Налаштування відображення сайту в пошуку та під час надсилання посилання.', 'Arama sonuçları ve bağlantı önizlemesi ayarları.'),
    'offer.included7': m('Проверка мобильной версии, записи и основных функций.', 'Testing of the mobile layout, booking and core functions.', 'Перевірка мобільної версії, запису й основних функцій.', 'Mobil görünüm, randevu akışı ve temel işlevlerin testi.'),
    'offer.included8': m('Два общих списка правок и 14 дней исправления ошибок после запуска.', 'Two consolidated revision rounds and 14 days of bug fixes after launch.', 'Два зведені списки правок і 14 днів виправлення помилок після запуску.', 'İki toplu revizyon turu ve yayından sonra 14 gün hata düzeltme.'),
    'offer.notIncludedHeading': m('Что оплачивается отдельно', 'What costs extra', 'Що оплачується окремо', 'Ayrıca ücretlendirilenler'),
    'offer.extra1': m('Собственная система записи, календарь, база клиентов или личный кабинет.', 'Custom booking system, calendar, client database or client account.', 'Власна система запису, календар, база клієнтів або особистий кабінет.', 'Özel randevu sistemi, takvim, müşteri veritabanı veya müşteri hesabı.'),
    'offer.extra2': m('Сложное соединение сайта с другими программами.', 'Complex connection between the website and other software.', 'Складне з’єднання сайту з іншими програмами.', 'Web sitesinin diğer yazılımlarla karmaşık entegrasyonu.'),
    'offer.extra3': m('Приём банковских карт внутри сайта.', 'Taking bank card details inside the website.', 'Приймання банківських карток усередині сайту.', 'Banka kartı bilgilerinin web sitesi içinde alınması.'),
    'offer.extra4': m('Домен и платные тарифы внешних сервисов.', 'Domain and paid third-party service plans.', 'Домен і платні тарифи зовнішніх сервісів.', 'Alan adı ve harici hizmetlerin ücretli paketleri.'),
    'offer.extra5': m('Юридические тексты и консультация юриста.', 'Legal texts and legal advice.', 'Юридичні тексти та консультація юриста.', 'Hukuki metinler ve hukuk danışmanlığı.'),
    'offer.extra6': m('Перевод, копирайтинг, фото, видео и реклама.', 'Translation, copywriting, photography, video and advertising.', 'Переклад, копірайтинг, фото, відео та реклама.', 'Çeviri, metin yazımı, fotoğraf, video ve reklam.'),
    'offer.extra7': m('Новые функции после утверждения списка работ.', 'New features after the work list is approved.', 'Нові функції після затвердження списку робіт.', 'İş listesi onaylandıktan sonra istenen yeni özellikler.'),
    'offer.extraRate': m('Дополнительные работы:', 'Additional work:', 'Додаткові роботи:', 'Ek çalışma:'),
    'offer.hour': m('час', 'hour', 'година', 'saat'),
    'offer.readyHeading': m('Когда работа считается готовой', 'When the work is accepted', 'Коли робота вважається готовою', 'İş ne zaman tamamlanmış sayılır'),
    'offer.ready1': m('Сайт открывается по согласованному адресу через защищённое соединение.', 'The website opens on the agreed address using a secure connection.', 'Сайт відкривається за погодженою адресою через захищене з’єднання.', 'Web sitesi kararlaştırılan adreste güvenli bağlantıyla açılır.'),
    'offer.ready2': m('Контакты, адрес, услуги и цены проверены клиентом.', 'The client has checked contacts, address, services and prices.', 'Клієнт перевірив контакти, адресу, послуги й ціни.', 'Müşteri iletişim bilgilerini, adresi, hizmetleri ve fiyatları kontrol etmiştir.'),
    'offer.ready3': m('Предоставленные переводы отображаются корректно.', 'The supplied translations display correctly.', 'Надані переклади відображаються правильно.', 'Sağlanan çeviriler doğru görüntülenir.'),
    'offer.ready4': m('Запись приходит правильному человеку или сервису.', 'Booking reaches the correct person or service.', 'Запис надходить потрібній людині або сервісу.', 'Randevu doğru kişiye veya sisteme ulaşır.'),
    'offer.ready5': m('Основные функции работают на телефоне и компьютере.', 'Core functions work on mobile and desktop.', 'Основні функції працюють на телефоні й комп’ютері.', 'Temel işlevler telefonda ve bilgisayarda çalışır.'),
    'offer.ready6': m('Автоматические проверки сайта проходят без серьёзных ошибок.', 'Automated website checks pass without serious errors.', 'Автоматичні перевірки сайту проходять без серйозних помилок.', 'Otomatik site kontrolleri ciddi hata olmadan geçer.'),
    'offer.ready7': m('Клиент владеет доменом и основными аккаунтами.', 'The client owns the domain and key accounts.', 'Клієнт володіє доменом і основними акаунтами.', 'Müşteri alan adının ve temel hesapların sahibidir.'),
    'offer.ready8': m('Клиент получил инструкции и одну встречу передачи до 60 минут.', 'The client receives instructions and one handover call of up to 60 minutes.', 'Клієнт отримав інструкції та одну зустріч передачі до 60 хвилин.', 'Müşteri talimatları ve en fazla 60 dakikalık bir teslim görüşmesi alır.'),
    'offer.clientProvidesHeading': m('Что нужно от клиента', 'What the client provides', 'Що потрібно від клієнта', 'Müşterinin sağlayacakları'),
    'offer.clientProvides1': m('Заполненная анкета и один человек, который принимает решения.', 'A completed questionnaire and one decision-maker.', 'Заповнена анкета й одна людина, яка ухвалює рішення.', 'Doldurulmuş form ve karar verecek tek kişi.'),
    'offer.clientProvides2': m('Логотип, фото, тексты, переводы, услуги и цены.', 'Logo, photos, texts, translations, services and prices.', 'Логотип, фото, тексти, переклади, послуги й ціни.', 'Logo, fotoğraflar, metinler, çeviriler, hizmetler ve fiyatlar.'),
    'offer.clientProvides3': m('Разрешение на публикацию фотографий и отзывов.', 'Permission to publish photos and reviews.', 'Дозвіл на публікацію фотографій і відгуків.', 'Fotoğraf ve yorumları yayınlama izni.'),
    'offer.clientProvides4': m('Утверждённые правила конфиденциальности, записи и отмены.', 'Approved privacy, booking and cancellation rules.', 'Затверджені правила конфіденційності, запису та скасування.', 'Onaylı gizlilik, randevu ve iptal kuralları.'),
    'offer.clientProvides5': m('Аккаунты домена и выбранного сервиса записи, принадлежащие бизнесу.', 'Business-owned accounts for the domain and chosen booking service.', 'Акаунти домену й обраного сервісу запису, що належать бізнесу.', 'İşletmeye ait alan adı ve seçilen randevu sistemi hesapları.'),
    'offer.acceptHeading': m('Подтверждение', 'Approval', 'Підтвердження', 'Onay'),
    'offer.nameRole': m('Имя и должность', 'Name and role', 'Ім’я та посада', 'Ad ve görev'),
    'offer.contractor': m('Исполнитель', 'Contractor', 'Виконавець', 'Yüklenici'),
    'offer.nameDetails': m('Имя и реквизиты', 'Name and business details', 'Ім’я та реквізити', 'Ad ve işletme bilgileri'),
    'offer.footer': m('Предложение €1 250', 'Offer €1,250', 'Пропозиція €1 250', 'Teklif €1.250'),
    'offer.footerNote': m('Налоги, реквизиты, подпись и применимое право уточняются в договоре.', 'Taxes, business details, signature method and applicable law are confirmed in the contract.', 'Податки, реквізити, спосіб підписання та застосовне право уточнюються в договорі.', 'Vergiler, işletme bilgileri, imza yöntemi ve geçerli hukuk sözleşmede netleştirilir.'),

    'matrix.title': m('LUMÉ Riviera — аккаунты и контакты', 'LUMÉ Riviera — accounts and contacts', 'LUMÉ Riviera — акаунти й контакти', 'LUMÉ Riviera — hesaplar ve kişiler'),
    'matrix.eyebrow': m('Заполнить перед запуском', 'Complete before launch', 'Заповнити перед запуском', 'Yayın öncesi doldurun'),
    'matrix.heading': m('Кто владеет аккаунтами и кому звонить', 'Who owns the accounts and who to call', 'Хто володіє акаунтами й кому телефонувати', 'Hesaplar kime ait ve kimi aramalıyız'),
    'matrix.lead': m('Эта таблица помогает не потерять домен, сайт или запись при смене сотрудника или подрядчика.', 'This table helps prevent loss of the domain, website or booking access when staff or contractors change.', 'Ця таблиця допомагає не втратити домен, сайт або доступ до запису під час зміни працівника чи підрядника.', 'Bu tablo, çalışan veya yüklenici değiştiğinde alan adı, site veya randevu erişiminin kaybolmasını önler.'),
    'matrix.ownerRule': m('Владелец:', 'Owner:', 'Власник:', 'Sahip:'),
    'matrix.ownerRuleText': m('бизнес, не разработчик', 'the business, not the developer', 'бізнес, а не розробник', 'geliştirici değil, işletme'),
    'matrix.loginRule': m('Вход:', 'Login:', 'Вхід:', 'Giriş:'),
    'matrix.loginRuleText': m('личный аккаунт + дополнительная защита', 'personal account + extra protection', 'особистий акаунт + додатковий захист', 'kişisel hesap + ek koruma'),
    'matrix.noSecretsText': m('В таблице нужны только имена, роли и контакты. Пароли и коды восстановления хранятся отдельно в защищённом менеджере паролей.', 'Only names, roles and contact details belong in this table. Keep passwords and recovery codes separately in a secure password manager.', 'У таблиці потрібні лише імена, ролі й контакти. Паролі та коди відновлення зберігайте окремо в захищеному менеджері паролів.', 'Bu tabloya yalnızca ad, görev ve iletişim bilgisi yazın. Parolaları ve kurtarma kodlarını güvenli bir parola yöneticisinde ayrı tutun.'),
    'matrix.simpleWords': m('Простыми словами:', 'In plain language:', 'Простими словами:', 'Basit anlatım:'),
    'matrix.simpleWordsText': m('«Владелец» может восстановить доступ и оплатить сервис. «Администратор» меняет настройки. «Дополнительная защита» — код, приложение или электронный ключ кроме пароля.', 'The “owner” can recover access and pay for the service. The “administrator” changes settings. “Extra protection” means a code, app or electronic key in addition to the password.', '«Власник» може відновити доступ і оплатити сервіс. «Адміністратор» змінює налаштування. «Додатковий захист» — це код, застосунок або електронний ключ крім пароля.', '“Sahip” erişimi kurtarabilir ve hizmeti ödeyebilir. “Yönetici” ayarları değiştirir. “Ek koruma”, parolaya ek kod, uygulama veya elektronik anahtardır.'),
    'matrix.systemsHeading': m('Основные сервисы', 'Key services', 'Основні сервіси', 'Temel hizmetler'),
    'matrix.system': m('Что', 'System', 'Що', 'Sistem'),
    'matrix.provider': m('Сервис / ссылка', 'Service / link', 'Сервіс / посилання', 'Hizmet / bağlantı'),
    'matrix.owner': m('Владелец бизнеса', 'Business owner', 'Власник бізнесу', 'İşletme sahibi'),
    'matrix.admin': m('Кто настраивает', 'Who manages it', 'Хто налаштовує', 'Kim yönetiyor'),
    'matrix.protection': m('Защита входа', 'Login protection', 'Захист входу', 'Giriş koruması'),
    'matrix.renewal': m('Оплата / восстановление', 'Payment / recovery', 'Оплата / відновлення', 'Ödeme / kurtarma'),
    'matrix.domain': m('Адрес сайта', 'Website address', 'Адреса сайту', 'Web sitesi adresi'),
    'matrix.hosting': m('Публикация сайта', 'Website hosting', 'Публікація сайту', 'Web sitesi yayını'),
    'matrix.code': m('Код сайта / GitHub', 'Website code / GitHub', 'Код сайту / GitHub', 'Site kodu / GitHub'),
    'matrix.booking': m('Запись клиентов', 'Client booking', 'Запис клієнтів', 'Müşteri randevusu'),
    'matrix.payment': m('Оплата клиентов', 'Client payments', 'Оплата клієнтів', 'Müşteri ödemeleri'),
    'matrix.email': m('Рабочая почта', 'Business email', 'Робоча пошта', 'İşletme e-postası'),
    'matrix.contactsHeading': m('Кому звонить при проблеме', 'Who to call if there is a problem', 'Кому телефонувати в разі проблеми', 'Sorun olduğunda kimi aramalıyız'),
    'matrix.businessContact': m('Владелец бизнеса — принимает решение', 'Business owner — makes the decision', 'Власник бізнесу — ухвалює рішення', 'İşletme sahibi — kararı verir'),
    'matrix.techContact': m('Технический специалист', 'Technical contact', 'Технічний спеціаліст', 'Teknik sorumlu'),
    'matrix.bookingContact': m('Поддержка сервиса записи', 'Booking service support', 'Підтримка сервісу запису', 'Randevu sistemi desteği'),
    'matrix.paymentContact': m('Поддержка платёжного сервиса', 'Payment provider support', 'Підтримка платіжного сервісу', 'Ödeme kuruluşu desteği'),
    'matrix.supportPh': m('Контакт поддержки и номер клиента', 'Support contact and customer number', 'Контакт підтримки та номер клієнта', 'Destek iletişimi ve müşteri numarası'),
    'matrix.checkHeading': m('Проверка перед запуском', 'Pre-launch check', 'Перевірка перед запуском', 'Yayın öncesi kontrol'),
    'matrix.checkOwner': m('Бизнес владеет доменом и оплатой', 'The business owns the domain and billing', 'Бізнес володіє доменом і оплатою', 'Alan adı ve ödeme hesabı işletmeye ait'),
    'matrix.checkAccounts': m('У каждого сотрудника свой вход', 'Each staff member has their own login', 'У кожного працівника свій вхід', 'Her çalışanın kendi hesabı var'),
    'matrix.checkMfa': m('Дополнительная защита входа включена', 'Extra login protection is enabled', 'Додатковий захист входу ввімкнено', 'Ek giriş koruması açık'),
    'matrix.checkRecovery': m('Понятно, как восстановить доступ', 'The access recovery process is clear', 'Зрозуміло, як відновити доступ', 'Erişimin nasıl kurtarılacağı belli'),
    'matrix.checkBilling': m('Понятно, кто и когда оплачивает продление', 'It is clear who pays for renewals and when', 'Зрозуміло, хто й коли оплачує продовження', 'Yenileme ücretini kimin ne zaman ödeyeceği belli'),
    'matrix.checkShutdown': m('Понятно, как быстро отключить запись и оплату', 'It is clear how to quickly disable booking and payment', 'Зрозуміло, як швидко вимкнути запис і оплату', 'Randevu ve ödemenin hızlıca nasıl kapatılacağı belli'),
    'matrix.notes': m('Что ещё нужно сделать и кто отвечает?', 'What is still needed and who owns it?', 'Що ще потрібно зробити й хто відповідає?', 'Başka ne yapılmalı ve kim sorumlu?'),
    'matrix.notesPh': m('Задача, ответственный и срок', 'Task, owner and deadline', 'Завдання, відповідальний і строк', 'Görev, sorumlu ve tarih'),
    'matrix.footer': m('Аккаунты и контакты', 'Accounts and contacts', 'Акаунти й контакти', 'Hesaplar ve kişiler'),
    'matrix.footerNote': m('Проверяйте таблицу раз в три месяца и после смены сотрудника или подрядчика.', 'Review this table every three months and whenever staff or contractors change.', 'Перевіряйте таблицю раз на три місяці та після зміни працівника чи підрядника.', 'Bu tabloyu üç ayda bir ve çalışan ya da yüklenici değiştiğinde kontrol edin.')
  };

  const languageParameter = new URLSearchParams(window.location.search).get('lang');
  const requestedLanguage = languageParameter === 'ua' ? 'uk' : languageParameter;
  const browserLanguage = navigator.language.toLowerCase().split('-')[0];
  let currentLanguage = languages.includes(requestedLanguage)
    ? requestedLanguage
    : languages.includes(browserLanguage)
      ? browserLanguage
      : 'ru';

  const translate = (key, language) => {
    const values = copy[key];
    return values ? values[languageIndex[language]] : '';
  };

  const applyLanguage = language => {
    currentLanguage = languages.includes(language) ? language : 'ru';
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = translate(element.dataset.i18n, currentLanguage);
      if (value) element.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const value = translate(element.dataset.i18nPlaceholder, currentLanguage);
      if (value) element.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const value = translate(element.dataset.i18nAria, currentLanguage);
      if (value) element.setAttribute('aria-label', value);
    });

    const titleKey = document.body.dataset.i18nTitle;
    const title = translate(titleKey, currentLanguage);
    if (title) document.title = title;

    document.querySelectorAll('[data-doc-lang]').forEach(button => {
      const active = button.dataset.docLang === currentLanguage;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    });

    document.querySelectorAll('[data-doc-link]').forEach(link => {
      const url = new URL(link.getAttribute('href'), window.location.href);
      url.searchParams.set('lang', currentLanguage);
      link.setAttribute('href', `${url.pathname.split('/').pop()}${url.search}${url.hash}`);
    });
  };

  document.querySelectorAll('[data-doc-lang]').forEach(button => {
    button.addEventListener('click', () => {
      const language = button.dataset.docLang;
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.replaceState(null, '', url);
      applyLanguage(language);
    });
  });

  applyLanguage(currentLanguage);
})();
