import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-navy-700 text-white hover:bg-navy-600 shadow-sm hover:shadow-md',
  secondary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md',
  outline:
    'border-2 border-navy-200 text-navy-700 hover:border-navy-500 hover:text-navy-500 dark:border-navy-600 dark:text-gray-200 dark:hover:border-navy-400',
  ghost:
    'text-navy-700 hover:bg-navy-50 dark:text-gray-200 dark:hover:bg-navy-800',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
