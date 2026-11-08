import { GitHubRepo } from '../services/githubService';

export type SortOption = 'updated' | 'stars' | 'name';

export interface FilterOptions {
  query: string;
  language: string;
  topic: string;
  includeForks: boolean;
  sortBy: SortOption;
}

export function filterAndSortProjects(
  repos: GitHubRepo[],
  options: FilterOptions
): GitHubRepo[] {
  const { query, language, topic, includeForks, sortBy } = options;
  const lowerQuery = query.trim().toLowerCase();

  const filtered = repos.filter((repo) => {
    // Fork filter
    if (!includeForks && repo.fork) {
      return false;
    }

    // Language filter
    if (language && language !== 'all') {
      if (!repo.language || repo.language.toLowerCase() !== language.toLowerCase()) {
        return false;
      }
    }

    // Topic filter
    if (topic && topic !== 'all') {
      const hasTopic = repo.topics && repo.topics.some((t) => t.toLowerCase() === topic.toLowerCase());
      if (!hasTopic) {
        return false;
      }
    }

    // Text query search
    if (lowerQuery) {
      const matchName = repo.name.toLowerCase().includes(lowerQuery);
      const matchDesc = (repo.description || '').toLowerCase().includes(lowerQuery);
      const matchLang = (repo.language || '').toLowerCase().includes(lowerQuery);
      const matchTopic = repo.topics && repo.topics.some((t) => t.toLowerCase().includes(lowerQuery));
      if (!matchName && !matchDesc && !matchLang && !matchTopic) {
        return false;
      }
    }

    return true;
  });

  // Sort
  return filtered.sort((a, b) => {
    if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    // Default 'updated'
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}
