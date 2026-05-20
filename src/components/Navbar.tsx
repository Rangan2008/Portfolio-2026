
import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "motion/react";
import { NAV_ITEMS } from "../constants";
import { Terminal, Download } from "lucide-react";

export const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSegment, setActiveSegment] = useState("hero");

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        
        // Basic scroll spy
        const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSegment(NAV_ITEMS[i].id);
            break;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => scrollTo('hero')}
        >
          <div className="w-10 h-10 rounded-lg bg-teal-400/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:border-teal-400 transition-all">
            <Terminal size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tighter leading-none">RANGAN.DAS</span>
            <span className="text-[8px] text-teal-400/50 font-mono tracking-widest leading-none mt-1 uppercase">Dev_Terminal_v2</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-[#0d1829]/40 backdrop-blur-sm rounded-full border border-white/5 overflow-hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-full ${
                activeSegment === item.id 
                  ? "text-teal-400" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {activeSegment === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-teal-400/10 rounded-full border border-teal-400/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/resume.pdf"
            download="Rangan_Das_Resume.pdf"
            title="Download Resume"
            className="group flex items-center justify-center w-9 h-9 rounded-full border border-teal-400/20 text-teal-400/70 hover:border-teal-400 hover:text-teal-400 hover:bg-teal-400/5 transition-all"
          >
            <Download size={15} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
          <button 
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 px-5 py-2 bg-teal-400 text-[#060b14] rounded-full font-bold text-xs hover:shadow-[0_0_15px_rgba(0,229,204,0.3)] transition-all"
          >
            CONNECT
          </button>
        </div>

        {/* Mobile Indicator */}
        <div className="md:hidden flex items-center gap-2 px-3 py-1 bg-teal-400/5 border border-teal-400/10 rounded-full">
           <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
           <span className="text-[9px] text-teal-400/70 font-mono uppercase tracking-widest">{activeSegment}</span>
        </div>
      </div>
    </motion.nav>
  );
});
