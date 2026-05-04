import { motion } from "framer-motion";

export default function DressCode() {
  const colors = [
    { hex: "#E5C3C6", name: "Пыльная роза" },
    { hex: "#DFC7B4", name: "Кремовый" },
    { hex: "#A8B59B", name: "Шалфей" },
    { hex: "#D4AF37", name: "Приглушенное золото" },
    { hex: "#5B6D5B", name: "Оливковый" },
  ];

  return (
    <section className="py-20 px-4 bg-white text-slate-800 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-['Playfair+Display'] text-3xl md:text-5xl text-[#8C6D58] mb-4">
            Дресс-код
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37]/40 mx-auto mb-6" />
          <p className="font-['Montserrat'] font-light text-slate-600 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
            Мы будем очень признательны, если вы поддержите цветовую гамму нашей свадьбы в своих праздничных нарядах:
          </p>
        </motion.div>

        {/* Color Palette */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md border-4 border-white group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-['Montserrat'] text-xs md:text-sm text-slate-600 font-medium mt-3 opacity-90 group-hover:opacity-100 transition-opacity">
                {color.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#FAF7F2] p-6 md:p-8 rounded-2xl border border-[#8C6D58]/10 max-w-xl mx-auto"
        >
          <p className="font-['Montserrat'] text-slate-600 text-sm md:text-base font-light italic leading-relaxed">
            Для дам предпочтительны вечерние или коктейльные платья, для джентльменов — костюмы или брюки с рубашкой. Мы хотим, чтобы в этот день вы чувствовали себя комфортно и празднично!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
