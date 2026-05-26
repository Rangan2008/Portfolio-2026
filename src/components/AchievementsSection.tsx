import { motion } from 'motion/react';
import { ExternalLink, Zap } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';

interface AchievementCardProps {
  achievement: typeof ACHIEVEMENTS[0];
  isFeatured?: boolean;
  index?: number;
}

const FeaturedAchievementCard = ({ achievement }: { achievement: typeof ACHIEVEMENTS[0] }) => {
  const Icon = achievement.icon;
  
  return (
    <motion.div
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 20, opacity: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Animated glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00e5cc]/20 to-[#fbbf24]/10 rounded-3xl blur-xl group-hover:blur-2xl group-hover:from-[#00e5cc]/40 transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      {/* Card Container */}
      <div className="relative lg:col-span-2 p-8 md:p-12 bg-gradient-to-br from-[#0d1829] to-[#060b14] border-2 border-[#00e5cc]/20 rounded-3xl flex flex-col justify-between gap-8 group hover:border-[#00e5cc]/50 transition-all duration-300 overflow-hidden">
        
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#00e5cc 1px, transparent 1px), linear-gradient(90deg, #00e5cc 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Accent line on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00e5cc] to-[#fbbf24] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_#00e5cc]" />
        
        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Icon and Tags */}
          <div className="flex items-start justify-between gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00e5cc]/20 to-[#fbbf24]/20 flex items-center justify-center text-[#00e5cc] group-hover:scale-110 transition-transform duration-300 border border-[#00e5cc]/30">
              <Icon size={48} strokeWidth={1.5} />
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              {achievement.tags?.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#00e5cc]/10 border border-[#00e5cc]/30 text-[#00e5cc] whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Rank Highlight */}
          {achievement.rank && (
            <div className="flex items-center gap-4 py-4 px-6 bg-gradient-to-r from-[#fbbf24]/10 to-[#00e5cc]/10 border border-[#fbbf24]/20 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Global Rank</span>
                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#00e5cc]">
                  #{achievement.rank.toLocaleString()}
                </span>
              </div>
              <div className="flex-1" />
              <Zap className="text-[#fbbf24] animate-pulse" size={28} />
            </div>
          )}
          
          {/* Title */}
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-100 group-hover:text-[#00e5cc] transition-colors duration-300">
              {achievement.title}
            </h3>
            {achievement.totalParticipants && (
              <p className="text-sm text-slate-400 font-mono">
                Out of {achievement.totalParticipants.toLocaleString()}+ participants
              </p>
            )}
          </div>
          
          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {achievement.description}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t border-[#00e5cc]/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Achieved in {achievement.date}</span>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00e5cc]/10 border border-[#00e5cc]/30 text-[#00e5cc] font-bold text-[11px] uppercase tracking-wider hover:bg-[#00e5cc]/20 hover:border-[#00e5cc]/60 transition-all duration-200 group hover:shadow-[0_0_15px_#00e5cc]">
              <ExternalLink size={14} />
              View Credential
            </button>
          </div>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#00e5cc]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#00e5cc]/10 transition-colors duration-300" />
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, index = 0 }: AchievementCardProps) => {
  const Icon = achievement.icon;
  
  return (
    <motion.div
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 20, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index * 0.1) + 0.1 }}
      className="group relative"
    >
      {/* Hover glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00e5cc]/10 to-transparent rounded-2xl blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      {/* Card */}
      <div className="relative p-6 md:p-8 bg-gradient-to-br from-[#0d1829] to-[#060b14]/50 border border-[#00e5cc]/10 rounded-2xl group-hover:border-[#00e5cc]/40 transition-all duration-300 overflow-hidden h-full flex flex-col gap-4">
        
        {/* Accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00e5cc]/0 group-hover:bg-[#00e5cc] transition-colors duration-300 shadow-[0_0_10px_#00e5cc]" />
        
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#00e5cc]/10 flex items-center justify-center text-[#00e5cc] group-hover:scale-110 transition-transform duration-300 border border-[#00e5cc]/20 relative z-10">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-1">
          <h3 className="text-base md:text-lg font-bold text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
            {achievement.title}
          </h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
            {achievement.description}
          </p>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mt-3 inline-block group-hover:text-[#00e5cc] transition-colors duration-300">
            {achievement.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const AchievementsSection = () => {
  const featuredAchievement = ACHIEVEMENTS.find(a => a.featured);
  const otherAchievements = ACHIEVEMENTS.filter(a => !a.featured);
  
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-teal-500/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00e5cc] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#fbbf24]/20 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 20, opacity: 0 }}
          viewport={{ once: true }}
          className="mb-24 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-[#00e5cc] to-transparent" />
            <span className="text-[#00e5cc] font-mono text-[10px] uppercase tracking-[0.4em]">Section_05 // Achievements</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              Achievements &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5cc] to-[#fbbf24]"> Recognition</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Competitive accomplishments and recognitions that showcase problem-solving excellence and technical prowess.
            </p>
          </div>
        </motion.div>
        
        {/* Featured Achievement */}
        {featuredAchievement && (
          <div className="mb-20">
            <FeaturedAchievementCard achievement={featuredAchievement} />
          </div>
        )}
        
        {/* Other Achievements Grid */}
        {otherAchievements.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-slate-700" />
              <span className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.4em]">Additional Recognition</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherAchievements.map((achievement, idx) => (
                <AchievementCard 
                  key={idx} 
                  achievement={achievement} 
                  index={idx}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
