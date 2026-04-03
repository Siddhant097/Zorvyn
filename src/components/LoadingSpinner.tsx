export const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[30vh] items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500 dark:border-slate-700 dark:border-t-sky-400" />
    </div>
  );
};
