import { motion } from 'motion/react';
import { ExternalLink, Award } from 'lucide-react';
import { FEATURED_CERTS, SUPPORTING_CERTS } from '../constants';

interface CertificationCardProps {
  cert: typeof FEATURED_CERTS[0] | typeof SUPPORTING_CERTS[0];
  isFeatured?: boolean;
  index?: number;
}

const getCategoryColor = (category: string): { accent: string; border: string; bg: string } => {
  const colors: Record<string, { accent: string; border: string; bg: string }> = {
    'AI & Machine Learning': { accent: '#00e5cc', border: '#00e5cc', bg: '#00e5cc' },
    'Web Development': { accent: '#3b82f6', border: '#3b82f6', bg: '#3b82f6' },
    'Cybersecurity': { accent: '#ef4444', border: '#ef4444', bg: '#ef4444' },
    'Professional Simulations': { accent: '#f59e0b', border: '#f59e0b', bg: '#f59e0b' },
    'default': { accent: '#8b5cf6', border: '#8b5cf6', bg: '#8b5cf6' }
  };
  return colors[category] || colors['default'];
};

const FeaturedCertCard = ({ cert, index = 0 }: { cert: typeof FEATURED_CERTS[0]; index?: number }) => {
  const colors = getCategoryColor(cert.category);
  
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 24, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
      style={{
        background: `linear-gradient(135deg, #0d1829 60%, ${colors.bg}12 100%)`,
      }}
    >
      {/* Border with hover effect */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300"
        style={{
          border: `2px solid ${colors.border}30`,
        }}
      />
      
      <div className="group-hover:border-opacity-100 transition-all duration-300 absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: `2px solid ${colors.border}`,
          opacity: 0,
        }}
      />
      
      {/* Animated gradient glow on hover */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-[60px] opacity-20 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: colors.bg }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col p-8 md:p-10 gap-6">
        {/* Header: Category Badge + Date */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border"
              style={{
                color: colors.accent,
                borderColor: `${colors.border}60`,
                backgroundColor: `${colors.bg}15`
              }}
            >
              {cert.category}
            </span>
            {cert.via && (
              <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full bg-white/5 text-slate-400 border border-white/10">
                via {cert.via}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
            {cert.date}
          </span>
        </div>
        
        {/* Certificate Title */}
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold leading-tight text-slate-100 group-hover:text-slate-50 transition-colors duration-300 mb-3">
            {cert.name}
          </h3>
          <p className="text-slate-400 text-sm">
            Issued by <span className="font-semibold text-slate-200">{cert.issuer}</span>
          </p>
        </div>
        
        {/* CTA Button */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-200 group-hover:shadow-lg w-fit"
          style={{
            color: colors.accent,
            borderColor: `${colors.border}60`,
            backgroundColor: `${colors.bg}10`,
          }}
        >
          <ExternalLink size={12} />
          View Credential
        </div>
      </div>
    </motion.a>
  );
};

const SupportingCertCard = ({ cert, index = 0 }: { cert: typeof SUPPORTING_CERTS[0]; index?: number }) => {
  const colors = getCategoryColor(cert.category);
  
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 12, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative p-4 md:p-5 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col gap-2 h-full hover:shadow-xl"
      style={{
        borderColor: `${colors.border}20`,
        backgroundColor: '#0d1829/40',
      }}
    >
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          border: `1.5px solid ${colors.border}`,
        }}
      />
      
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: colors.bg }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col gap-2">
        {/* Header: Issuer + Icon */}
        <div className="flex items-center justify-between gap-2">
          <span 
            className="text-[9px] font-mono font-bold uppercase tracking-wider truncate"
            style={{ color: colors.accent }}
          >
            {cert.issuer}
          </span>
          <ExternalLink 
            size={11} 
            className="opacity-40 group-hover:opacity-80 transition-opacity shrink-0"
            style={{ color: colors.accent }}
          />
        </div>
        
        {/* Certificate Name */}
        <h4 className="text-xs md:text-sm font-bold text-slate-200 leading-snug group-hover:text-slate-100 transition-colors duration-300 flex-1">
          {cert.name}
        </h4>
        
        {/* Date */}
        <span className="text-[8px] md:text-[9px] font-mono text-slate-600 mt-auto group-hover:text-slate-500 transition-colors">
          {cert.date}
        </span>
      </div>
    </motion.a>
  );
};

export const CertificationsSection = () => {
  // Group supporting certs by category
  const certsByCategory = SUPPORTING_CERTS.reduce((acc, cert) => {
    const category = cert.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cert);
    return acc;
  }, {} as Record<string, typeof SUPPORTING_CERTS>);
  
  // Sort categories for consistent display
  const categoryOrder = ['AI & Machine Learning', 'Web Development', 'Cybersecurity', 'Professional Simulations'];
  const sortedCategories = Object.keys(certsByCategory).sort((a, b) => {
    const aIdx = categoryOrder.indexOf(a);
    const bIdx = categoryOrder.indexOf(b);
    return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
  });
  
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#0d1829]/20 border-y border-teal-500/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-1/4 right-20 w-96 h-96 bg-[#3b82f6] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-20 w-80 h-80 bg-[#00e5cc]/30 rounded-full blur-[120px]" />
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
            <div className="w-12 h-px bg-gradient-to-r from-[#3b82f6] to-transparent" />
            <span className="text-[#3b82f6] font-mono text-[10px] uppercase tracking-[0.4em]">Section_06 // Credentials</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              Licenses &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#00e5cc]"> Certifications</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Professional credentials and certifications from industry-leading organizations.
            </p>
          </div>
        </motion.div>
        
        {/* Featured Certifications */}
        {FEATURED_CERTS.length > 0 && (
          <div className="mb-24 space-y-6">
            <div className="flex items-center gap-3">
              <Award size={16} className="text-[#fbbf24]" />
              <span className="text-[#fbbf24] font-mono text-[9px] uppercase tracking-[0.4em]">Featured Credentials</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_CERTS.map((cert, idx) => (
                <FeaturedCertCard key={cert.name} cert={cert} index={idx} />
              ))}
            </div>
          </div>
        )}
        
        {/* Supporting Certifications by Category */}
        {sortedCategories.length > 0 && (
          <div className="space-y-12">
            {sortedCategories.map((category) => {
              const certs = certsByCategory[category];
              const colors = getCategoryColor(category);
              
              return (
                <motion.div
                  key={category}
                  whileInView={{ y: 0, opacity: 1 }}
                  initial={{ y: 20, opacity: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <h3 
                      className="text-sm md:text-base font-bold uppercase tracking-wider"
                      style={{ color: colors.accent }}
                    >
                      {category}
                    </h3>
                    <div className="flex-1 h-px" style={{ backgroundColor: `${colors.border}20` }} />
                    <span className="text-xs font-mono text-slate-600">
                      {certs.length} {certs.length === 1 ? 'cert' : 'certs'}
                    </span>
                  </div>
                  
                  {/* Category Certificates Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certs.map((cert, idx) => (
                      <SupportingCertCard 
                        key={cert.name} 
                        cert={cert} 
                        index={idx}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
