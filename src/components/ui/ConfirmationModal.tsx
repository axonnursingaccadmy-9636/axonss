import { type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary" | "warning";
  loading?: boolean;
}

export function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmationModalProps) {
  const iconColor = {
    danger: "bg-error-50 text-error-500",
    primary: "bg-primary-50 text-primary-500",
    warning: "bg-warning-50 text-warning-500",
  };

  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center py-2">
        <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 ${iconColor[variant]}`}>
          <AlertTriangle className="h-7 w-7" />
        </div>
        <p className="text-sm text-neutral-600 mb-6">{message}</p>
        <div className="flex gap-3 w-full">
          <Button variant="outline" fullWidth onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            fullWidth
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
