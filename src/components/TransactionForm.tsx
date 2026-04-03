import { useMemo, useState } from 'react';
import { FinanceCategory, Transaction, TransactionType } from '../types/finance';

interface TransactionFormValues {
  date: string;
  amount: string;
  category: FinanceCategory;
  type: TransactionType;
  description: string;
}

interface TransactionFormProps {
  initial?: Transaction;
  onSubmit: (payload: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const categories: FinanceCategory[] = [
  'Food',
  'Housing',
  'Entertainment',
  'Salary',
  'Transport',
  'Utilities',
];

export const TransactionForm = ({
  initial,
  onSubmit,
  onCancel,
}: TransactionFormProps) => {
  const [form, setForm] = useState<TransactionFormValues>({
    date: initial ? initial.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
    amount: initial ? String(initial.amount) : '',
    category: initial?.category ?? 'Food',
    type: initial?.type ?? 'expense',
    description: initial?.description ?? '',
  });

  const isValid = useMemo(() => {
    return (
      form.date.trim().length > 0 &&
      form.description.trim().length > 0 &&
      Number(form.amount) > 0
    );
  }, [form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid) return;
        onSubmit({
          date: new Date(form.date).toISOString(),
          amount: Number(form.amount),
          category: form.category,
          type: form.type,
          description: form.description.trim(),
        });
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Date
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Amount
          <input
            type="number"
            min="0"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Category
          <select
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                category: e.target.value as FinanceCategory,
              }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Type
          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                type: e.target.value as TransactionType,
              }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
      </div>

      <label className="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-300">
        Description
        <input
          type="text"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Write a short transaction note"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </label>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save Transaction
        </button>
      </div>
    </form>
  );
};
