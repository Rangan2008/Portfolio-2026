
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
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-12 md:py-20 px-4 md:px-6">
      {/* SVG Path */}
      <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(0, 229, 204, 0.1)" strokeWidth="4" />
          <motion.line 
            x1="50%" y1="0" x2="50%" y2="100%" 
            stroke="#00e5cc" strokeWidth="4"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="relative space-y-12 md:space-y-24">
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className={`flex items-start gap-4 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className={`flex-1 hidden md:block ${i % 2 === 0 ? 'text-right pr-6 md:pr-12' : 'text-left pl-6 md:pl-12'}`}>
               <span className={`font-mono tracking-tighter text-sm ${exp.period.includes('Present') ? 'text-amber-500 italic' : 'text-teal-400'}`}>
                 {exp.period}
               </span>
            </div>

            <div className={`relative shrink-0 z-10 w-4 h-4 mt-1.5 md:mt-1 border-4 border-[#060b14] rounded-full ${exp.period.includes('Present') ? 'bg-amber-500 shadow-[0_0_15px_#f59e0b]' : 'bg-teal-400 shadow-[0_0_15px_rgba(0,229,204,0.8)]'}`} />

            <div className={`flex-1 w-full md:w-1/2 max-w-full overflow-hidden ${i % 2 === 0 ? 'md:pl-6 lg:pl-12' : 'md:pr-6 lg:pr-12 md:text-right'}`}>
              <div className="md:hidden mb-2">
                <span className={`font-mono text-sm ${exp.period.includes('Present') ? 'text-amber-500 italic' : 'text-teal-400'}`}>
                  {exp.period}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 uppercase tracking-tight break-words">{exp.role}</h3>
              <div className="text-teal-400/70 font-mono text-xs uppercase tracking-widest mb-3 break-words">{exp.company}</div>
              <p className={`text-sm text-slate-500 leading-relaxed max-w-sm break-words ${i % 2 === 0 ? 'md:mr-auto ml-0' : 'md:ml-auto ml-0'}`}>
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
