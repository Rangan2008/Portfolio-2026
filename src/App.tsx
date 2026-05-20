
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hyperspeed from './components/Hyperspeed';
import Ballpit from './components/Ballpit';
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Terminal,
  MapPin,
  ChevronRight,
  ChevronDown,
  ExternalLink
} from "lucide-react";

import { SystemBoot } from "./components/SystemBoot";
import { Navbar } from "./components/Navbar";
import { HeroTerminal } from "./components/HeroTerminal";
import { SkillConstellationMap as SkillMap } from "./components/SkillMap";
import { ProjectCard } from "./components/ProjectCard";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ChatWidget } from "./components/ChatWidget";
import { CursorTrail } from "./components/CursorTrail";
import {
  PERSONAL_INFO,
  PROJECTS,
  ACHIEVEMENTS,
  FEATURED_CERTS,
  SUPPORTING_CERTS
} from "./constants";

// Module-level constant — reference-stable forever, never triggers useEffect re-run
const HYPERSPEED_OPTIONS = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [12, 80],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0f1e,
    background: 0x000000,
    shoulderLines: 0x00ffcc,
    brokenLines: 0x00ffcc,
    leftCars: [0x00ffcc, 0x00bfff, 0x00e5ff],
    rightCars: [0x00ffcc, 0x0e5ea5, 0x324555],
    sticks: 0x00ffcc,
  }
};

// Pre-computed outside component — never recalculated on re-renders
const FEATURED_TITLES = ["AetherType", "Nexus Chat", "Skill Snap", "Amazon Clone"];
const ORDER: Record<string, number> = { "AetherType": 0, "Nexus Chat": 1, "Skill Snap": 2, "Amazon Clone": 3 };
const FEATURED_PROJECTS = PROJECTS
  .filter(p => FEATURED_TITLES.includes(p.title))
  .sort((a, b) => ORDER[a.title] - ORDER[b.title]);
