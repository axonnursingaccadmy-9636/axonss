import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdrop?: boolean;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeOnBackdrop = true,
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative w-full bg-white rounded-2xl shadow-2xl",
              "max-h-[90vh] overflow-hidden flex flex-col",
              sizeClasses[size]
            )}
          >
            {(title || description) && (
              <div className="px-6 py-4 border-b border-neutral-200 flex items-start justify-between">
                <div>
                  {title && <h2 className="text-lg font-bold text-neutral-900">{title}</h2>}
                  {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 -mr-1 -mt-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="overflow-y-auto px-6 py-4 flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
