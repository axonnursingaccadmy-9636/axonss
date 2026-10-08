import { type InputHTMLAttributes, type ReactNode, forwardRef, useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, hint, type = "text", className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || props.name;
    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={cn(
              "w-full h-11 rounded-lg border bg-white px-3 text-sm text-neutral-900",
              "placeholder:text-neutral-400 transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50",
              leftIcon && "pl-10",
              isPassword && "pr-10",
              error
                ? "border-error-400 focus:ring-error-500/20 focus:border-error-500"
                : "border-neutral-300",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-error-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
        {hint && !error && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
