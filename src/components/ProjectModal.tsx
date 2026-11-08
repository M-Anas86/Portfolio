import { useState, useEffect } from 'react';
import { X, Github, ExternalLink, Star, GitFork, Copy, Check, Terminal, Layers, CheckCircle } from 'lucide-react';
import { GitHubRepo } from '../services/githubService';
import { FeaturedProjectConfig } from '../config/portfolio';
import { formatDate } from '../utils/formatDate';

interface ProjectModalProps {
  repo: GitHubRepo | null;
  featuredConfig?: FeaturedProjectConfig;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ repo, featuredConfig, isOpen, onClose }: ProjectModalProps) {
  const [copiedClone, setCopiedClone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !repo) return null;

  const cloneCommand = `git clone ${repo.html_url}.git`;

  const copyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const hasLiveDemo = Boolean(repo.homepage && repo.homepage.trim().length > 0 && repo.homepage.startsWith('http'));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {featuredConfig ? featuredConfig.title : repo.name}
              </h2>
              {featuredConfig && (
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  Featured Backend System
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              {repo.full_name}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2">
              Overview
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {featuredConfig ? featuredConfig.description : repo.description || 'Public repository maintained by Mohammad Anas on GitHub.'}
            </p>
          </div>

          {/* Featured Architecture Highlights if matched */}
          {featuredConfig && featuredConfig.highlights && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                Key Technical Highlights
              </h3>
              <ul className="space-y-2">
                {featuredConfig.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Notes */}
          {featuredConfig?.architectureNotes && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">Architecture Notes:</span>
              {featuredConfig.architectureNotes}
            </div>
          )}

          {/* Repository Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
              <div className="text-[11px] text-slate-500">Language</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {repo.language || 'Documentation'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
              <div className="text-[11px] text-slate-500">Stars</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                {repo.stargazers_count}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
              <div className="text-[11px] text-slate-500">Forks</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
              <div className="text-[11px] text-slate-500">Last Updated</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                {formatDate(repo.updated_at)}
              </div>
            </div>
          </div>

          {/* Clone Command */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Clone Repository
              </span>
              <button
                onClick={copyClone}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                {copiedClone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedClone ? 'Copied' : 'Copy command'}
              </button>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto flex items-center justify-between">
              <span>{cloneCommand}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close
          </button>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4" />
            Open on GitHub
          </a>

          {hasLiveDemo && (
            <a
              href={repo.homepage!}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Live Deployment
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
