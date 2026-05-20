
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { EXPERIENCE } from "../constants";

export const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-20 px-6">
      {/* SVG Path */}
      <div className="absolute left-[34px] md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(0, 229, 204, 0.1)" strokeWidth="4" />
          <motion.line 
            x1="50%" y1="0" x2="50%" y2="100%" 
            stroke="#00e5cc" strokeWidth="4"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="relative space-y-24">
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className={`flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className={`flex-1 hidden md:block ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
               <span className={`font-mono tracking-tighter text-sm ${exp.period.includes('Present') ? 'text-amber-500 italic' : 'text-teal-400'}`}>
                 {exp.period}
               </span>
            </div>

            <div className={`relative z-10 w-4 h-4 mt-2 md:mt-1 border-4 border-[#060b14] rounded-full ${exp.period.includes('Present') ? 'bg-amber-500 shadow-[0_0_15px_#f59e0b]' : 'bg-teal-400 shadow-[0_0_15px_rgba(0,229,204,0.8)]'}`} />

            <div className={`flex-1 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
              <div className="md:hidden mb-2">
                <span className={`font-mono text-sm ${exp.period.includes('Present') ? 'text-amber-500 italic' : 'text-teal-400'}`}>
                  {exp.period}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1 uppercase tracking-tight">{exp.role}</h3>
              <div className="text-teal-400/70 font-mono text-xs uppercase tracking-widest mb-3">{exp.company}</div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm ml-auto mr-0 md:mr-auto">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
