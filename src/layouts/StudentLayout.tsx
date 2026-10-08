import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  MessageSquare,
  ClipboardList,
  User,
  LogOut,
  Bell,
  Search,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";

export function StudentLayout() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: Home, path: ROUTES.STUDENT },
    { label: "My Courses", icon: BookOpen, path: ROUTES.STUDENT_COURSES },
    { label: "AI Mentor", icon: MessageSquare, path: ROUTES.STUDENT_CHATS },
    { label: "Tests", icon: ClipboardList, path: ROUTES.STUDENT },
    { label: "Profile", icon: User, path: ROUTES.STUDENT_PROFILE },
  ];

  const isActive = (path: string) => {
    if (path === ROUTES.STUDENT) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200 fixed inset-y-0 left-0 z-sticky">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-neutral-200">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-neutral-900">AXON</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-dropdown">
          <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-64 bg-white animate-slide-down">
            <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">AXON</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-neutral-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50 transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-sticky bg-white/80 backdrop-blur-md border-b border-neutral-200 h-16 flex items-center px-4 gap-3">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search courses, tests..."
                className="w-full h-9 pl-10 pr-3 rounded-lg bg-neutral-100 border border-transparent text-sm focus:bg-white focus:border-primary-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button className="p-2 rounded-lg hover:bg-neutral-100 relative">
            <Bell className="h-5 w-5 text-neutral-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-error-500 rounded-full" />
          </button>

          <Link to={ROUTES.STUDENT_PROFILE}>
            <Avatar name={profile?.fullName || "Student"} size="sm" />
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-sticky bg-white border-t border-neutral-200 h-16 flex items-center justify-around px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg transition-colors flex-1",
              isActive(item.path) ? "text-primary-600" : "text-neutral-400"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
