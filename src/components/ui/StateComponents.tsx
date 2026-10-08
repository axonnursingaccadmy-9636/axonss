import { type ReactNode } from "react";
import { Loader2, AlertCircle, Inbox, Lock, FileQuestion, RotateCw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export function LoadingState({
  message = "Loading...",
  fullscreen = false,
  className,
}: {
  message?: string;
  fullscreen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-neutral-500",
        fullscreen ? "min-h-screen" : "min-h-[200px] py-12",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong",
  description,
  onRetry,
  className,
}: {
  message?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center py-12",
        className
      )}
    >
      <div className="h-14 w-14 rounded-full bg-error-50 flex items-center justify-center">
        <AlertCircle className="h-7 w-7 text-error-500" />
      </div>
      <div>
        <p className="text-base font-semibold text-neutral-900">{message}</p>
        {description && <p className="text-sm text-neutral-500 mt-1 max-w-sm">{description}</p>}
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RotateCw className="h-4 w-4" />}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  icon,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
  className,
}: {
  icon?: ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center py-12",
        className
      )}
    >
      <div className="h-14 w-14 rounded-full bg-neutral-100 flex items-center justify-center">
        {icon || <Inbox className="h-7 w-7 text-neutral-400" />}
      </div>
      <div>
        <p className="text-base font-semibold text-neutral-900">{title}</p>
        {description && <p className="text-sm text-neutral-500 mt-1 max-w-sm">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function UnauthorizedState({
  message = "You need to be logged in to access this page",
  onLogin,
  className,
}: {
  message?: string;
  onLogin?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center py-16",
        className
      )}
    >
      <div className="h-14 w-14 rounded-full bg-warning-50 flex items-center justify-center">
        <Lock className="h-7 w-7 text-warning-500" />
      </div>
      <div>
        <p className="text-base font-semibold text-neutral-900">Access Restricted</p>
        <p className="text-sm text-neutral-500 mt-1 max-w-sm">{message}</p>
      </div>
      {onLogin && (
        <Button variant="primary" size="sm" onClick={onLogin}>
          Login
        </Button>
      )}
    </div>
  );
}

export function NotFoundState({
  message = "The page you're looking for doesn't exist",
  onGoHome,
  className,
}: {
  message?: string;
  onGoHome?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center py-16",
        className
      )}
    >
      <div className="h-14 w-14 rounded-full bg-neutral-100 flex items-center justify-center">
        <FileQuestion className="h-7 w-7 text-neutral-400" />
      </div>
      <div>
        <p className="text-base font-semibold text-neutral-900">Not Found</p>
        <p className="text-sm text-neutral-500 mt-1 max-w-sm">{message}</p>
      </div>
      {onGoHome && (
        <Button variant="outline" size="sm" onClick={onGoHome}>
          Go Home
        </Button>
      )}
    </div>
  );
}
