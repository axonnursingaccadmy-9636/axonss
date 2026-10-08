import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "accent";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700 border-neutral-200",
  success: "bg-success-50 text-success-700 border-success-200",
  warning: "bg-warning-50 text-warning-700 border-warning-200",
  error: "bg-error-50 text-error-700 border-error-200",
  info: "bg-secondary-50 text-secondary-700 border-secondary-200",
  accent: "bg-accent-50 text-accent-700 border-accent-200",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-neutral-400",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  info: "bg-secondary-500",
  accent: "bg-accent-500",
};

export function Badge({ children, variant = "default", className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
}

type StatusType = "active" | "inactive" | "published" | "draft" | "paid" | "pending" | "expired";

const statusConfig: Record<StatusType, { variant: BadgeVariant; label: string }> = {
  active: { variant: "success", label: "Active" },
  inactive: { variant: "error", label: "Inactive" },
  published: { variant: "success", label: "Published" },
  draft: { variant: "warning", label: "Draft" },
  paid: { variant: "success", label: "Paid" },
  pending: { variant: "warning", label: "Pending" },
  expired: { variant: "error", label: "Expired" },
};

export function StatusBadge({ status, className }: { status: StatusType; className?: string }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  );
}
