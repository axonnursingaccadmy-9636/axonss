import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { NavigationProgressBar } from "@/components/ui/SEO";
import { LoadingState } from "@/components/ui/StateComponents";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { StudentLayout } from "@/layouts/StudentLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminRoute, StudentRoute, PublicRoute } from "@/components/guards/RouteGuards";
import { ROUTES } from "@/config/routes";

// Lazy loaded pages
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function PageLoader() {
  return <LoadingState fullscreen message="Loading page..." />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <SiteSettingsProvider>
              <NavigationProgressBar />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route element={<PublicLayout />}>
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                  </Route>

                  {/* Auth Routes (redirect if logged in) */}
                  <Route
                    path={ROUTES.LOGIN}
                    element={
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={ROUTES.SIGNUP}
                    element={
                      <PublicRoute>
                        <SignupPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={ROUTES.FORGOT_PASSWORD}
                    element={
                      <PublicRoute>
                        <ForgotPasswordPage />
                      </PublicRoute>
                    }
                  />

                  {/* Student Routes */}
                  <Route
                    element={
                      <StudentRoute>
                        <StudentLayout />
                      </StudentRoute>
                    }
                  >
                    <Route path={ROUTES.STUDENT} element={<div className="text-center py-20 text-neutral-500">Student Dashboard — Coming in Phase 5</div>} />
                  </Route>

                  {/* Admin Routes */}
                  <Route
                    element={
                      <AdminRoute>
                        <AdminLayout />
                      </AdminRoute>
                    }
                  >
                    <Route path={ROUTES.ADMIN_DASHBOARD} element={<div className="text-center py-20 text-neutral-500">Admin Dashboard — Coming in Phase 3</div>} />
                  </Route>

                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </SiteSettingsProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
