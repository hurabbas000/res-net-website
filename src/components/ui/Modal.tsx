import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div className="relative my-6 w-full max-w-2xl rounded-2xl bg-white dark:bg-navy-800 shadow-card-hover animate-fade-in">
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-navy-100 dark:border-navy-700 sticky top-0 bg-white dark:bg-navy-800 rounded-t-2xl">
          <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-700 text-gray-500"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 sm:px-8 py-6">{children}</div>
      </div>
    </div>
  );
}
