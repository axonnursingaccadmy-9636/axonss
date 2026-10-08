import { type ReactNode, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X, GraduationCap, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";

export function PublicLayout() {
  const { isAuthenticated, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: ROUTES.HOME },
    { label: "Courses", path: ROUTES.COURSES },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-sticky bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
              <div className="h-9 w-9 rounded-lg bg-primary-600 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">AXON</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <Link to={profile?.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.STUDENT}>
                  <Button size="sm" leftIcon={<Avatar name={profile?.fullName || "User"} size="xs" />}>
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="ghost" size="sm" leftIcon={<LogIn className="h-4 w-4" />}>
                      Login
                    </Button>
                  </Link>
                  <Link to={ROUTES.SIGNUP}>
                    <Button variant="primary" size="sm" leftIcon={<UserPlus className="h-4 w-4" />}>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white animate-slide-down">
            <nav className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-neutral-200 space-y-2">
                {isAuthenticated ? (
                  <Link
                    to={profile?.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.STUDENT}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button fullWidth size="sm">Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" fullWidth size="sm">Login</Button>
                    </Link>
                    <Link to={ROUTES.SIGNUP} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth size="sm">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary-600 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AXON</span>
            </div>
            <p className="text-sm">© 2026 AXON. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
