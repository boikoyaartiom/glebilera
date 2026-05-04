# 💌 Как настроить отправку анкеты с вашей свадьбы

## Быстрый старт (5 минут)

### Способ 1: Telegram бот (Рекомендуется! ⭐)

Вы будете мгновенно получать ответы гостей в Telegram!

**Шаг 1: Создайте бота**
1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте `/newbot`
3. Придумайте имя бота: `Наша Свадьба RSVP`
4. Придумайте username: `our_wedding_rsvp_bot` (должен заканчиваться на `_bot`)
5. Скопируйте токен (напр. `1234567890:ABCdefGHI...`)

**Шаг 2: Узнайте ваш Chat ID**
1. Найдите вашего бота в Telegram и отправьте ему любое сообщение
2. Откройте в браузере: `https://api.telegram.org/bot<ТОКЕН>/getUpdates`
3. Найдите `"chat":{"id":123456789}` — это ваш Chat ID

**Шаг 3: Настройте проект**
Откройте файл `src/config.ts` и замените:

```typescript
export const TELEGRAM_BOT_TOKEN = "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"; // ваш токен
export const TELEGRAM_CHAT_ID = "987654321"; // ваш chat id

export const DELIVERY_METHOD: "telegram" | "email" | "google" | "none" = "telegram";
```

---

### Способ 2: Email (через Web3Forms)

Ответы будут приходить на ваш email.

**Шаг 1: Получите API ключ**
1. Перейдите на [web3forms.com](https://web3forms.com)
2. Введите ваш email
3. Подтвердите подписку (проверьте почту)
4. Скопируйте Access Key

**Шаг 2: Настройте проект**

```typescript
export const WEB3FORMS_ACCESS_KEY = "abc123def456..."; // ваш ключ

export const DELIVERY_METHOD = "email";
```

---

### Способ 3: Google Таблица

Все ответы будут автоматически собираться в таблице.

**Шаг 1: Создайте таблицу**
1. Создайте новую Google Таблицу
2. В первой строке напишите заголовки: Время | Имя | Статус | Гости | Напитки | Трансфер | Пожелания

**Шаг 2: Создайте скрипт**
1. Нажмите Extensions → Apps Script
2. Вставьте этот код:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.attending,
    data.guestCount,
    data.alcohol,
    data.transfer,
    data.message
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Нажмите "Deploy" → "New deployment"
4. Тип: Web app
5. Execute as: Me
6. Who has access: Anyone
7. Скопируйте URL

**Шаг 3: Настройте проект**

```typescript
export const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/ABCD1234/exec";

export const DELIVERY_METHOD = "google";
```

---

## 📋 После настройки

1. Пересоберите проект: `npm run build`
2. Загрузите папку `dist` на хостинг (Netlify/Vercel)
3. Протестируйте форму на телефоне
4. Отправьте ссылку гостям!

---

## 💡 Советы

- **Все ответы сохраняются в браузере** даже без настройки (localStorage)
- Можно комбинировать способы, изменив код отправки
- Не забудьте указать свой email/телефон для связи на случай проблем

---

## ❓ Проблемы?

- Если Telegram не работает — проверьте токен и chat ID
- Если почта не приходит — проверьте спам
- Если Google Таблица — убедитесь, что скрипт опубликован

**Удачной свадьбы! 🎉**
