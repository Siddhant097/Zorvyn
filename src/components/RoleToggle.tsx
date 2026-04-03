import { Shield, UserRound } from 'lucide-react';
import { useFinanceStore } from '../store/useStore';
import { UserRole } from '../types/finance';

export const RoleToggle = () => {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  const roles: UserRole[] = ['Admin', 'Viewer'];

  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
      {roles.map((item) => {
        const active = item === role;
        return (
          <button
            key={item}
            onClick={() => setRole(item)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              active
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            {item === 'Admin' ? <Shield size={14} /> : <UserRound size={14} />}
            {item}
          </button>
        );
      })}
    </div>
  );
};
