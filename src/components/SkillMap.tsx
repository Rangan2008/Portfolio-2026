
import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILLS } from "../constants";

const CATEGORIES = {
  Frontend: { x: 22, y: 35, color: "#00e5cc" },
  Backend: { x: 78, y: 35, color: "#f59e0b" },
  Core: { x: 50, y: 55, color: "#e2e8f0" },
  Database: { x: 22, y: 70, color: "#3b82f6" },
  DevOps: { x: 78, y: 70, color: "#10b981" },
  Workflow: { x: 50, y: 18, color: "#8b5cf6" },
  Testing: { x: 50, y: 82, color: "#ec4899" }
};

interface SkillNode {
  name: string;
  category: string;
  level: string;
  description: string;
  x: number;
  y: number;
  catPos: { x: number; y: number; color: string };
  radius: number;
  glow: number;
}

export const SkillConstellationMap = memo(() => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  const skillNodes: SkillNode[] = useMemo(() => SKILLS.map((skill, index) => {
    const cat = CATEGORIES[skill.category as keyof typeof CATEGORIES] || CATEGORIES.Core;
    const skillsInCat = SKILLS.filter(s => s.category === skill.category);
    const catIndex = skillsInCat.indexOf(skill);
    const angle = (catIndex * (Math.PI * 2)) / skillsInCat.length + (index * 0.1);
    const radius = 9 + (index % 3) * 3;
    
    return {
      ...skill,
      x: cat.x + Math.cos(angle) * radius,
      y: cat.y + Math.sin(angle) * radius,
      catPos: cat,
      radius: skill.level === "Advanced" ? 1.5 : 1.0,
      glow: skill.level === "Advanced" ? 0.6 : 0.4
    };
  }), []);

  return (
    <div className="relative w-full min-h-[400px] md:min-h-[700px] bg-[#0d1829]/50 rounded-2xl md:rounded-3xl border border-teal-500/10 overflow-hidden p-2 sm:p-4 md:p-8">
      <svg className="w-full h-full min-h-[350px] md:min-h-[650px]" viewBox="-5 -5 110 110" preserveAspectRatio="xMidYMid meet">
        {/* Connection Lines within categories */}
        {Object.keys(CATEGORIES).map(catName => {
          const nodes = skillNodes.filter(n => n.category === catName);
          return nodes.map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            if (nodes.length < 2) return null;
            return (
              <line
                key={`connection-${catName}-${i}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke={node.catPos.color}
                strokeWidth="0.08"
                opacity="0.2"
              />
            );
          });
        })}

        {/* Connection Lines to category centers */}
        {skillNodes.map((skill, i) => (
          <line
            key={`line-${i}`}
            x1={skill.x}
            y1={skill.y}
            x2={skill.catPos.x}
            y2={skill.catPos.y}
            stroke={skill.catPos.color}
            strokeWidth="0.08"
            opacity="0.15"
          />
        ))}

        {/* Skill Nodes */}
        {skillNodes.map((skill, i) => (
          <motion.g
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.03 }}
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Glow effect */}
            <circle
              cx={skill.x}
              cy={skill.y}
              r={skill.radius * 3}
              fill={skill.catPos.color}
              className="opacity-0 group-hover:opacity-40 transition-opacity blur-[2px]"
            />
            <motion.circle
              cx={skill.x}
              cy={skill.y}
              r={skill.radius}
              fill="#060b14"
              stroke={skill.catPos.color}
              strokeWidth="0.3"
              whileHover={{ r: skill.radius * 1.3, strokeWidth: 0.5 }}
            />

            {/* Permanent Skill Label */}
            <text
              x={skill.x}
              y={skill.y - skill.radius - 1.5}
              fontSize="1.4"
              fill={skill.catPos.color}
              textAnchor="middle"
              className="font-mono font-black pointer-events-none"
              style={{ filter: "drop-shadow(0px 0px 1px rgba(0,0,0,1))" }}
            >
              {skill.name}
            </text>
          </motion.g>
        ))}

        {/* Category Labels */}
        {Object.entries(CATEGORIES).map(([name, pos]) => (
          <g key={name} className="pointer-events-none">
            <circle cx={pos.x} cy={pos.y} r="2.5" fill="#060b14" opacity="0.6" />
            <circle cx={pos.x} cy={pos.y} r="1.5" fill={pos.color} opacity="0.2" className="blur-xl" />
            <motion.text 
              x={pos.x} 
              y={pos.y - 0.5} 
              fontSize="1.8" 
              fill={pos.color} 
              textAnchor="middle" 
              className="font-mono uppercase tracking-[0.4em] font-black opacity-100 brightness-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              {name}
            </motion.text>
          </g>
        ))}

        {/* Ambient background — static dots, no infinite animation */}
        {[...Array(15)].map((_, i) => (
          <circle
            key={`bg-${i}`}
            cx={(i * 7.3) % 100}
            cy={(i * 11.7) % 100}
            r="0.08"
            fill="#00e5cc"
            opacity="0.1"
          />
        ))}
      </svg>

      {/* Actual Tooltip - Absolutely positioned relative to container */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-[100] w-[180px] md:w-[220px] max-w-[90vw] pointer-events-none hidden md:block"
            style={{
              // Converting SVG coordinates (-5 to 110) to percentage (0 to 100)
              left: `${((hoveredSkill.x + 5) / 115) * 100}%`,
              top: `${((hoveredSkill.y + 5) / 115) * 100}%`,
              transform: `translate(${hoveredSkill.x > 50 ? '-100%' : '0%'}, ${hoveredSkill.y > 75 ? '-100%' : '0%'})`,
              marginLeft: hoveredSkill.x > 50 ? '-14px' : '14px',
              marginTop: hoveredSkill.y > 75 ? '-14px' : '14px'
            }}
          >
            <div 
              className="bg-[#0a0f1e]/92 backdrop-blur-[8px] p-[12px_14px] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10"
              style={{ 
                borderColor: `${hoveredSkill.catPos.color}99`, // 60% opacity (approx 99 hex alpha)
                borderLeft: `3px solid ${hoveredSkill.catPos.color}`
              }}
            >
              <div className="flex justify-between items-start mb-2 gap-2">
                <h4 className="text-[16px] font-bold leading-tight" style={{ color: hoveredSkill.catPos.color }}>
                  {hoveredSkill.name}
                </h4>
                <span className={`text-[10px] font-bold px-[7px] py-[2px] rounded-full shrink-0 whitespace-nowrap ${
                  hoveredSkill.level === 'Advanced' 
                    ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' 
                    : 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30'
                }`}>
                  {hoveredSkill.level}
                </span>
              </div>
              
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                {hoveredSkill.category} // MODULE
              </p>
              
              <p className="text-[12px] text-[#a0aec0] leading-snug font-medium italic">
                {hoveredSkill.description}
              </p>

              <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center opacity-60">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ color: hoveredSkill.catPos.color }} />
                  <div className="w-1 h-1 rounded-full bg-current opacity-40 animate-pulse delay-75" style={{ color: hoveredSkill.catPos.color }} />
                </div>
                <span className="text-[8px] font-mono text-slate-500 uppercase">Status: Linked</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-teal-400/30 uppercase tracking-[0.3em]">
        Neural_Competency_Mapping // RDN-9000
      </div>
    </div>
  );
})
