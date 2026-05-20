
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
    <div className="fixed inset-0 bg-[#060b14] z-[100] flex flex-col items-center justify-center font-mono">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white text-4xl md:text-6xl tracking-[0.2em] font-light"
      >
        {text}
        <span
          className="inline-block w-1 h-10 md:w-1.5 md:h-14 bg-teal-400 ml-3 animate-[pulse_0.8s_step-end_infinite]"
        />
      </motion.div>
    </div>
  );
});
