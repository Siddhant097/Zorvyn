import { Transaction } from '../types/finance';

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

const iso = (offsetMonth: number, day: number) => {
  const d = new Date(year, month + offsetMonth, day);
  return d.toISOString();
};

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    date: iso(0, 2),
    amount: 3200,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary',
  },
  {
    id: 't2',
    date: iso(0, 4),
    amount: 1500,
    category: 'Housing',
    type: 'expense',
    description: 'Rent payment',
  },
  {
    id: 't3',
    date: iso(0, 7),
    amount: 260,
    category: 'Food',
    type: 'expense',
    description: 'Groceries',
  },
  {
    id: 't4',
    date: iso(0, 11),
    amount: 80,
    category: 'Transport',
    type: 'expense',
    description: 'Fuel refill',
  },
  {
    id: 't5',
    date: iso(-1, 9),
    amount: 210,
    category: 'Food',
    type: 'expense',
    description: 'Last month groceries',
  },
  {
    id: 't6',
    date: iso(-1, 3),
    amount: 3100,
    category: 'Salary',
    type: 'income',
    description: 'Previous salary',
  },
  {
    id: 't7',
    date: iso(0, 13),
    amount: 140,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity bill',
  },
  {
    id: 't8',
    date: iso(0, 16),
    amount: 120,
    category: 'Entertainment',
    type: 'expense',
    description: 'Cinema and dinner',
  },
];
