export type TransactionType = 'income' | 'expense';

export type FinanceCategory =
  | 'Food'
  | 'Housing'
  | 'Entertainment'
  | 'Salary'
  | 'Transport'
  | 'Utilities';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: FinanceCategory;
  type: TransactionType;
  description: string;
}

export type UserRole = 'Admin' | 'Viewer';

export interface TransactionFilters {
  searchQuery: string;
  filterCategory: FinanceCategory | 'All';
}
