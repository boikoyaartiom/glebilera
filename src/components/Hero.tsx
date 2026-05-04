import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  // Target date: May 16, 2026 at 15:00:00
  const targetDate = new Date("2026-05-16T15:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  const timeUnits = [
    { label: "дней", value: timeLeft.days },
    { label: "часов", value: timeLeft.hours },
    { label: "минут", value: timeLeft.minutes },
    { label: "секунд", value: timeLeft.seconds },
  ];

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out scale-105 hover:scale-100"
        style={{ backgroundImage: "url('/images/wedding-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="h-px w-8 bg-white/60" />
          <span className="text-white/90 uppercase tracking-widest text-sm font-light font-['Montserrat']">
            Приглашение
          </span>
          <div className="h-px w-8 bg-white/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-white font-['Marck+Script'] text-6xl md:text-8xl mb-6 drop-shadow-md select-none"
        >
          Глеб <span className="text-3xl md:text-5xl font-sans text-rose-200">&</span> Валерия
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-slate-100 font-['Playfair+Display'] text-xl md:text-2xl mb-12 italic tracking-wide"
        >
          Создают новую семью
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-4 gap-4 md:gap-8 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 md:px-12 md:py-6 shadow-2xl border border-white/20 select-none"
        >
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-white font-['Montserrat'] font-medium text-2xl md:text-4xl min-w-[3rem] text-center">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-white/80 font-light text-xs md:text-sm mt-1 uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-10"
        >
          <span className="text-white/90 font-['Playfair+Display'] text-lg md:text-xl tracking-wider">
            16.05.2026
          </span>
        </motion.div>
      </div>

      {/* Floating Heart Icon */}
      <div className="absolute top-8 right-8 z-20 text-white/40">
        <Heart className="animate-pulse w-8 h-8 fill-white/10" />
      </div>

      {/* Scroll Down Arrow */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 z-10 text-white/80 hover:text-white cursor-pointer transition-colors p-2"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </div>
  );
}
