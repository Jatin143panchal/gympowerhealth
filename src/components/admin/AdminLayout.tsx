import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { 
  Dumbbell, 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Members", path: "/admin/members" },
  { icon: MessageSquare, label: "Broadcast", path: "/admin/broadcast" },
  { icon: Bell, label: "Announcements", path: "/admin/announcements" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-green-500/20 transform transition-transform lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-green-500/20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-black shadow-[0_0_25px_rgba(34,197,94,0.6)] flex items-center justify-center">
                <img src={logo} alt="Power Health" className="w-7 h-7 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wide text-white">
                  POWER HEALTH
                </span>
                <span className="text-xs text-green-400 font-semibold -mt-1">ADMIN PANEL</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all",
                  location.pathname === link.path
                    ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    : "text-gray-300 hover:bg-green-500/10 hover:text-green-400"
                )}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-green-500/20">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-gray-300 hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-green-500/20 bg-black flex items-center justify-between px-4 lg:px-6">
          <button
            className="lg:hidden p-2 text-green-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" size="icon" className="text-green-400">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              {user?.user_metadata?.full_name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
