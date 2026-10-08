import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline" | "accent";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm",
  secondary:
    "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-sm",
  accent:
    "bg-accent-500 text-neutral-900 hover:bg-accent-600 active:bg-accent-700 shadow-sm font-semibold",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
  outline:
    "bg-transparent border border-neutral-300 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100",
  danger:
    "bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2 rounded-xl",
  icon: "h-10 w-10 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "active:scale-[0.98]",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
