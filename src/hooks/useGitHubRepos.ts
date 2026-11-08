import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GitHubService,
  GitHubRepo,
  GitHubProfile,
  GitHubEvent,
  LanguageStat,
} from '../services/githubService';

export interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  profile: GitHubProfile | null;
  events: GitHubEvent[];
  languageStats: LanguageStat[];
  loading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastSynced: number | null;
  rateLimit: { remaining: number; reset: string } | null;
  refetch: (force?: boolean) => Promise<void>;
}

export function useGitHubRepos(username: string): UseGitHubReposReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<number | null>(GitHubService.getLastSyncTimestamp());
  const [rateLimit, setRateLimit] = useState<{ remaining: number; reset: string } | null>(
    GitHubService.getRateLimitInfo()
  );

  const isMounted = useRef<boolean>(true);

  const fetchData = useCallback(
    async (force = false) => {
      if (!username) return;

      if (repos.length > 0) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const [fetchedRepos, fetchedProfile, fetchedEvents] = await Promise.allSettled([
          GitHubService.fetchRepos(username, force),
          GitHubService.fetchProfile(username, force),
          GitHubService.fetchRecentEvents(username),
        ]);

        if (!isMounted.current) return;

        let hasRepoData = false;

        if (fetchedRepos.status === 'fulfilled') {
          setRepos(fetchedRepos.value);
          setLanguageStats(GitHubService.calculateLanguageDistribution(fetchedRepos.value));
          hasRepoData = true;
        } else {
          // If error was thrown
          setError(fetchedRepos.reason?.message || 'Failed to load repositories');
        }

        if (fetchedProfile.status === 'fulfilled') {
          setProfile(fetchedProfile.value);
        }

        if (fetchedEvents.status === 'fulfilled') {
          setEvents(fetchedEvents.value);
        }

        const syncTs = GitHubService.getLastSyncTimestamp() || Date.now();
        setLastSynced(syncTs);
        setRateLimit(GitHubService.getRateLimitInfo());

        if (hasRepoData) {
          setError(null); // Clear error if we have data (even cached)
        }
      } catch (err: unknown) {
        if (!isMounted.current) return;
        const msg = err instanceof Error ? err.message : 'Unknown error fetching GitHub data';
        setError(msg);
      } finally {
        if (isMounted.current) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [username, repos.length]
  );

  useEffect(() => {
    isMounted.current = true;
    fetchData(false);

    // Auto-refresh every 5 minutes while the tab is active
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchData(false);
      }
    }, 5 * 60 * 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const lastSync = GitHubService.getLastSyncTimestamp();
        // If older than 5 minutes, refresh
        if (lastSync && Date.now() - lastSync > 5 * 60 * 1000) {
          fetchData(false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchData]);

  const refetch = useCallback(
    async (force = true) => {
      await fetchData(force);
    },
    [fetchData]
  );

  return {
    repos,
    profile,
    events,
    languageStats,
    loading,
    isRefreshing,
    error,
    lastSynced,
    rateLimit,
    refetch,
  };
}
