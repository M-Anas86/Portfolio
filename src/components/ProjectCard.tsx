import { Github, ExternalLink, Star, GitFork, Calendar, Info } from 'lucide-react';
import { GitHubRepo } from '../services/githubService';
import { formatDate } from '../utils/formatDate';
import { FeaturedProjectConfig } from '../config/portfolio';

interface ProjectCardProps {
  repo: GitHubRepo;
  featuredConfig?: FeaturedProjectConfig;
  onOpenModal: (repo: GitHubRepo, featuredConfig?: FeaturedProjectConfig) => void;
}

export function ProjectCard({ repo, featuredConfig, onOpenModal }: ProjectCardProps) {
  const hasLiveDemo = Boolean(repo.homepage && repo.homepage.trim().length > 0 && repo.homepage.startsWith('http'));

  const languageColors: Record<string, string> = {
    Java: 'bg-amber-600',
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-500',
    HTML: 'bg-orange-500',
    CSS: 'bg-purple-500',
    Python: 'bg-blue-600',
    C: 'bg-slate-500',
  };

  const dotColor = repo.language ? languageColors[repo.language] || 'bg-slate-400' : 'bg-slate-400';

  return (
    <div className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 flex flex-col justify-between transition-all duration-200 hover:border-cyan-500/40 hover:shadow-lg dark:hover:bg-slate-900/80">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {repo.name}
            </h3>
            {featuredConfig && (
              <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/15 px-2 py-0.5 rounded">
                Featured
              </span>
            )}
            {repo.fork && (
              <span className="text-[10px] text-slate-500 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded">
                Fork
              </span>
            )}
          </div>

          {/* Quick info modal button */}
          <button
            onClick={() => onOpenModal(repo, featuredConfig)}
            aria-label={`View details of ${repo.name}`}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1"
            title="View Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {featuredConfig ? featuredConfig.description : repo.description || 'Clean software repository focused on backend software development and clean code practices.'}
        </p>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Stats & Actions */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        {/* Metadata Strip */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count}
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px]">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{formatDate(repo.updated_at)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>

          {/* Live Demo ONLY when homepage exists and is valid */}
          {hasLiveDemo && (
            <a
              href={repo.homepage!}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}

          <button
            onClick={() => onOpenModal(repo, featuredConfig)}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Inspect Architecture & Details"
            aria-label="View Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
