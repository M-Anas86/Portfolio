import { GraduationCap, MapPin, BookOpen, CheckCircle } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export function Education() {
  const academicHighlights = [
    'Object-Oriented Programming & Software Engineering Principles',
    'Relational Database Management Systems (RDBMS) & SQL Optimization',
    'Data Structures, Algorithms & Algorithmic Complexity',
    'Web Architecture, Operating Systems & Computer Networking',
  ];

  return (
    <section id="education" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
            Academic Background
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Formal graduate education in Computer Applications and software systems engineering.
          </p>
        </div>

        {/* Education Timeline Card */}
        <div className="max-w-3xl">
          <div className="relative pl-8 sm:pl-10 border-l-2 border-cyan-500/30 space-y-8">
            {/* Timeline Marker */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-500 shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>

            {/* Main Degree Card */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  Postgraduate Degree · 2025 – 2027
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Hyderabad, Telangana, India
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {portfolioConfig.degree}
                </h3>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 w-fit">
                  CGPA: 8.34 (thru 2nd sem)
                </span>
              </div>

              <div className="mt-1 text-base font-medium text-slate-700 dark:text-slate-300">
                {portfolioConfig.universityFull}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Undertaking advanced coursework focusing on distributed backend architecture, database systems, object-oriented software engineering, and scalable enterprise application design.
              </p>

              {/* Coursework Focus */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                  Curriculum & Theoretical Foundation
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {academicHighlights.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Undergraduate Degree Card */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  Undergraduate Degree · 2022 – 2025
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Azamgarh, Uttar Pradesh, India
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 w-fit">
                  CGPA: 6.57
                </span>
              </div>

              <div className="mt-1 text-base font-medium text-slate-700 dark:text-slate-300">
                Shibli National PG College, Azamgarh
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Foundational computer science study in programming (Java, C, SQL), algorithms, data structures, web technologies, and database management systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
