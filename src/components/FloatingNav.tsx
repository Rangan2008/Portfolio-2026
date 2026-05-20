
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS } from "../constants";

export const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center">
      <div 
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full border-2 border-teal-400 bg-[#0d1829]/80 backdrop-blur-md flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(0,229,204,0.3)] transition-shadow hover:shadow-[0_0_25px_rgba(0,229,204,0.5)]"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
          >
            <div className="grid grid-cols-2 gap-1 p-1">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
            </div>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: -10 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full top-0 flex flex-col gap-4 py-2"
            >
              {[...NAV_ITEMS].reverse().map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className="group flex items-center gap-3 justify-end whitespace-nowrap"
                >
                  <span className="text-[10px] text-teal-400 font-mono opacity-0 group-hover:opacity-100 uppercase tracking-widest transition-opacity">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-teal-400/30 bg-[#0d1829] flex items-center justify-center text-teal-400/70 hover:text-teal-400 hover:border-teal-400 transition-all">
                    <item.icon size={18} />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
