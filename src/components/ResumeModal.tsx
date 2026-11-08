import { useEffect } from 'react';
import { X, Download, FileText, ExternalLink, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Curriculum Vitae
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {portfolioConfig.name} · {portfolioConfig.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="py-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white text-sm">
              Resume Profile Highlights
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>MCA Candidate (2025–2027) at {portfolioConfig.university} (CGPA: 8.34)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Core Specialization: Java, Spring Boot, Spring Security, REST APIs & MySQL</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Projects: Distributed Job Scheduler & E-Commerce Backend System</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Location: {portfolioConfig.location}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The official resume is ready for instant download in PDF format.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={portfolioConfig.resumeUrl}
                download="Mohammad_Anas_Resume.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <a
                href={portfolioConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
