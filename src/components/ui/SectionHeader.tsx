import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
