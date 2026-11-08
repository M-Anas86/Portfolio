import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { portfolioConfig } from './config/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { GithubActivity } from './components/GithubActivity';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const {
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
  } = useGitHubRepos(portfolioConfig.githubUsername);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-200">
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-300">
        {/* Navigation */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            publicRepoCount={repos.length > 0 ? repos.length : 7}
          />

          {/* About Section */}
          <About />

          {/* Technical Skills */}
          <Skills />

          {/* Dynamic GitHub Projects */}
          <Projects
            repos={repos}
            loading={loading}
            isRefreshing={isRefreshing}
            error={error}
            lastSynced={lastSynced}
            rateLimit={rateLimit}
            onRefresh={() => refetch(true)}
          />

          {/* GitHub Activity & Live Telemetry */}
          <GithubActivity
            profile={profile}
            languageStats={languageStats}
            events={events}
            loading={loading}
          />

          {/* Education */}
          <Education />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Resume Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </div>
  );
}
