import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../hooks/useTheme';
import { portfolioConfig } from '../config/portfolio';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenResumeModal: () => void;
}

export function Navbar({ theme, onToggleTheme, onOpenResumeModal }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'GitHub Activity', href: '#activity', id: 'activity' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-sm'
          : 'bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            {portfolioConfig.name}
          </a>

          {/* Zone 2: Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  activeSection === link.id
                    ? 'text-cyan-600 dark:text-cyan-400 font-semibold border-b-2 border-cyan-500'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: CTA & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              onClick={onOpenResumeModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-cyan-600 dark:hover:bg-cyan-500 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-5 space-y-1 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === link.id
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
