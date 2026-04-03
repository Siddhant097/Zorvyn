import { useMemo } from 'react';
import { Transaction } from '../../types/finance';
import { formatCurrency } from '../../utils/format';

interface InsightsSectionProps {
  transactions: Transaction[];
}

const getMonthTotal = (transactions: Transaction[], monthOffset: number, category: string) => {
  const now = new Date();
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);

  return transactions
    .filter((tx) => {
      const date = new Date(tx.date);
      return (
        tx.type === 'expense' &&
        tx.category === category &&
        date.getFullYear() === targetMonth.getFullYear() &&
        date.getMonth() === targetMonth.getMonth()
      );
    })
    .reduce((sum, tx) => sum + tx.amount, 0);
};

export const InsightsSection = ({ transactions }: InsightsSectionProps) => {
  const insights = useMemo(() => {
    const now = new Date();
    const thisMonthExpenses = transactions.filter((tx) => {
      const date = new Date(tx.date);
      return (
        tx.type === 'expense' &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });

    const spendingByCategory = thisMonthExpenses.reduce<Record<string, number>>(
      (acc, tx) => {
        acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
        return acc;
      },
      {},
    );

    const [topCategory, topAmount] = Object.entries(spendingByCategory).sort(
      (a, b) => b[1] - a[1],
    )[0] ?? ['N/A', 0];

    const thisMonthFood = getMonthTotal(transactions, 0, 'Food');
    const lastMonthFood = getMonthTotal(transactions, -1, 'Food');

    const delta =
      lastMonthFood === 0
        ? 0
        : ((thisMonthFood - lastMonthFood) / lastMonthFood) * 100;

    return {
      topCategory,
      topAmount,
      foodDelta: Math.round(delta),
      hasData: thisMonthExpenses.length > 0,
    };
  }, [transactions]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Insights</h3>
      {insights.hasData ? (
        <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Highest spending this month: <strong>{insights.topCategory}</strong> (
            {formatCurrency(insights.topAmount)}).
          </p>
          <p>
            You spent <strong>{Math.abs(insights.foodDelta)}%</strong>{' '}
            {insights.foodDelta >= 0 ? 'more' : 'less'} on Food compared to last month.
          </p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No expense data available for this month.
        </p>
      )}
    </section>
  );
};
