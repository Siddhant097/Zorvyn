import { Download, Pencil, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { Modal } from '../../components/Modal';
import { TransactionForm } from '../../components/TransactionForm';
import { useFinanceStore } from '../../store/useStore';
import { FinanceCategory, Transaction } from '../../types/finance';
import { formatCurrency, formatDate } from '../../utils/format';
import { exportTransactionsToCsv } from '../../utils/csv';

const categories: Array<FinanceCategory | 'All'> = [
  'All',
  'Food',
  'Housing',
  'Entertainment',
  'Salary',
  'Transport',
  'Utilities',
];

export const TransactionsSection = () => {
  const role = useFinanceStore((s) => s.role);
  const transactions = useFinanceStore((s) => s.transactions);
  const searchQuery = useFinanceStore((s) => s.searchQuery);
  const filterCategory = useFinanceStore((s) => s.filterCategory);
  const setSearchQuery = useFinanceStore((s) => s.setSearchQuery);
  const setFilterCategory = useFinanceStore((s) => s.setFilterCategory);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const updateTransaction = useFinanceStore((s) => s.updateTransaction);
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === 'All' ? true : tx.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchQuery, filterCategory]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Transactions
        </h3>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportTransactionsToCsv(filteredTransactions)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Download size={14} />
            Export CSV
          </button>
          {role === 'Admin' && (
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white"
            >
              <Plus size={14} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by description"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value as FinanceCategory | 'All')
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <EmptyState
          title="No results found"
          description="Try changing search text or category filters."
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-slate-500 dark:text-slate-300">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3 text-right">Amount</th>
                  {role === 'Admin' && <th className="pb-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="py-3">{formatDate(tx.date)}</td>
                    <td className="py-3">{tx.description}</td>
                    <td className="py-3">{tx.category}</td>
                    <td className="py-3 capitalize">{tx.type}</td>
                    <td className="py-3 text-right font-semibold">
                      <span
                        className={
                          tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                        }
                      >
                        {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    {role === 'Admin' && (
                      <td className="py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditing(tx)}
                            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(tx.id)}
                            className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-900/30"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {filteredTransactions.map((tx) => (
              <article
                key={tx.id}
                className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {tx.description}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(tx.date)}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <p>{tx.category}</p>
                  <p className="capitalize">{tx.type}</p>
                </div>

                {role === 'Admin' && (
                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => setEditing(tx)}
                      className="rounded-lg border border-slate-300 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="rounded-lg border border-rose-200 p-2 text-rose-600 dark:border-rose-800"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </>
      )}

      <Modal
        title="Add Transaction"
        open={showCreate}
        onClose={() => setShowCreate(false)}
      >
        <TransactionForm
          onSubmit={(payload) => {
            addTransaction(payload);
            setShowCreate(false);
          }}
          onCancel={() => setShowCreate(false)}
        />
      </Modal>

      <Modal
        title="Edit Transaction"
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <TransactionForm
            initial={editing}
            onSubmit={(payload) => {
              updateTransaction(editing.id, payload);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        ) : null}
      </Modal>
    </section>
  );
};
