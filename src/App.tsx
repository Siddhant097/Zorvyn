import { useEffect, useState } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RoleToggle } from './components/RoleToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { SummarySection } from './features/dashboard/SummarySection';
import { InsightsSection } from './features/insights/InsightsSection';
import { TransactionsSection } from './features/transactions/TransactionsSection';
import { useFinanceStore } from './store/useStore';

const App = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-cyan-50 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                Finance Command Center
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Personal Finance Dashboard
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <RoleToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="space-y-6">
          <SummarySection transactions={transactions} />
          <InsightsSection transactions={transactions} />
          <TransactionsSection />
        </main>
      </div>
    </div>
  );
};

export default App;
