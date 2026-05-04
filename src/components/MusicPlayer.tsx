import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Романтическая свадебная мелодия - мягкие аккорды
  const romanticMelody = [
    // Начинаем с нежного аккорда (до мажор)
    { notes: [261.63, 329.63, 392.00], duration: 0.8, delay: 0 },      // C
    { notes: [293.66, 369.99, 440.00], duration: 0.8, delay: 0.9 },    // Dm
    { notes: [329.63, 415.30, 493.88], duration: 0.8, delay: 1.8 },    // Em
    { notes: [349.23, 440.00, 523.25], duration: 0.8, delay: 2.7 },    // F
    
    // Продолжение - восходящая мелодия
    { notes: [392.00, 493.88, 587.33], duration: 0.8, delay: 3.6 },    // G
    { notes: [329.63, 415.30, 493.88], duration: 0.8, delay: 4.5 },    // Em
    { notes: [349.23, 440.00, 523.25], duration: 0.8, delay: 5.4 },    // F
    { notes: [392.00, 493.88, 587.33], duration: 1.2, delay: 6.3 },    // G (длиннее)
    
    // Нежное завершение
    { notes: [261.63, 329.63, 392.00], duration: 1.2, delay: 7.6 },    // C
    { notes: [349.23, 440.00, 523.25], duration: 0.8, delay: 8.9 },    // F
    { notes: [392.00, 493.88, 587.33], duration: 0.8, delay: 9.8 },    // G
    { notes: [261.63, 329.63, 392.00], duration: 1.5, delay: 10.7 },   // C (долгий)
  ];

  const playNote = useCallback((ctx: AudioContext, freq: number, startTime: number, duration: number, volume: number = 0.08) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Используем синусоиду для мягкого звука арфы/фортепиано
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Плавное затухание для нежного звука
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  }, []);

  const playRomanticMelody = useCallback(() => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Воспроизводим аккорды
    romanticMelody.forEach(({ notes, duration, delay }) => {
      notes.forEach((freq, i) => {
        // Небольшой разброс по времени для эффекта "фортепиано"
        playNote(ctx, freq, now + delay + i * 0.02, duration, 0.06);
      });
    });
  }, [playNote]);

  const toggleMusic = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      playRomanticMelody();
      
      // Повторяем мелодию каждые 12 секунд (чтобы закончилась предыдущая)
      intervalRef.current = setInterval(playRomanticMelody, 12000);
      setIsPlaying(true);
    }
  }, [isPlaying, playRomanticMelody]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggleMusic}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 border backdrop-blur-md cursor-pointer ${
          isPlaying 
          ? "bg-gradient-to-r from-[#8C6D58] to-[#D4AF37] text-white border-[#8C6D58]/20" 
          : "bg-white/80 text-[#8C6D58] border-slate-200 hover:bg-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {/* Мягкие анимированные полоски - как мерцание сердца */}
              <div className="flex gap-0.5 items-center h-4 w-4">
                <motion.span 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-white rounded-full" 
                />
                <motion.span 
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-white rounded-full" 
                />
                <motion.span 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-white rounded-full" 
                />
              </div>
              <Volume2 className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <VolumeX className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
