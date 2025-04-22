
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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
} from "lucide-react";

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
            <span className="text-xl font-bold text-purple-600">IPO Insight</span>
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
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
