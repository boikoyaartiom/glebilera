import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-16 bg-[#2B231E] text-white/90 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#41342D] via-[#2B231E] to-[#1A1512]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-['Marck+Script'] text-4xl md:text-5xl text-rose-200/90 mb-4 select-none"
        >
          Ждем вас на нашем празднике!
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-['Montserrat'] font-light tracking-widest text-xs uppercase text-white/50"
        >
          С любовью, Глеб и Валерия
        </motion.p>
        
        <div className="mt-12 text-[10px] font-['Montserrat'] font-light text-white/30 tracking-widest">
          © 2026 Свадебное Приглашение
        </div>
      </div>
    </footer>
  );
}
