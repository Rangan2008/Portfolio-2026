
import { useEffect, useRef } from "react";

export const CursorTrail = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Direct DOM manipulation — zero React re-renders on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={dotRef}
      className="hidden md:block fixed pointer-events-none z-[100] w-6 h-6 border border-teal-400/70 rounded-full will-change-transform"
      style={{ top: 0, left: 0 }}
    />
  );
};
