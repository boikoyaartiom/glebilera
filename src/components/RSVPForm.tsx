import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Send, Loader2, AlertCircle } from "lucide-react";
import { sendFormData } from "../utils/sendForm";
import { DELIVERY_METHOD } from "../config";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guestCount: "1",
    alcohol: [] as string[],
    transfer: "no",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const alcoholOptions = [
    "Красное вино",
    "Белое вино",
    "Шампанское",
    "Крепкий алкоголь",
    "Безалкогольные напитки",
  ];

  const handleAlcoholToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      alcohol: prev.alcohol.includes(option)
        ? prev.alcohol.filter((item) => item !== option)
        : [...prev.alcohol, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSending(true);
    setSendError(null);

    try {
      const result = await sendFormData(formData);
      
      if (result.success) {
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E5C3C6", "#DFC7B4", "#A8B59B", "#D4AF37"],
        });
        setIsSubmitted(true);
      } else {
        setSendError("Не удалось отправить. Попробуйте ещё раз или свяжитесь с нами напрямую.");
      }
    } catch {
      setSendError("Произошла ошибка.您的 ответ сохранён, мы свяжемся с вами.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-[#FAF7F2] text-slate-800 relative">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair+Display'] text-3xl md:text-5xl text-[#8C6D58] mb-4">
            Подтверждение присутствия
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37]/40 mx-auto mb-6" />
          <p className="font-['Montserrat'] font-light text-slate-600 leading-relaxed text-sm md:text-base">
            Пожалуйста, заполните форму ниже до 1 июля 2026 года, чтобы мы могли всё спланировать наилучшим образом.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-[#8C6D58]/10"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 border border-green-200">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-['Playfair+Display'] text-2xl text-slate-800 mb-2 font-medium">
                Спасибо за ваш ответ!
              </h3>
              <p className="font-['Montserrat'] text-slate-500 text-sm font-light leading-relaxed max-w-sm">
                Мы очень рады (или сожалеем, если вы не сможете)! Ваши пожелания учтены, и мы с нетерпением ждём встречи!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input */}
              <div>
                <label className="block font-['Montserrat'] text-sm font-medium text-slate-700 mb-2">
                  Ваше имя и фамилия *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Иван и Мария Ивановы"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8C6D58]/30 focus:border-[#8C6D58] font-['Montserrat'] text-slate-800"
                />
              </div>

              {/* Attendance radio */}
              <div>
                <label className="block font-['Montserrat'] text-sm font-medium text-slate-700 mb-2">
                  Сможете ли вы присутствовать? *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.attending === "yes"
                        ? "bg-[#8C6D58]/10 border-[#8C6D58] text-[#8C6D58]"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === "yes"}
                      onChange={() => setFormData({ ...formData, attending: "yes" })}
                      className="sr-only"
                    />
                    <span className="font-['Montserrat'] text-sm">Я/Мы придем</span>
                  </label>

                  <label
                    className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.attending === "no"
                        ? "bg-rose-50 border-rose-400 text-rose-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === "no"}
                      onChange={() => setFormData({ ...formData, attending: "no" })}
                      className="sr-only"
                    />
                    <span className="font-['Montserrat'] text-sm">Не смогу</span>
                  </label>
                </div>
              </div>

              {formData.attending === "yes" && (
                <>
                  {/* Guest count select */}
                  <div>
                    <label className="block font-['Montserrat'] text-sm font-medium text-slate-700 mb-2">
                      Количество гостей
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8C6D58]/30 focus:border-[#8C6D58] font-['Montserrat'] text-slate-800 bg-white"
                    >
                      <option value="1">Один (я один / одна)</option>
                      <option value="2">Двое (+ пара)</option>
                      <option value="3">Трое</option>
                      <option value="4">Больше трех</option>
                    </select>
                  </div>

                  {/* Alcohol preferences */}
                  <div>
                    <label className="block font-['Montserrat'] text-sm font-medium text-slate-700 mb-2">
                      Пожелания по напиткам
                    </label>
                    <div className="space-y-2">
                      {alcoholOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleAlcoholToggle(option)}
                          className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                              formData.alcohol.includes(option)
                                ? "bg-[#8C6D58] border-[#8C6D58]"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {formData.alcohol.includes(option) && (
                              <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                            )}
                          </div>
                          <span className="font-['Montserrat'] text-sm text-slate-700">
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transfer needed */}
                  <div>
                    <label className="block font-['Montserrat'] text-sm font-medium text-slate-700 mb-2">
                      Понадобится ли вам трансфер?
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.transfer === "yes"
                            ? "bg-[#8C6D58]/10 border-[#8C6D58] text-[#8C6D58]"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="transfer"
                          value="yes"
                          checked={formData.transfer === "yes"}
                          onChange={() => setFormData({ ...formData, transfer: "yes" })}
                          className="sr-only"
                        />
                        <span className="font-['Montserrat'] text-sm">Нужен трансфер</span>
                      </label>

                      <label
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.transfer === "no"
                            ? "bg-slate-50 border-slate-300 text-slate-600"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="transfer"
                          value="no"
                          checked={formData.transfer === "no"}
                          onChange={() => setFormData({ ...formData, transfer: "no" })}
                          className="sr-only"
                        />
                        <span className="font-['Montserrat'] text-sm">Доберусь сам</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Message / Wishes */}
              <div>
                <label className="block font-['Montserrat'] text-sm font-medium text-slate-700 mb-2">
                  Пожелания или комментарии
                </label>
                <textarea
                  rows={3}
                  placeholder="Ваши пожелания..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8C6D58]/30 focus:border-[#8C6D58] font-['Montserrat'] text-slate-800"
                />
              </div>

              {/* Error message */}
              {sendError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-['Montserrat']">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{sendError}</span>
                </div>
              )}

              {/* Delivery method indicator */}
              {DELIVERY_METHOD !== "none" && (
                <div className="text-center text-xs text-slate-400 font-['Montserrat']">
                  Ответ будет отправлен через: {DELIVERY_METHOD === "telegram" ? "Telegram" : DELIVERY_METHOD === "email" ? "Email" : "Google Таблица"}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 px-6 bg-[#8C6D58] hover:bg-[#725745] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-['Montserrat'] font-medium rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Отправляем...</span>
                  </>
                ) : (
                  <>
                    <span>Отправить ответ</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
