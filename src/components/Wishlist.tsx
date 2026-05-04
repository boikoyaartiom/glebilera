import { motion } from "framer-motion";
import { Wine, Gift, Heart } from "lucide-react";

export default function Wishlist() {
  const items = [
    {
      icon: <Wine className="w-8 h-8 text-[#8C6D58]" />,
      title: "Цветы и вино",
      description: "Мы очень любим цветы, но уезжаем в путешествие сразу после праздника. Если вы хотите сделать приятное — подарите нам бутылочку вина или вашу любимую книгу для нашей домашней коллекции.",
    },
    {
      icon: <Gift className="w-8 h-8 text-[#8C6D58]" />,
      title: "Подарки",
      description: "Ваше присутствие на нашем празднике — самый ценный подарок. Если вы хотите порадовать нас материально, мы будем очень благодарны вкладу в конверте в бюджет нашего будущего свадебного путешествия.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white text-slate-800 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Playfair+Display'] text-3xl md:text-5xl text-[#8C6D58] mb-4">
            Пожелания
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37]/40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#FAF7F2] p-8 rounded-2xl border border-[#8C6D58]/10 text-center flex flex-col items-center justify-start group"
            >
              <div className="p-4 bg-white rounded-full shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-['Playfair+Display'] text-xl font-medium text-slate-800 mb-3">
                {item.title}
              </h3>
              <p className="font-['Montserrat'] text-slate-500 font-light text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center mt-12 text-[#8C6D58]/40"
        >
          <Heart className="w-12 h-12 fill-[#8C6D58]/10 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
