export function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-6 flex flex-col justify-between h-64 animate-pulse">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-3/5"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      </div>
    </div>
  );
}
