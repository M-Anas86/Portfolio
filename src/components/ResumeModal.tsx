import { useState, useEffect } from 'react';
import { X, Download, FileText, ExternalLink, Mail, Linkedin, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [pdfStatus, setPdfStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');

  useEffect(() => {
    if (!isOpen) return;

    let isSubscribed = true;
    setPdfStatus('checking');

    // Check if configured resume PDF exists
    fetch(portfolioConfig.resumeUrl, { method: 'HEAD' })
      .then((res) => {
        if (isSubscribed) {
          if (res.ok) {
            setPdfStatus('available');
          } else {
            setPdfStatus('unavailable');
          }
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setPdfStatus('unavailable');
        }
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      isSubscribed = false;
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
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
              <span>MCA Candidate at {portfolioConfig.university}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Core Specialization: Java, Spring Boot 3, REST APIs & MySQL</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Location: {portfolioConfig.location}</span>
            </div>
          </div>

          {pdfStatus === 'checking' && (
            <div className="text-xs text-slate-500 text-center py-2">
              Verifying resume document availability...
            </div>
          )}

          {pdfStatus === 'available' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The official resume is ready for download in PDF format.
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
          )}

          {pdfStatus === 'unavailable' && (
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-slate-600 dark:text-slate-300 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4" />
                Resume Document Update in Progress
              </div>
              <p className="leading-relaxed">
                The static resume PDF at <code className="text-cyan-600 dark:text-cyan-400 font-mono">{portfolioConfig.resumeUrl}</code> is being refreshed with recent project completions. You can request a copy directly via email or view verified professional credentials on LinkedIn.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`mailto:${portfolioConfig.email}?subject=Resume%20Request%20-%20Java%20Backend%20Developer`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Request via Email
                </a>
                <a
                  href={portfolioConfig.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
