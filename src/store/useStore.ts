import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  FinanceCategory,
  Transaction,
  TransactionFilters,
  UserRole,
} from '../types/finance';
import { mockTransactions } from '../utils/mockData';

interface FinanceState extends TransactionFilters {
  role: UserRole;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: UserRole) => void;
  setSearchQuery: (searchQuery: string) => void;
  setFilterCategory: (filterCategory: FinanceCategory | 'All') => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      role: 'Admin',
      transactions: mockTransactions,
      searchQuery: '',
      filterCategory: 'All',
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            { ...tx, id: crypto.randomUUID() },
            ...state.transactions,
          ],
        })),
      updateTransaction: (id, tx) =>
        set((state) => ({
          transactions: state.transactions.map((item) =>
            item.id === id ? { ...tx, id } : item,
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
      setRole: (role) => set({ role }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterCategory: (filterCategory) => set({ filterCategory }),
    }),
    {
      name: 'finance-dashboard-store',
      partialize: (state) => ({
        role: state.role,
        transactions: state.transactions,
        searchQuery: state.searchQuery,
        filterCategory: state.filterCategory,
      }),
    },
  ),
);
