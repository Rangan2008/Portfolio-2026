
import { useState, memo } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  color: string;
  github?: string;
  live?: string;
  features?: string[];
  badge?: string;
  isBento?: boolean;
  image?: string;
}

export const ProjectCard = memo(({ id, title, description, tags, color, github, live, features, badge, isBento, image }: ProjectProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative w-full ${isBento ? 'h-full' : 'h-80'} perspective-1000 cursor-pointer group`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full relative preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden p-1 bg-[#0d1829]/80 border border-teal-500/10 rounded-2xl group overflow-hidden transition-all duration-300 ${isBento ? 'hover:shadow-[0_0_30px_-5px_rgba(0,229,204,0.3)]' : ''}`}>
          <div className="h-full w-full border border-dashed border-teal-500/20 rounded-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Project Image Background */}
            {image && (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img 
                  src={`/${image}.png`} 
                  alt={title}
                  className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700 blur-[2px] grayscale group-hover:grayscale-0 group-hover:opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1829] via-[#060b14]/40 to-[#0d1829]/80" />
              </div>
            )}

            <div 
              className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-[60px] opacity-20 transition-all group-hover:scale-150 group-hover:opacity-40"
              style={{ backgroundColor: color }}
            />
            
            {/* Bento Accents */}
            {isBento && (
              <>
                <div className="absolute top-4 left-6 text-[10px] font-mono text-slate-600 font-bold opacity-50 z-10">
                  // {String(id).padStart(2, '0')}
                </div>
                <div className="absolute bottom-4 right-6 flex gap-3 text-teal-400/40 z-10">
                   {github && <Github size={14} />}
                   {live && <ExternalLink size={14} />}
                   <div className="w-4 h-4 border-r border-b border-teal-500/30 ml-2" />
                </div>
              </>
            )}

            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {!isBento && <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />}
                  <span className="text-[10px] text-teal-400 font-mono tracking-widest uppercase">{isBento ? tags[0] : 'Project_Node'}</span>
                </div>
                {(badge || (isBento && tags[1])) && (
                  <span className="px-3 py-1 bg-teal-400/5 border border-teal-400/20 text-teal-400 text-[9px] font-black uppercase tracking-tighter rounded-full">
                    {badge || tags[1]}
                  </span>
                )}
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-2 transition-colors`} style={isBento ? { color: isFlipped ? undefined : color } : {}}>{title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 font-mono leading-relaxed opacity-80">{description}</p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 px-6 pb-6">
              {tags.slice(0, 4).map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded bg-[#060b14]/80 border border-teal-500/10 text-teal-400/70 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden p-1 bg-[#0d1829] border border-teal-500/40 rounded-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="h-full w-full border border-dashed border-teal-500/20 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-1">
              <h4 className="text-sm font-mono text-teal-400 uppercase tracking-widest border-b border-teal-500/20 pb-2">Features // Specs</h4>
              {features && features.length > 0 ? (
                <ul className="space-y-2">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-slate-300 leading-normal">
                      <span className="text-teal-400 mt-0.5">▹</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs leading-relaxed text-slate-400">{description}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map(tag => (
                  <span key={tag} className="text-[11px] text-slate-500 font-mono">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              {github && (
                <a href={github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-[#060b14] border border-teal-500/20 text-teal-400 text-xs hover:border-teal-400 transition-colors">
                  <Github size={14} /> GitHub
                </a>
              )}
              {live && (
                <a href={live} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-teal-400 text-[#060b14] text-xs font-bold hover:bg-teal-300 transition-colors">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
