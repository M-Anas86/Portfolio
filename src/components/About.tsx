import { GraduationCap, Server, Database, Code, ShieldCheck, GitBranch } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'MCA Candidate',
      desc: `Pursuing Master of Computer Applications at ${portfolioConfig.universityFull}.`,
    },
    {
      icon: Server,
      title: 'Spring Boot & REST APIs',
      desc: 'Architecting clean layered backend services, stateless authentication, and OpenAPI documentation.',
    },
    {
      icon: Database,
      title: 'Relational Database Engineering',
      desc: 'Schema modeling, indexing, and transactional data access with MySQL and Spring Data JPA / Hibernate.',
    },
    {
      icon: Code,
      title: 'Object-Oriented Programming & DSA',
      desc: 'Strong foundation in OOP principles, design patterns, clean code, and algorithmic problem-solving.',
    },
    {
      icon: ShieldCheck,
      title: 'Security & Authentication',
      desc: 'Implementing stateless JWT filters, BCrypt hashing, and role-based authorization with Spring Security.',
    },
    {
      icon: GitBranch,
      title: 'Modern Development Workflow',
      desc: 'Version control with Git/GitHub, Maven build lifecycles, Postman API testing, and IntelliJ IDEA.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
            About Me
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Aspiring Java Backend Developer & MCA Student
          </h2>
        </div>

        {/* Two-Column Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative / Context */}
          <div className="lg:col-span-6 space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200 leading-snug">
              {portfolioConfig.introduction}
            </p>

            <p>
              Currently studying for my <strong className="text-slate-900 dark:text-white">Master of Computer Applications (MCA)</strong> at{' '}
              <span className="text-slate-900 dark:text-white font-medium">Maulana Azad National Urdu University (MANUU), Hyderabad</span>.
              My academic journey has centered on solidifying core computer science principles—focusing deeply on object-oriented programming, data structures, algorithms, and database systems.
            </p>

            <p>
              I am dedicated to backend engineering with <strong className="text-slate-900 dark:text-white">Java and the Spring ecosystem</strong>. Rather than superficial UI experiments, I enjoy solving architectural backend challenges: structuring robust REST APIs, modeling normalized relational databases with MySQL, optimizing JPA queries, and handling secure stateless authentication with JWT and Spring Security.
            </p>

            <p>
              My goal is to step into a professional role as a <strong className="text-cyan-600 dark:text-cyan-400">Java Backend Developer / Software Engineer</strong> where I can collaborate with seasoned engineering teams, write dependable production code, and contribute to scalable enterprise solutions.
            </p>

            {/* Quick Metadata List */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Degree:</span> MCA (Master of Computer Applications)
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Location:</span> Hyderabad, Telangana, India
              </div>
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Target Role:</span> Java Backend Developer
              </div>
            </div>
          </div>

          {/* Core Focus Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-xs transition-colors hover:border-cyan-500/40"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
