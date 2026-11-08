import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {portfolioConfig.name}
            </div>
            <p className="mt-1 text-slate-500">
              {portfolioConfig.headline} · {portfolioConfig.location}
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
              <a
                href={portfolioConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Email Mohammad Anas"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} {portfolioConfig.name}. Designed & Built for modern backend engineering.
          </div>
          <div className="flex items-center gap-2">
            <span>MCA at {portfolioConfig.university}</span>
            <span aria-hidden="true">·</span>
            <span>React & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
