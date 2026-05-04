import { motion } from "framer-motion";
import { GlassWater, Heart, Camera, Utensils, Sparkles } from "lucide-react";

export default function Timeline() {
  const events = [
    {
      time: "15:00",
      title: "Сбор гостей",
      description: "Welcome-зона с лёгкими закусками, напитками и приятной музыкой.",
      icon: <GlassWater className="w-6 h-6 text-white" />,
    },
    {
      time: "15:30",
      title: "Торжественная церемония",
      description: "Самый трогательный момент. Обмен клятвами и кольцами.",
      icon: <Heart className="w-6 h-6 text-white" />,
    },
    {
      time: "16:30",
      title: "Поздравления и фотосессия",
      description: "Время для тёплых слов молодожёнам и памятных снимков.",
      icon: <Camera className="w-6 h-6 text-white" />,
    },
    {
      time: "17:30",
      title: "Свадебный банкет",
      description: "Веселье, танцы, вкусные угощения и праздничная программа.",
      icon: <Utensils className="w-6 h-6 text-white" />,
    },
    {
      time: "21:30",
      title: "Торт и финал вечера",
      description: "Сладкая кульминация и запуск бенгальских огней под открытым небом.",
      icon: <Sparkles className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#FAF7F2] text-slate-800 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Playfair+Display'] text-3xl md:text-5xl text-[#8C6D58] mb-4">
            Программа дня
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37]/40 mx-auto" />
        </motion.div>

        {/* Timeline Line */}
        <div className="relative border-l border-dashed border-[#8C6D58]/30 md:border-l-0 md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-ml-px md:before:w-0.5 md:before:border-l md:before:border-dashed md:before:border-[#8C6D58]/40">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 md:mb-16 flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot and icon */}
              <div className="absolute left-[-21px] md:left-1/2 md:-ml-5 top-0 md:top-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#8C6D58] shadow-lg z-10">
                {event.icon}
              </div>

              {/* Content box */}
              <div className={`w-full md:w-5/12 pl-8 md:pl-0 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
              }`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow duration-300">
                  <span className="font-['Montserrat'] font-bold text-xl text-[#D4AF37]">
                    {event.time}
                  </span>
                  <h3 className="font-['Playfair+Display'] text-lg font-semibold text-slate-800 mt-1 mb-2">
                    {event.title}
                  </h3>
                  <p className="font-['Montserrat'] text-slate-500 font-light text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
