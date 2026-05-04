import { motion } from "framer-motion";

export default function Story() {
  return (
    <section className="py-20 px-4 bg-[#FAF7F2] text-slate-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Story Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex-1 space-y-6 text-center md:text-left"
        >
          <h2 className="font-['Playfair+Display'] text-3xl md:text-5xl text-[#8C6D58] mb-4">
            Наша История
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37]/40 mx-auto md:mx-0 mb-6" />
          
          <p className="font-['Montserrat'] font-light text-slate-600 leading-relaxed text-base md:text-lg">
            Все начиналось в обычной школе № 43, где два стеснительных подростка встретились на уроке. Валерия заметила мальчика с весёлыми глазами, Глеб — девушку с улыбкой, которая освещала весь класс. Первая любовь была наивной и чистой, как первый снег.
          </p>
          
          <p className="font-['Montserrat'] font-light text-slate-600 leading-relaxed text-base md:text-lg">
            Но жизнь распорядилась по-другому. Разные университеты, разные дороги. Казалось, что это конец их истории. Годы уходили в неизвестность...
          </p>

          <p className="font-['Montserrat'] font-light text-slate-600 leading-relaxed text-base md:text-lg">
            И вот — чудо. Жизнь снова свела их вместе. Старые номера в контактах. Первое свидание за кофе, где они поняли: некоторые чувства не исчезают со временем, они только крепнут.
          </p>

          <p className="font-['Montserrat'] font-light text-slate-600 leading-relaxed text-base md:text-lg">
            Теперь они готовы написать главное — историю, где нет пунктиров и пробелов. Где каждый день — это выбор быть вместе. Где школьная робость превратилась в уверенность в друг друге.
          </p>

          <p className="font-['Marck+Script'] text-2xl md:text-3xl text-[#8C6D58] pt-4 select-none">
            "Некоторые чувства не исчезают со временем, они только крепнут."
          </p>
        </motion.div>

        {/* Story Image */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative w-full max-w-sm md:max-w-md aspect-[3/4]"
        >
          {/* Decorative Frame */}
          <div className="absolute -inset-4 border border-[#D4AF37]/30 rounded-2xl z-0 transition-all duration-500" />
          
          <div className="relative z-10 w-full h-full rounded-xl overflow-hidden shadow-2xl bg-[#f8f5f0] flex items-center justify-center">
            {/* Реальный тег img для максимальной совместимости */}
            <img 
              src="https://storage.googleapis.com/pai-images/99066668706d48259f992388e36506d8.png"
              alt="Глеб и Валерия"
              className="w-full h-full object-cover transition-opacity duration-500 opacity-0"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.classList.remove('opacity-0');
                target.classList.add('opacity-100');
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Резервная копия на случай сбоя основного сервера
                target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop";
                target.classList.remove('opacity-0');
                target.classList.add('opacity-100');
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
