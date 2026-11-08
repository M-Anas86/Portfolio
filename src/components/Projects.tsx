import { useState, useMemo } from 'react';
import {
  Search,
  RefreshCw,
  Clock,
  AlertCircle,
  Filter,
  CheckCircle2,
  Github,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { GitHubRepo } from '../services/githubService';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { ProjectCardSkeleton } from './LoadingSkeleton';
import { filterAndSortProjects, SortOption } from '../utils/filterProjects';
import { formatRelativeTime } from '../utils/formatDate';
import { portfolioConfig, FeaturedProjectConfig } from '../config/portfolio';

interface ProjectsProps {
  repos: GitHubRepo[];
  loading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastSynced: number | null;
  rateLimit: { remaining: number; reset: string } | null;
  onRefresh: () => void;
}

export function Projects({
  repos,
  loading,
  isRefreshing,
  error,
  lastSynced,
  rateLimit,
  onRefresh,
}: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('updated');
  const [includeForks, setIncludeForks] = useState(false);

  // Modal State
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [selectedFeaturedConfig, setSelectedFeaturedConfig] = useState<FeaturedProjectConfig | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Available languages from loaded repos
  const availableLanguages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set).sort();
  }, [repos]);

  // Match featured configs with loaded repos
  const getFeaturedMatch = (repo: GitHubRepo): FeaturedProjectConfig | undefined => {
    const repoNameLower = repo.name.toLowerCase().replace(/[-_]/g, '');
    return portfolioConfig.featuredProjects.find((fp) => {
      return fp.repoMatchPatterns.some((pattern) => {
        const cleanPattern = pattern.toLowerCase().replace(/[-_]/g, '');
        return repoNameLower.includes(cleanPattern) || cleanPattern.includes(repoNameLower);
      });
    });
  };

  // Filtered and sorted list
  const filteredRepos = useMemo(() => {
    return filterAndSortProjects(repos, {
      query: searchQuery,
      language: selectedLanguage,
      topic: 'all',
      includeForks,
      sortBy: selectedSort,
    });
  }, [repos, searchQuery, selectedLanguage, includeForks, selectedSort]);

  const handleOpenModal = (repo: GitHubRepo, featConfig?: FeaturedProjectConfig) => {
    setSelectedRepo(repo);
    setSelectedFeaturedConfig(featConfig || getFeaturedMatch(repo));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRepo(null);
    setSelectedFeaturedConfig(undefined);
  };

  return (
    <section id="projects" className="py-20 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
              Portfolio Repositories
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dynamic GitHub Projects
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Dynamically fetched directly from GitHub REST API. Real-time repositories, commit updates, codebases, and live deployments.
            </p>
          </div>

          {/* Sync status & Refresh button */}
          <div className="flex items-center gap-3 self-start md:self-end text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              {lastSynced ? `Synced ${formatRelativeTime(lastSynced)}` : 'Connecting...'}
            </span>

            <button
              onClick={onRefresh}
              disabled={isRefreshing || loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              title="Fetch latest updates from GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-500' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Rate limit warning if low */}
        {rateLimit && rateLimit.remaining < 5 && (
          <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              GitHub API public limit is low ({rateLimit.remaining} calls left). Caching active until reset.
            </span>
          </div>
        )}

        {/* Featured Projects Architectural Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Featured Architecture & Systems
            </h3>
            <span className="text-xs text-slate-400">Core Engineering Focus</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioConfig.featuredProjects.map((fp) => {
              // Check if matching repository exists in fetched repos
              const matchingRepo = repos.find((r) => {
                const rName = r.name.toLowerCase().replace(/[-_]/g, '');
                return fp.repoMatchPatterns.some((p) => {
                  const cleanPattern = p.toLowerCase().replace(/[-_]/g, '');
                  return rName.includes(cleanPattern) || cleanPattern.includes(rName);
                });
              });

              return (
                <div
                  key={fp.id}
                  className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/5 to-transparent dark:from-cyan-950/20 dark:to-slate-900/40 p-5 flex flex-col justify-between shadow-xs transition-all hover:border-cyan-500/60"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                        Featured Architecture
                      </span>
                      {matchingRepo ? (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" />
                          Repo Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Architecture Showcase
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {fp.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {fp.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {fp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2">
                    {matchingRepo ? (
                      <>
                        <a
                          href={matchingRepo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Repository
                        </a>

                        {matchingRepo.homepage && matchingRepo.homepage.startsWith('http') && (
                          <a
                            href={matchingRepo.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        )}

                        <button
                          onClick={() => handleOpenModal(matchingRepo, fp)}
                          className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="Architecture Details"
                        >
                          <Code2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="text-xs text-slate-500 flex items-center justify-between w-full">
                        <span>Repository in active development</span>
                        <span className="font-mono text-[10px] text-cyan-500">Java / Spring Boot</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories by name, language or keywords..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Language Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">All Languages</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="updated">Sort by: Recently Updated</option>
                <option value="stars">Sort by: Most Stars</option>
                <option value="name">Sort by: Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Secondary Controls: Forks toggle & Result count */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeForks}
                onChange={(e) => setIncludeForks(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500"
              />
              <span>Include forked repositories</span>
            </label>

            <span className="font-mono">
              Showing {filteredRepos.length} of {repos.length} repositories
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && repos.length === 0 && (
          <div className="p-8 text-center rounded-xl border border-red-500/20 bg-red-500/5 text-slate-700 dark:text-slate-300 space-y-3">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <div className="font-semibold text-base">Unable to connect to GitHub REST API</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => onRefresh()}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && (!error || repos.length > 0) && filteredRepos.length === 0 && (
          <div className="p-12 text-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 space-y-3">
            <Filter className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">
              No matching repositories found
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No repositories matched your current query or language filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
                setIncludeForks(false);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && filteredRepos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                featuredConfig={getFeaturedMatch(repo)}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          repo={selectedRepo}
          featuredConfig={selectedFeaturedConfig}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
