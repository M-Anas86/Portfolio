import {
  Code,
  Server,
  Database,
  Layout,
  Wrench,
  BrainCircuit,
  CheckCircle,
} from 'lucide-react';
import { portfolioConfig, SkillCategory } from '../config/portfolio';

export function Skills() {
  const categoryIcons: Record<string, React.ElementType> = {
    programming: Code,
    backend: Server,
    database: Database,
    frontend: Layout,
    tools: Wrench,
    concepts: BrainCircuit,
  };

  const categories = Object.entries(portfolioConfig.skills) as [string, SkillCategory][];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
            Technical Stack
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Core Technologies
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            My technology toolbox centered around Java backend engineering, RESTful APIs, relational databases, and modern software development tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([key, category]) => {
            const Icon = categoryIcons[key] || Code;

            return (
              <div
                key={key}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {category.title}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {category.skills.length} competencies
                      </span>
                    </div>
                  </div>

                  {/* Skills List */}
                  <ul className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
