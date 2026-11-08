export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  license?: {
    name: string;
    spdx_id: string;
  } | null;
}

export interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
    ref?: string;
    ref_type?: string;
    description?: string;
  };
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

const CACHE_KEYS = {
  REPOS: 'portfolio_github_repos_cache_v2',
  PROFILE: 'portfolio_github_profile_cache_v2',
  EVENTS: 'portfolio_github_events_cache_v2',
  TIMESTAMP: 'portfolio_github_sync_timestamp_v2',
  RATE_LIMIT: 'portfolio_github_rate_limit_v2',
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  C: '#555555',
  'C++': '#f34b7d',
  Shell: '#89e051',
  SQL: '#e38c00',
  Other: '#64748b',
};

export class GitHubService {
  private static parseRateLimit(response: Response) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    const reset = response.headers.get('x-ratelimit-reset');
    if (remaining !== null && reset !== null) {
      const resetDate = new Date(parseInt(reset, 10) * 1000);
      const info = {
        remaining: parseInt(remaining, 10),
        reset: resetDate.toISOString(),
      };
      try {
        localStorage.setItem(CACHE_KEYS.RATE_LIMIT, JSON.stringify(info));
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  static getRateLimitInfo(): { remaining: number; reset: string } | null {
    try {
      const data = localStorage.getItem(CACHE_KEYS.RATE_LIMIT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static async fetchProfile(username: string, force = false): Promise<GitHubProfile> {
    const now = Date.now();
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEYS.PROFILE);
        const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
        if (cached && timestamp && now - parseInt(timestamp, 10) < CACHE_TTL_MS) {
          return JSON.parse(cached);
        }
      } catch {
        // Fallback to fetch
      }
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    this.parseRateLimit(response);

    if (!response.ok) {
      if (response.status === 403) {
        const cached = localStorage.getItem(CACHE_KEYS.PROFILE);
        if (cached) return JSON.parse(cached);
        throw new Error('GitHub API rate limit exceeded. Using cached data if available.');
      }
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data: GitHubProfile = await response.json();
    try {
      localStorage.setItem(CACHE_KEYS.PROFILE, JSON.stringify(data));
    } catch {
      // Storage quota or error
    }
    return data;
  }

  static async fetchRepos(username: string, force = false): Promise<GitHubRepo[]> {
    const now = Date.now();
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEYS.REPOS);
        const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
        if (cached && timestamp && now - parseInt(timestamp, 10) < CACHE_TTL_MS) {
          return JSON.parse(cached);
        }
      } catch {
        // Fallback to fetch
      }
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    this.parseRateLimit(response);

    if (!response.ok) {
      if (response.status === 403) {
        const cached = localStorage.getItem(CACHE_KEYS.REPOS);
        if (cached) return JSON.parse(cached);
        throw new Error('GitHub API rate limit reached. Displaying available offline/cached repos.');
      }
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();
    try {
      localStorage.setItem(CACHE_KEYS.REPOS, JSON.stringify(repos));
      localStorage.setItem(CACHE_KEYS.TIMESTAMP, now.toString());
    } catch {
      // Storage quota or error
    }
    return repos;
  }

  static async fetchRecentEvents(username: string): Promise<GitHubEvent[]> {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events?per_page=10`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (response.ok) {
        const events = await response.json();
        return Array.isArray(events) ? events : [];
      }
    } catch {
      // Ignore background event failures
    }
    return [];
  }

  static calculateLanguageDistribution(repos: GitHubRepo[]): LanguageStat[] {
    const langCounts: Record<string, number> = {};
    let total = 0;

    repos.forEach((repo) => {
      if (!repo.fork && repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        total += 1;
      }
    });

    if (total === 0) return [];

    return Object.entries(langCounts)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / total) * 100),
        color: LANGUAGE_COLORS[language] || LANGUAGE_COLORS.Other,
      }))
      .sort((a, b) => b.count - a.count);
  }

  static getLastSyncTimestamp(): number | null {
    try {
      const ts = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
      return ts ? parseInt(ts, 10) : null;
    } catch {
      return null;
    }
  }
}
