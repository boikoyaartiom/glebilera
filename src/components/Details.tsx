import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Details() {
  const infoCards = [
    {
      icon: <Calendar className="w-10 h-10 text-[#8C6D58]" />,
      title: "Дата",
      detail: "16 мая 2026 года",
      subDetail: "Суббота",
    },
    {
      icon: <Clock className="w-10 h-10 text-[#8C6D58]" />,
      title: "Время",
      detail: "15:00 — Сбор гостей",
      subDetail: "Просьба не опаздывать",
    },
    {
      icon: <MapPin className="w-10 h-10 text-[#8C6D58]" />,
      title: "Место",
      detail: "Ресторан «Рыбацкая Деревня»",
      subDetail: "Нажмите кнопку ниже для проезда",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white text-slate-800 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Playfair+Display'] text-3xl md:text-5xl text-[#8C6D58] mb-4">
            Где и Когда
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37]/40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-8 bg-[#FAF7F2] rounded-2xl border border-[#8C6D58]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-4 bg-white rounded-full shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="font-['Playfair+Display'] text-xl font-medium text-slate-800 mb-2">
                {card.title}
              </h3>
              <p className="font-['Montserrat'] font-semibold text-[#8C6D58] mb-1">
                {card.detail}
              </p>
              <p className="font-['Montserrat'] text-slate-500 text-sm font-light">
                {card.subDetail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Map / Route Suggestion */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 w-full rounded-2xl overflow-hidden shadow-lg relative border border-[#8C6D58]/10"
        >
          {/* Venue Image */}
          <div className="relative h-64 md:h-96 w-full">
            <img 
              src="https://avatars.mds.yandex.net/get-altay/8093564/2a00000188b44197e655689f1cdc5fa062fb/XXXL"
              alt="Место проведения свадьбы"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to local image if external URL fails
                (e.target as HTMLImageElement).src = "/images/wedding-venue.jpg";
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-['Montserrat'] text-sm uppercase tracking-wider">Наше место</span>
                  </div>
                  <p className="font-['Playfair-Display'] text-xl md:text-2xl text-white font-medium mb-1">
Ресторан «Рыбацкая Деревня»
                  </p>
                  <p className="text-white/80 font-['Montserrat'] text-sm">
                    Нажмите кнопку, чтобы построить маршрут
                  </p>
                </div>
                
                <a 
                  href="https://yandex.com/maps/-/CPSezN5S" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#8C6D58] font-['Montserrat'] font-medium rounded-full hover:bg-[#8C6D58] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  Как добраться
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
