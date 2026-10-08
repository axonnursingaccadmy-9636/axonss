import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  BookOpen,
  FileText,
  Video,
  FileQuestion,
  Ticket,
  CreditCard,
  Trophy,
  ScrollText,
  Settings,
  LogOut,
  GraduationCap,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: ROUTES.ADMIN_DASHBOARD },
      { label: "Students", icon: Users, path: ROUTES.ADMIN_STUDENTS },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Courses", icon: FolderOpen, path: ROUTES.ADMIN_BATCHES },
      { label: "Subjects", icon: BookOpen, path: ROUTES.ADMIN_SUBJECTS },
      { label: "Chapters", icon: FileText, path: ROUTES.ADMIN_CHAPTERS },
      { label: "Classes", icon: Video, path: ROUTES.ADMIN_CLASSES },
      { label: "PDF Notes", icon: FileText, path: ROUTES.ADMIN_PDF_NOTES },
      { label: "MCQ Tests", icon: FileQuestion, path: ROUTES.ADMIN_MCQ_TESTS },
    ],
  },
  {
    title: "Engagement",
    items: [
      { label: "Weekly Warrior", icon: Trophy, path: ROUTES.ADMIN_WEEKLY_WARRIOR },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Coupons", icon: Ticket, path: ROUTES.ADMIN_COUPONS },
      { label: "Payments", icon: CreditCard, path: ROUTES.ADMIN_PAYMENTS },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Audit Logs", icon: ScrollText, path: ROUTES.ADMIN_AUDIT_LOGS },
      { label: "Branding", icon: Settings, path: ROUTES.ADMIN_BRANDING },
    ],
  },
];

const mobileNavItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: ROUTES.ADMIN_DASHBOARD },
  { label: "Courses", icon: FolderOpen, path: ROUTES.ADMIN_BATCHES },
  { label: "Students", icon: Users, path: ROUTES.ADMIN_STUDENTS },
  { label: "Payments", icon: CreditCard, path: ROUTES.ADMIN_PAYMENTS },
  { label: "Settings", icon: Settings, path: ROUTES.ADMIN_BRANDING },
];

export function AdminLayout() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-neutral-900 fixed inset-y-0 left-0 z-sticky">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-neutral-800">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white block leading-tight">AXON</span>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-primary-600 text-white"
                        : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-neutral-800">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <Avatar name={profile?.fullName || "Admin"} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{profile?.fullName}</p>
              <p className="text-xs text-neutral-500 truncate">{profile?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-dropdown">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-64 bg-neutral-900 overflow-y-auto animate-slide-down">
            <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">AXON</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-neutral-800">
                <X className="h-5 w-5 text-neutral-400" />
              </button>
            </div>
            <nav className="px-3 py-4 space-y-4">
              {navSections.map((section) => (
                <div key={section.title}>
                  <p className="px-3 mb-1 text-[10px] font-semibold text-neutral-500 uppercase">{section.title}</p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive(item.path)
                            ? "bg-primary-600 text-white"
                            : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white w-full"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-sticky bg-white/80 backdrop-blur-md border-b border-neutral-200 h-16 flex items-center px-4 gap-3">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Avatar name={profile?.fullName || "Admin"} size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-neutral-900">{profile?.fullName}</p>
              <p className="text-xs text-neutral-500">Administrator</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-sticky bg-white border-t border-neutral-200 h-16 flex items-center justify-around px-2">
        {mobileNavItems.map((item) => (
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
