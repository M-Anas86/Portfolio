import { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Send, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
    if (!formData.message.trim()) errs.message = 'Please enter your message';
    return errs;
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(
      `Hello Mohammad Anas,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
    );
    return `mailto:${portfolioConfig.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormSubmitted(true);

    // Open mailto link
    window.location.href = generateMailto();
  };

  const copyMessageDraft = () => {
    const draft = `Subject: [Portfolio Inquiry] ${formData.subject || 'Inquiry'}\n\nHello Mohammad Anas,\n\n${formData.message || '(Your message)'}\n\nSender: ${formData.name || 'Anonymous'}\nEmail: ${formData.email || 'Not provided'}`;
    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
            Get In Touch
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contact & Collaboration
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Interested in backend engineering opportunities, technical discussions, or open-source collaboration? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Direct Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>

              {/* Email Item */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-500">Email Address</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {portfolioConfig.email}
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <button
                      onClick={copyEmail}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedEmail ? 'Copied' : 'Copy Email'}
                    </button>
                    <a
                      href={`mailto:${portfolioConfig.email}`}
                      className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Direct Mailto
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Item */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Location</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {portfolioConfig.location}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Telangana, India
                  </div>
                </div>
              </div>

              {/* GitHub Item */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">GitHub Profile</div>
                  <a
                    href={portfolioConfig.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    github.com/{portfolioConfig.githubUsername}
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* LinkedIn Item */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">LinkedIn Profile</div>
                  <a
                    href={portfolioConfig.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    mohd-anas-276929332
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                This form prepares a direct message dispatch to <code className="text-cyan-600 dark:text-cyan-400 font-mono">{portfolioConfig.email}</code>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Java Backend Engineer Opportunity"
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message, project details, or inquiry here..."
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    Launch Email Client
                  </button>

                  <button
                    type="button"
                    onClick={copyMessageDraft}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedDraft ? 'Message Draft Copied' : 'Copy Message Text'}
                  </button>
                </div>

                {formSubmitted && (
                  <div className="mt-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-700 dark:text-cyan-300">
                    If your email app didn't launch automatically, click "Copy Message Text" above and send an email directly to <strong className="font-mono">{portfolioConfig.email}</strong>.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
