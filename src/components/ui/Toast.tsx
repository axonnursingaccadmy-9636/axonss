import { useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const toastConfig: Record<ToastType, { icon: typeof CheckCircle2; bg: string; text: string; bar: string }> = {
  success: { icon: CheckCircle2, bg: "bg-success-50 border-success-200", text: "text-success-700", bar: "bg-success-500" },
  error: { icon: XCircle, bg: "bg-error-50 border-error-200", text: "text-error-700", bar: "bg-error-500" },
  warning: { icon: AlertTriangle, bg: "bg-warning-50 border-warning-200", text: "text-warning-700", bar: "bg-warning-500" },
  info: { icon: Info, bg: "bg-secondary-50 border-secondary-200", text: "text-secondary-700", bar: "bg-secondary-500" },
};

export function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastData;
  onRemove: (id: string) => void;
}) {
  const config = toastConfig[toast.type];
  const Icon = config.icon;
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "relative flex items-start gap-3 p-4 pr-10 rounded-xl border shadow-lg max-w-sm w-full overflow-hidden",
        config.bg
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.text)} />
      <p className={cn("text-sm font-medium flex-1", config.text)}>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className={cn("absolute right-2 top-2 p-1 rounded-md hover:bg-black/5 transition-colors", config.text)}
      >
        <X className="h-4 w-4" />
      </button>
      <motion.div
        className={cn("absolute bottom-0 left-0 h-0.5", config.bar)}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

export function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-toast flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
