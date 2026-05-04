/**
 * ⚙️ КОНФИГУРАЦИЯ ОТПРАВКИ АНКЕТЫ
 * 
 * Выберите один из способов доставки ответов гостей.
 */

// =====================
// 1. TELEGRAM БОТ (Рекомендуется! Мгновенные уведомления)
// =====================
// Как настроить:
// 1. Найдите @BotFather в Telegram → /newbot
// 2. Напишите боту любое сообщение
// 3. Перейдите: https://api.telegram.org/botТОКЕН/getUpdates
// 4. Найдите "chat":{"id": ЧИСЛО}
export const TELEGRAM_BOT_TOKEN = "ВАШ_ТОКЕН_БОТА"; 
export const TELEGRAM_CHAT_ID = "ВАШ_CHAT_ID"; 

// =====================
// 2. EMAIL (Web3Forms — БЕСПЛАТНО, без верификации!)
// =====================
// 🚀 Быстрый старт:
// 1. Перейдите на https://web3forms.com
// 2. Введите ваш email → получите ключ
// 3. Вставьте ключ сюда
// 
// ✅ Преимущества: работает сразу, не нужна верификация Google
export const WEB3FORMS_ACCESS_KEY = "ВАШ_КЛЮЧ"; 

// =====================
// 3. GOOGLE ТАБЛИЦА
// =====================
// Ваша таблица: https://docs.google.com/spreadsheets/d/1NotdK4asqLtVJHcvbgUhzW7SLb3VWM4fD0o2thExGk8/edit
//
// Если вы уже опубликовали Apps Script, вставьте URL сюда 👇
// URL выглядит так: https://script.google.com/macros/s/ABCD123/exec
export const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbw-bV9RsIW0GyN8QcrSh6NbLAuR9GBOMMu42o6M-LDdk6RBwFqNyaE0E3Lr39dRgHGgOA/exec";

// =====================
// ВЫБОР СПОСОБА ОТПРАВКИ (измените на нужный)
// =====================
// "telegram" | "email" | "google" | "none"
export const DELIVERY_METHOD: "telegram" | "email" | "google" | "none" = "google";
