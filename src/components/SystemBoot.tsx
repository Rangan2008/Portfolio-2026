
import { useState, useEffect, memo } from "react";
import { motion } from "motion/react";

export const SystemBoot = memo(({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");
  const name = "Rangan Das";
  const [phase, setPhase] = useState(0); // 0: Decrypt, 1: Loading, 2: Complete

  useEffect(() => {
    setText("");
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx <= name.length) {
        setText(name.slice(0, currentIdx));
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase(1), 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => {
        setPhase(2);
        setTimeout(onComplete, 1000);
      }, 1500);
    }
  }, [phase, onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-[#060b14] z-[100] flex flex-col items-center justify-center font-mono overflow-hidden cursor-pointer"
      onClick={onComplete}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white text-3xl sm:text-4xl md:text-6xl tracking-[0.2em] font-light px-4 text-center whitespace-nowrap max-w-full"
      >
        {text}
        <span
          className="inline-block w-1 h-8 sm:h-10 md:w-1.5 md:h-14 bg-teal-400 ml-2 animate-[pulse_0.8s_step-end_infinite] align-middle"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 text-gray-400 text-xs sm:text-sm tracking-widest text-center px-4"
      >
        [ TAP OR CLICK ANYWHERE TO SKIP ]
      </motion.div>
    </div>
  );
});
