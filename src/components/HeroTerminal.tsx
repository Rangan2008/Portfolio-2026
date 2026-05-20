
import { useState, useEffect, memo } from "react";
import { motion } from "motion/react";

const HEADER_TITLE = "rangan@portfolio:~$";

const ALL_LINES = [
  "Initializing portfolio...",
  "Loading skills: Python, React, Flask...",
  "Projects deployed: 9",
  "Status: Available for Work ✓",
  "Auth level: ROOT",
  "Building the digital future...",
];

const CHAR_DELAY = 38;      // ms per character in body lines
const HEADER_DELAY = 55;    // ms per character in header
const LINE_PAUSE = 160;     // ms pause between lines

type Phase = "header" | "lines" | "done";

export const HeroTerminal = memo(() => {
  const [headerText, setHeaderText] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("header");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Phase 1: type the header title
  useEffect(() => {
    if (phase !== "header") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setHeaderText(HEADER_TITLE.slice(0, i));
      if (i >= HEADER_TITLE.length) {
        clearInterval(id);
        // small pause before typing lines
        setTimeout(() => setPhase("lines"), 400);
      }
    }, HEADER_DELAY);
    return () => clearInterval(id);
  }, [phase]);

  // Phase 2: type the body lines
  useEffect(() => {
    if (phase !== "lines") return;

    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (lineIdx >= ALL_LINES.length) {
        setPhase("done");
        return;
      }

      const currentLine = ALL_LINES[lineIdx];

      if (charIdx <= currentLine.length) {
        setLines(prev => {
          const next = [...prev];
          next[lineIdx] = currentLine.slice(0, charIdx);
          return next;
        });
        charIdx++;
        setTimeout(tick, CHAR_DELAY);
      } else {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, LINE_PAUSE);
      }
    };

    const id = setTimeout(tick, 0);
    return () => clearTimeout(id);
  }, [phase]);

  const isTypingBody = phase === "lines";
  const isTypingHeader = phase === "header";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        opacity: { duration: 0.8, delay: 1 },
        x: { duration: 0.8, delay: 1 },
      }}
      className="w-full max-w-[520px] mx-auto bg-[#0a0f1e]/80 backdrop-blur-md border border-teal-500/20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,255,204,0.05)]"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5 sm:gap-2 shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
        </div>

        {/* Typed header title */}
        <div className="text-[9px] sm:text-[11px] font-mono text-slate-500 font-bold uppercase tracking-widest flex items-center shrink overflow-hidden text-ellipsis whitespace-nowrap mx-2">
          <span className="truncate">{headerText}</span>
          {isTypingHeader && (
            <span
              className="inline-block w-[5px] sm:w-[7px] h-[11px] sm:h-[13px] bg-teal-400 ml-[2px] align-middle shrink-0"
              style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
            />
          )}
        </div>

        <div className="w-8 sm:w-12 shrink-0" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8 font-mono text-[11px] sm:text-sm min-h-[200px] sm:min-h-[280px] space-y-2.5 sm:space-y-3 relative group overflow-x-hidden break-words">
        {/* CRT scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,4px_100%]" />

        {/* Typed lines */}
        {lines.map((line, i) => {
          const isActiveLine = isTypingBody && i === lines.length - 1;
          return (
            <div key={i} className="text-[#00ffcc] flex gap-2 sm:gap-3 text-left">
              <span className="opacity-40 text-slate-500 shrink-0 mt-[2px] sm:mt-0">❯</span>
              <span className="leading-relaxed break-words whitespace-pre-wrap flex-1">
                {line}
                {isActiveLine && (
                  <span
                    className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-4 bg-[#00ffcc] ml-[3px] align-middle"
                    style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
                  />
                )}
              </span>
            </div>
          );
        })}

        {/* Idle cursor before typing starts */}
        {lines.length === 0 && phase !== "header" && (
          <div className="text-[#00ffcc] flex gap-2 sm:gap-3 text-left">
            <span className="opacity-40 text-slate-500 shrink-0 mt-[2px] sm:mt-0">❯</span>
            <span
              className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-4 bg-[#00ffcc] align-middle"
              style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
            />
          </div>
        )}

        {/* Steady cursor at end when done */}
        {phase === "done" && (
          <div className="text-[#00ffcc] flex gap-2 sm:gap-3 text-left">
            <span className="opacity-40 text-slate-500 shrink-0 mt-[2px] sm:mt-0">❯</span>
            <span
              className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-4 bg-[#00ffcc] align-middle animate-[pulse_1.2s_ease-in-out_infinite]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
});
