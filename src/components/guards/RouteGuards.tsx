import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState } from "@/components/ui/StateComponents";
import { ROUTES } from "@/config/routes";

export function AdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingState fullscreen message="Verifying access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.STUDENT} replace />;
  }

  return <>{children}</>;
}

export function StudentRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, profile } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingState fullscreen message="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (profile && !profile.isActive) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (profile?.role === "admin") {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, profile } = useAuth();

  if (isLoading) {
    return <LoadingState fullscreen message="Loading..." />;
  }

  if (isAuthenticated) {
    const redirect = profile?.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.STUDENT;
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}
