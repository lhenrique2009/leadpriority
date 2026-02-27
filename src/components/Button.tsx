import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          // Variants
          variant === 'primary' && "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
          variant === 'secondary' && "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500",
          variant === 'outline' && "border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-500",
          variant === 'ghost' && "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500",
          // Sizes
          size === 'sm' && "px-3 py-1.5 text-sm",
          size === 'md' && "px-4 py-2 text-sm",
          size === 'lg' && "px-6 py-3 text-base",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
