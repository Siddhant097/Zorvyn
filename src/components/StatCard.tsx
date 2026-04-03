import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  accent: 'income' | 'expense' | 'neutral';
}

const accentStyles: Record<StatCardProps['accent'], string> = {
  income: 'text-emerald-500 bg-emerald-500/10',
  expense: 'text-rose-500 bg-rose-500/10',
  neutral: 'text-sky-500 bg-sky-500/10',
};

export const StatCard = ({ title, value, icon, accent }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <div className={`rounded-xl p-2 ${accentStyles[accent]}`}>{icon}</div>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
};
