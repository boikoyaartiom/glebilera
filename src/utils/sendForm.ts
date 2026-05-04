import {
  DELIVERY_METHOD,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  WEB3FORMS_ACCESS_KEY,
  GOOGLE_SHEETS_URL,
} from "../config";

export interface FormData {
  name: string;
  attending: string;
  guestCount: string;
  alcohol: string[];
  transfer: string;
  message: string;
}

// Форматирование данных для красивого отображения
function formatTelegramMessage(data: FormData): string {
  const statusEmoji = data.attending === "yes" ? "✅ Придёт" : "❌ Не сможет";
  const alcoholList = data.alcohol.length > 0 ? data.alcohol.join(", ") : "Не указано";
  
  return `
🎉 *Новый ответ на приглашение!*

👤 *Гость:* ${data.name}
📋 *Статус:* ${statusEmoji}
👥 *Количество гостей:* ${data.guestCount}
🍷 *Напитки:* ${alcoholList}
🚗 *Трансфер:* ${data.transfer === "yes" ? "Нужен" : "Самостоятельно"}
💬 *Пожелания:* ${data.message || "Нет"}
  `.trim();
}

// Отправка в Telegram
async function sendToTelegram(data: FormData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "ВАШ_ТОКЕН_БОТА") {
    console.warn("⚠️ Telegram bot token не настроен");
    return false;
  }

  const message = formatTelegramMessage(data);
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    return false;
  }
}

// Отправка на Email через Web3Forms
async function sendToEmail(data: FormData): Promise<boolean> {
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "ВАШ_КЛЮЧ") {
    console.warn("⚠️ Web3Forms key не настроен");
    return false;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: ` RSVP: ${data.name} — ${data.attending === "yes" ? "Придёт" : "Не сможет"}`,
        name: data.name,
        attending: data.attending === "yes" ? "Придёт" : "Не сможет",
        guest_count: data.guestCount,
        alcohol: data.alcohol.join(", "),
        transfer: data.transfer === "yes" ? "Нужен" : "Нет",
        message: data.message || "Нет пожеланий",
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Ошибка отправки email:", error);
    return false;
  }
}

// Отправка в Google Таблицу
async function sendToGoogleSheets(data: FormData): Promise<boolean> {
  if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL.includes("ВСТАВЬТЕ")) {
    console.warn("⚠️ Google Sheets URL не настроен");
    return false;
  }

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString("ru-RU"),
        name: data.name,
        attending: data.attending === "yes" ? "Придёт" : "Не сможет",
        guestCount: data.guestCount,
        alcohol: data.alcohol.join(", "),
        transfer: data.transfer === "yes" ? "Да" : "Нет",
        message: data.message,
      }),
    });
    return true;
  } catch (error) {
    console.error("Ошибка отправки в Google Sheets:", error);
    return false;
  }
}

// Главная функция отправки
export async function sendFormData(data: FormData): Promise<{ success: boolean; method: string }> {
  // Сохраняем локально на всякий случай
  const saved = JSON.parse(localStorage.getItem("wedding-rsvp") || "[]");
  saved.push({ ...data, timestamp: new Date().toISOString() });
  localStorage.setItem("wedding-rsvp", JSON.stringify(saved));

  switch (DELIVERY_METHOD) {
    case "telegram": {
      const success = await sendToTelegram(data);
      return { success, method: "Telegram" };
    }
    case "email": {
      const success = await sendToEmail(data);
      return { success, method: "Email" };
    }
    case "google": {
      const success = await sendToGoogleSheets(data);
      return { success, method: "Google Таблица" };
    }
    case "none":
    default:
      // Если способ не выбран, просто сохраняем локально
      return { success: true, method: "Локальное сохранение" };
  }
}
