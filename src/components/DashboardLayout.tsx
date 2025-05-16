
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Users,
  HelpCircle,
  Bell,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "IPO Management", path: "/dashboard/ipo-management" },
  { icon: Bell, label: "IPO Subscription", path: "/dashboard/ipo-subscription" },
  { icon: Users, label: "IPO Allotment", path: "/dashboard/ipo-allotment" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help", path: "/dashboard/help" },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 z-30",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <span className="text-xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-blue-500">IPO Insight</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-gray-600 hover:bg-purple-50 hover:text-purple-600",
                location.pathname === item.path &&
                  "bg-purple-50 text-purple-600"
              )}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-8 w-full px-4">
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50",
              !isSidebarOpen && "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* User info in header */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">BlueStock Admin</h1>
          {user && (
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
