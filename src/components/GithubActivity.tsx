import { useState } from 'react';
import {
  Github,
  Users,
  UserCheck,
  GitCommit,
  ExternalLink,
  Code2,
  Calendar,
  Layers,
} from 'lucide-react';
import { GitHubProfile, LanguageStat, GitHubEvent } from '../services/githubService';
import { formatDate } from '../utils/formatDate';
import { portfolioConfig } from '../config/portfolio';

interface GithubActivityProps {
  profile: GitHubProfile | null;
  languageStats: LanguageStat[];
  events: GitHubEvent[];
  loading: boolean;
}

export function GithubActivity({
  profile,
  languageStats,
  events,
  loading,
}: GithubActivityProps) {
  const [imgError, setImgError] = useState(false);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(portfolioConfig.name)}&background=0284c7&color=fff&size=128`;

  return (
    <section id="activity" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
            Open Source & Telemetry
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            GitHub Activity & Profile
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Real dynamic metrics aggregated live from Mohammad Anas's public GitHub profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card & Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={profile?.avatar_url && !imgError ? profile.avatar_url : fallbackAvatar}
                  alt={`${portfolioConfig.name} GitHub avatar`}
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full border-2 border-cyan-500/40 object-cover shadow-sm"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {profile?.name || portfolioConfig.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    @{profile?.login || portfolioConfig.githubUsername}
                  </p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">
                    {portfolioConfig.title}
                  </p>
                </div>
              </div>

              {/* Core Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
                  <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                    {profile ? profile.public_repos : '—'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Repositories</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
                  <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums flex items-center justify-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {profile ? profile.followers : '0'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Followers</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
                  <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums flex items-center justify-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    {profile ? profile.following : '0'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Following</div>
                </div>
              </div>

              {/* Profile Link */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {profile?.created_at ? `Member since ${formatDate(profile.created_at)}` : 'Active on GitHub'}
                </span>
                <a
                  href={portfolioConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <Github className="w-3.5 h-3.5" />
                  View GitHub Profile
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Language Distribution Breakdown */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  Language Distribution
                </h3>
                <span className="text-xs text-slate-500 font-mono">From public repos</span>
              </div>

              {languageStats.length === 0 ? (
                <div className="text-xs text-slate-500 py-4 text-center">
                  Calculating repository language breakdown...
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Progress multi-segment bar */}
                  <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                    {languageStats.map((stat) => (
                      <div
                        key={stat.language}
                        style={{
                          width: `${stat.percentage}%`,
                          backgroundColor: stat.color,
                        }}
                        className="h-full transition-all duration-500"
                        title={`${stat.language}: ${stat.percentage}%`}
                      />
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {languageStats.map((stat) => (
                      <div key={stat.language} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: stat.color }}
                          />
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {stat.language}
                          </span>
                        </div>
                        <span className="text-slate-500 font-mono tabular-nums">
                          {stat.percentage}% ({stat.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Public Activity / Contribution Visual (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contribution Graph Widget */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  Public GitHub Contribution Activity
                </h3>
                <span className="text-xs text-slate-500">Live Snapshot</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 overflow-x-auto flex items-center justify-center min-h-[140px]">
                <img
                  src={`https://ghchart.rshah.org/0284c7/${portfolioConfig.githubUsername}`}
                  alt={`${portfolioConfig.githubUsername}'s GitHub Contribution Chart`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="max-w-full h-auto filter brightness-95 contrast-125"
                  onError={(e) => {
                    // Graceful fallback to CSS activity message if external chart is unreachable
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="text-xs text-slate-400 text-center py-6">
                          Public contributions synced with GitHub profile @${portfolioConfig.githubUsername}
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>Verified via GitHub public events prober</span>
                <span className="font-mono">github.com/{portfolioConfig.githubUsername}</span>
              </div>
            </div>

            {/* Recent Public Repository Activity */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-cyan-500" />
                  Recent Public Event Log
                </h3>
                <span className="text-xs text-slate-500 font-mono">Public Events</span>
              </div>

              {events.length === 0 ? (
                <div className="text-xs text-slate-500 py-6 text-center">
                  Recent public commit logs recorded in GitHub repositories.
                </div>
              ) : (
                <div className="space-y-3">
                  {events.slice(0, 5).map((evt) => {
                    const repoShort = evt.repo.name.replace(`${portfolioConfig.githubUsername}/`, '');
                    const commitMsg = evt.payload?.commits?.[0]?.message || `${evt.type.replace('Event', '')} on ${repoShort}`;

                    return (
                      <div
                        key={evt.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 text-xs"
                      >
                        <GitCommit className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-900 dark:text-white truncate">
                              {repoShort}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono shrink-0">
                              {formatDate(evt.created_at)}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                            {commitMsg}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
