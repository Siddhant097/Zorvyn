import { Transaction } from '../types/finance';

export const exportTransactionsToCsv = (transactions: Transaction[]) => {
  const header = ['Date', 'Description', 'Type', 'Category', 'Amount'];
  const rows = transactions.map((tx) => [
    new Date(tx.date).toISOString().slice(0, 10),
    tx.description,
    tx.type,
    tx.category,
    tx.amount.toString(),
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
