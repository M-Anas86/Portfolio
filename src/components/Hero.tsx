import { useState, useEffect } from 'react';
import { ArrowRight, FileText, Mail, Github, Linkedin, MapPin, Database, Cpu, Layers } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { TerminalVisual } from './TerminalVisual';

interface HeroProps {
  onOpenResumeModal: () => void;
  publicRepoCount?: number;
}

export function Hero({ onOpenResumeModal, publicRepoCount = 7 }: HeroProps) {
  const roles = portfolioConfig.typingRoles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = 1600;

    if (!isDeleting && displayedText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles]);

  return (
    <section id="home" className="relative pt-12 pb-20 md:py-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-3xl rounded-full opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {portfolioConfig.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>MCA at {portfolioConfig.university}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance leading-tight">
                Hi, I'm <span className="text-cyan-600 dark:text-cyan-400">{portfolioConfig.name}</span>.
              </h1>

              <div className="mt-3 flex items-center text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300 min-h-[32px]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">
                  {displayedText}
                </span>
                <span className="inline-block w-0.5 h-5 ml-1 bg-cyan-500 animate-pulse" />
              </div>

              <p className="mt-2 text-xs font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                {portfolioConfig.headline}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {portfolioConfig.shortBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 transition-colors shadow-sm"
              >
                Explore My Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <FileText className="w-4 h-4 text-cyan-500" />
                Download Resume
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                Connect
              </span>
              <a
                href={portfolioConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={portfolioConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Creative Coding Visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <TerminalVisual />
          </div>
        </div>

        {/* Clean Adjacency Strip / Core Competencies */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-600 dark:text-slate-400">
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Core Java & Spring</div>
              <div className="text-xs text-slate-500 mt-0.5">Spring Boot 3, MVC, Security, JPA</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">RESTful Architectures</div>
              <div className="text-xs text-slate-500 mt-0.5">Clean APIs, DTOs & Swagger OpenAPI</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Relational Databases</div>
              <div className="text-xs text-slate-500 mt-0.5">MySQL, Schema Design, Transactions</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Github className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Dynamic Repositories</div>
              <div className="text-xs text-slate-500 mt-0.5 font-mono tabular-nums">{publicRepoCount} Public Repos Synced</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
