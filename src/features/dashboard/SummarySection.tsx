import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowDownCircle, ArrowUpCircle, Landmark } from 'lucide-react';
import { useMemo } from 'react';
import { StatCard } from '../../components/StatCard';
import { Transaction } from '../../types/finance';
import { formatCurrency, formatMonthDay } from '../../utils/format';

interface SummarySectionProps {
  transactions: Transaction[];
}

export const SummarySection = ({ transactions }: SummarySectionProps) => {
  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions]);

  const balanceTrend = useMemo(() => {
    const byDate = [...transactions]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((tx) => ({
        date: formatMonthDay(tx.date),
        delta: tx.type === 'income' ? tx.amount : -tx.amount,
      }));

    let runningBalance = 0;
    return byDate.map((item) => {
      runningBalance += item.delta;
      return {
        date: item.date,
        balance: runningBalance,
      };
    });
  }, [transactions]);

  const expenseByCategory = useMemo(() => {
    const grouping = transactions
      .filter((t) => t.type === 'expense')
      .reduce<Record<string, number>>((acc, tx) => {
        acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
        return acc;
      }, {});

    return Object.entries(grouping).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Balance"
          value={formatCurrency(summary.balance)}
          icon={<Landmark size={18} />}
          accent="neutral"
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(summary.totalIncome)}
          icon={<ArrowUpCircle size={18} />}
          accent="income"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(summary.totalExpense)}
          icon={<ArrowDownCircle size={18} />}
          accent="expense"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-3 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">
            Balance Trend
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrend}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#0284c7"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">
            Expense Breakdown
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  fill="#0284c7"
                  label
                />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
