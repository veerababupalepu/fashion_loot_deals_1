import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700",
          "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white",
          "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500",
          "transition-all duration-200",
          error && "border-red-500 focus:ring-red-500/30 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