const OTHER_PROJECTS = PROJECTS.filter(p => !FEATURED_TITLES.includes(p.title));

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="bg-[#060b14] text-[#e2e8f0] font-sans selection:bg-teal-400 selection:text-navy-950 min-h-screen">
      <AnimatePresence>
        {!isBooted && <SystemBoot onComplete={() => setIsBooted(true)} />}
      </AnimatePresence>

      <CursorTrail />
      <Navbar />
      <ChatWidget />

      {/* Background Grid — GPU-composited, pointer-events-none */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'linear-gradient(#00e5cc 1px, transparent 1px), linear-gradient(90deg, #00e5cc 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          contain: 'strict'
        }}
      />

      <main
        className="relative"
        style={{ opacity: isBooted ? 1 : 0, transition: 'opacity 1s ease' }}
      >

        {/* Hero Section */}
        <section
          id="hero"
          className="relative w-full min-h-[100svh] bg-black flex flex-col px-0"
        >

          {/* Hyperspeed background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
          </div>

          {/* Layer 2 — Dark overlay */}
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.72) 100%)'
          }} />

          {/* Layer 3 — Hero content */}
          <div className="relative z-[2] flex-1 flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-24">


          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-12 lg:gap-24">
            {/* Left Column: Text Content */}
            <div className="space-y-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row md:items-center gap-3 border-b border-teal-500/20 pb-6 w-full"
              >
                <div className="flex flex-col min-w-0">
                  <h2 className="text-2xl font-bold tracking-widest text-teal-400 font-mono uppercase truncate">RANGAN DAS<span className="animate-pulse">_</span></h2>
                  <span className="text-[10px] text-slate-500 font-mono">SYSTEM_VERSION: 2.0.8 // AUTH_LEVEL: ROOT</span>
                </div>
                <div className="md:ml-auto flex flex-wrap items-center gap-4 sm:gap-6 mt-2 md:mt-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 glow-dot-amber" />
                    <span className="text-amber-500 text-[10px] font-mono uppercase tracking-[0.1em] whitespace-nowrap">Status: {PERSONAL_INFO.availability}</span>
                  </div>
                  <div className="px-3 py-1 bg-[#0d1829] border border-teal-500/30 rounded-full text-teal-400 font-mono text-[10px] whitespace-nowrap">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                >
                  Building the <span className="text-teal-400 glow-text italic">Digital</span> Future.
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
                >
                  Hi, I'm <span className="text-white font-semibold">Rangan Das</span>. A high-performance Full Stack Developer building scalable architectures and immersive user experiences with code that flows.
                </motion.p>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-teal-400 text-[#060b14] font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,229,204,0.4)] w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Projects <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 md:px-8 py-3 md:py-4 bg-transparent border border-teal-400/30 text-teal-400 font-bold rounded-xl hover:bg-teal-400/5 transition-all w-full sm:w-auto"
                >
                  Initiate Contact
                </button>

              </motion.div>
            </div>

            {/* Right Column: Terminal Panel */}
            <div className="w-full flex justify-center items-center px-4 sm:px-0">
              <HeroTerminal />
            </div>
          </div>

          {/* Scroll Indicator — CSS keyframe, no Framer Motion loop */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] group-hover:text-teal-400 transition-colors">Scroll</span>
            <div className="text-teal-400 animate-bounce">
              <ChevronDown size={20} />
            </div>
          </div>
          </div>{/* end hero content wrapper */}
        </section>

        {/* About Info Section */}
        <section id="about" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-teal-400/50" />
                  <span className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Section_01 // Core Analysis</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">The Architect's <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">Vision</span></h2>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Last_Deep_Scan</div>
                <div className="text-xs font-mono text-teal-400/60 uppercase">May 19, 2026 // 05:08:51</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card & Bio */}
              <motion.div
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: 20, opacity: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="bg-[#0d1829]/40 border border-teal-500/10 rounded-3xl p-6 md:p-12 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Code2 size={120} />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                      Intermediate <span className="text-white font-medium underline decoration-teal-400/30 underline-offset-8">Full Stack Developer</span> who learns by building. I gravitate toward backend systems — Python, Flask, REST APIs, and MongoDB — while staying comfortable across the full stack with React on the frontend. Still growing, but shipping real things along the way.
                    </p>

                    <div className="pl-6 border-l-2 border-teal-400/20 italic text-teal-400/80 text-lg py-2">
                      "Every project teaches you something the docs never could. I learn fastest when I'm building something that actually breaks."
                    </div>

                    <div className="flex flex-wrap gap-6 md:gap-10 pt-8 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/5 flex items-center justify-center text-amber-400 border border-amber-400/10">
                          <Terminal size={18} />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono uppercase">Academic_Background</div>
                          <div className="text-sm font-medium">{PERSONAL_INFO.education}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00e5cc]/5 flex items-center justify-center text-[#00e5cc] border border-[#00e5cc]/10">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono uppercase">Operational_Base</div>
                          <div className="text-sm font-medium">{PERSONAL_INFO.location}</div>
                        </div>
                      </div>
                      <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 bg-[#0d1829] border border-teal-500/20 rounded-lg text-slate-300 hover:text-teal-400 hover:border-teal-500/50 transition-all font-mono text-xs mt-2 w-fit">
                        <Github size={14} />
                        <span>github.com/Rangan2008</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Counter Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { val: '23', label: 'Repositories', desc: 'Public on GitHub', borderColor: 'border-teal-400', txtColor: 'text-teal-400' },
                    { val: '13', label: 'Stars Earned', desc: 'Community Signal', borderColor: 'border-amber-400', txtColor: 'text-amber-400' },
                    { val: '2', label: 'Job Simulations', desc: 'Forage Certified', borderColor: 'border-green-400', txtColor: 'text-green-400' },
                    { val: '1', label: 'Internship', desc: 'Blue Stock Fintech', borderColor: 'border-purple-400', txtColor: 'text-purple-400' }
                  ].map((stat, idx) => (
                    <div key={idx} className={`bg-[#00e5cc]/5 border-b-2 p-5 border ${stat.borderColor}/20 ${stat.borderColor} rounded-2xl group hover:border-opacity-50 transition-all`}>
                      <div className={`text-3xl font-black ${stat.txtColor} mb-2 text-center`}>{stat.val}</div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1 text-center">{stat.label}</div>
                      <div className="text-[8px] text-slate-600 font-mono uppercase tracking-wider text-center">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Technical Analysis Panel */}
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 20, opacity: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-[#0d1829] border border-teal-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden h-full">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-teal-400 font-bold">System_Metrics</h3>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                  </div>

                  <div className="space-y-10">
                    {[
                      { label: "Python / Flask / Django", val: 78, color: "bg-teal-400" },
                      { label: "React / Frontend", val: 70, color: "bg-amber-400" },
                      { label: "REST APIs / MongoDB", val: 75, color: "bg-purple-500" },
                      { label: "Docker / DevOps", val: 52, color: "bg-green-400" }
                    ].map((metric, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-slate-400">{metric.label}</span>
                          <span className="text-white font-bold">{metric.val}%</span>
                        </div>
                        <div className="h-0.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.val}%` }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 1.5, ease: "easeOut" }}
                            className={`h-full ${metric.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 pt-8 border-t border-white/5 space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Current_Sprint</div>
                        <p className="text-sm text-slate-300 leading-relaxed">Actively applying for dev internships. Polishing portfolio and sharpening full-stack projects for recruiters.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Focus_Area</div>
                        <p className="text-sm text-slate-300 leading-relaxed">Python backends, REST API design, and React — learning by exploring new tools and building real projects.</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-8 opacity-20 font-mono text-[8px] tracking-[0.6em] pointer-events-none uppercase">
                    Diagnostic_Ready
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Constellation */}
        <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 bg-[#0d1829]/30 border-y border-teal-500/5">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Section_02 // Neural Map</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Tech Constellation</h2>
              <p className="text-slate-500 max-w-xl mx-auto">An interactive visualization of my technical proficiency, mapped by ecosystem and mastery levels.</p>
            </div>
            <SkillMap />
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" className="py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                <span className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Section_03 // Deployments</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Case Studies</h2>
              </div>
              <p className="text-slate-500 max-w-sm text-sm">Experimental builds and production-grade applications that demonstrate modular design and clean architecture.</p>
            </div>

            {/* Bento Grid Featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {FEATURED_PROJECTS[0] && (
                  <div className="h-[280px]">
                    <ProjectCard id={FEATURED_PROJECTS[0].id} {...FEATURED_PROJECTS[0]} isBento />
                  </div>
                )}
                {FEATURED_PROJECTS[2] && (
                  <div className="h-[420px]">
                    <ProjectCard id={FEATURED_PROJECTS[2].id} {...FEATURED_PROJECTS[2]} isBento />
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {FEATURED_PROJECTS[1] && (
                  <div className="h-[420px]">
                    <ProjectCard id={FEATURED_PROJECTS[1].id} {...FEATURED_PROJECTS[1]} isBento />
                  </div>
                )}
                {FEATURED_PROJECTS[3] && (
                  <div className="h-[280px]">
                    <ProjectCard id={FEATURED_PROJECTS[3].id} {...FEATURED_PROJECTS[3]} isBento />
                  </div>
                )}
              </div>
            </div>

            {/* Expandable Section */}
            <div className="pt-12 flex flex-col items-center gap-12">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="group relative px-6 py-3 border border-teal-400/30 text-teal-400 font-mono text-sm tracking-widest uppercase hover:bg-teal-400/10 hover:shadow-[0_0_15px_rgba(0,229,204,0.2)] transition-all flex items-center gap-3"
              >
                {showAllProjects ? "Show Less \u2191" : "See All Projects \u2192"}
              </button>

              <AnimatePresence>
                {showAllProjects && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                      {OTHER_PROJECTS.map(project => (
                        <div key={project.id}>
                          <ProjectCard id={project.id} {...project} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="py-32 px-6 md:px-12 lg:px-24 bg-[#0d1829]/30 border-y border-teal-500/5">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Section_04 // Chronology</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Operational History</h2>
            </div>
            <ExperienceTimeline />
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-teal-500/5">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Section_05 // Milestones</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Achievements</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured Achievement */}
              <motion.div
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: 20, opacity: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 p-6 md:p-10 bg-[#0d1829] border border-teal-500/10 rounded-3xl flex flex-col justify-center gap-6 group hover:border-teal-500/30 transition-all relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400/0 group-hover:bg-teal-400 transition-colors shadow-[0_0_15px_#00e5cc]" />
                <div className="w-16 h-16 rounded-2xl bg-teal-400/5 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  {(() => { const Icon = ACHIEVEMENTS[0].icon; return <Icon size={40} />; })()}
                </div>
                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-200">{ACHIEVEMENTS[0].title}</h3>
                  <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">{ACHIEVEMENTS[0].description}</p>
                </div>
                {/* Subtle background glow */}
                <div className="absolute top-1/2 -translate-y-1/2 right-10 w-32 h-32 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-teal-500/20 transition-colors" />
              </motion.div>

              {/* Secondary Achievements Stack */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                {ACHIEVEMENTS.slice(1).map((ach, i) => (
                  <motion.div
                    key={i}
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 20, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="flex-1 p-6 md:p-8 bg-[#0d1829] border border-teal-500/10 rounded-3xl flex flex-col justify-center gap-4 group hover:border-teal-500/30 transition-all relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400/0 group-hover:bg-teal-400 transition-colors shadow-[0_0_10px_#00e5cc]" />
                    <div className="w-12 h-12 rounded-2xl bg-teal-400/5 flex items-center justify-center text-teal-400 shrink-0 group-hover:scale-110 transition-transform">
                      <ach.icon size={26} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-slate-200">{ach.title}</h3>
                      <p className="text-slate-500 text-sm mt-2 leading-relaxed">{ach.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#0d1829]/30 border-y border-teal-500/5">
          <div className="max-w-6xl mx-auto space-y-20">

            {/* Header */}
            <div className="text-center space-y-4">
              <span className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Section_06 // Credentials</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Licenses &amp; Certifications</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">Verified credentials from leading platforms in technology, AI, and software engineering.</p>
            </div>

            {/* ── TIER 1 : Featured (hero cards) ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-teal-400/40" />
                <span className="text-teal-400 font-mono text-[9px] uppercase tracking-[0.4em] opacity-70">Featured</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURED_CERTS.map((cert, i) => (
                  <motion.a
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 24, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative flex flex-col justify-between p-7 rounded-3xl border overflow-hidden transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, #0d1829 60%, ${cert.accent}12 100%)`,
                      borderColor: `${cert.accent}30`,
                    }}
                  >
                    {/* Accent glow blob */}
                    <div
                      className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ backgroundColor: cert.accent }}
                    />

                    {/* Top row: issuer + via badge + date */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-full border"
                            style={{ color: cert.accent, borderColor: `${cert.accent}40`, background: `${cert.accent}10` }}
                          >
                            {cert.issuer}
                          </span>
                          <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full bg-white/5 text-slate-500 border border-white/10">
                            via {cert.via}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-600 shrink-0">{cert.date}</span>
                      </div>

                      {/* Name */}
                      <h3
                        className="text-base md:text-lg font-bold leading-snug mb-6 group-hover:opacity-90 transition-opacity"
                        style={{ color: '#e2e8f0' }}
                      >
                        {cert.name}
                      </h3>
                    </div>

                    {/* CTA button */}
                    <div
                      className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-200 group-hover:shadow-[0_0_14px_-2px_currentColor] w-fit"
                      style={{ color: cert.accent, borderColor: `${cert.accent}50`, background: `${cert.accent}10` }}
                    >
                      <ExternalLink size={12} />
                      Show Credential
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ── TIER 2 : Supporting (compact row) ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-slate-700" />
                <span className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.4em]">Additional</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {SUPPORTING_CERTS.map((cert, i) => (
                  <motion.a
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 16, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="group flex flex-col gap-2 p-4 bg-[#0d1829]/60 border border-teal-500/8 rounded-2xl hover:border-teal-500/25 hover:bg-[#0d1829] transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-mono text-teal-400/60 uppercase tracking-wider truncate">{cert.issuer}</span>
                      <ExternalLink size={10} className="text-teal-400/30 group-hover:text-teal-400/70 transition-colors shrink-0" />
                    </div>
                    <p className="text-xs font-medium text-slate-300 leading-snug group-hover:text-slate-100 transition-colors">
                      {cert.name}
                    </p>
                    <span className="text-[9px] font-mono text-slate-700 mt-auto">{cert.date}</span>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 mb-20 relative">
          {/* Ballpit component integrated as a futuristic, responsive background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
            <Ballpit
              count={100}
              gravity={0.05}
              friction={0.99}
              wallBounce={0.98}
              followCursor={true}
              colors={['#00e5cc', '#00bfff', '#8b5cf6']}
              minSize={0.4}
              maxSize={0.8}
            />
          </div>

          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0d1829]/80 to-[#060b14]/80 backdrop-blur-md border border-teal-500/20 rounded-3xl md:rounded-[3rem] p-6 md:p-12 lg:p-20 relative overflow-hidden z-10">
            {/* Reduced blur — 150px is excessive */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-20">
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <span className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Section_07 // Uplink</span>
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Let's Interface.</h2>
                  <p className="text-slate-500 max-w-md">Currently looking for new challenges and collaborative opportunities. My neural link is always active.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/5 flex items-center justify-center text-teal-400 border border-teal-500/10">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] text-teal-400 font-mono uppercase tracking-widest block mb-1">Email_Address</span>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg hover:text-teal-400 transition-colors">{PERSONAL_INFO.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/5 flex items-center justify-center text-teal-400 border border-teal-500/10">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] text-teal-400 font-mono uppercase tracking-widest block mb-1">Current_Matrix</span>
                      <span className="text-lg">{PERSONAL_INFO.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-teal-400/20 flex items-center justify-center text-teal-400 hover:bg-teal-400 hover:text-[#060b14] transition-all">
                    <Github size={20} />
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-teal-400/20 flex items-center justify-center text-teal-400 hover:bg-teal-400 hover:text-[#060b14] transition-all">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="p-6 md:p-8 rounded-3xl bg-[#060b14]/50 border border-teal-500/10 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse glow-dot-green" />
                    <span className="text-sm font-bold tracking-tight">{PERSONAL_INFO.availability}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    I am currently available for SDE internship roles, freelance projects, and open source collaborations. Response latency is typically &lt; 4 hours.
                  </p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-teal-400 text-[#060b14] font-bold rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    Send Transmission
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-teal-500/5 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-teal-400/30 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">
              <Terminal size={12} /> Liquid_Terminal_v2.0.8 // Built_by_Das
            </div>
            <p className="text-slate-600 text-xs">© 2024 Rangan Das. All rights reserved. Optimization complete.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
