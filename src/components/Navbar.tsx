
import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS } from "../constants";
import { Terminal, Download, Menu, X } from "lucide-react";

export const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSegment, setActiveSegment] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center justify-center p-2 rounded-md border border-white/5 bg-[#0d1829]/40 backdrop-blur-sm cursor-pointer hover:bg-[#0d1829]/60 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
           {isMobileMenuOpen ? <X size={20} className="text-teal-400" /> : <Menu size={20} className="text-teal-400" />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#060b14]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden flex flex-col items-center justify-center gap-8 -mt-[1px]"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-2xl font-mono uppercase tracking-widest transition-all ${
                  activeSegment === item.id 
                    ? "text-teal-400 scale-110" 
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <a
              href="/resume.pdf"
              download="Rangan_Das_Resume.pdf"
              className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full border border-teal-400/20 text-teal-400 hover:bg-teal-400/10 transition-all font-mono uppercase tracking-widest text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Download size={16} /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});
