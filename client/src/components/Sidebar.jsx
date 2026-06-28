import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Factory,
  Users,
  Boxes,
  ShoppingCart,
  ClipboardList,
  IndianRupee,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Looms",
      icon: Factory,
      path: "/looms",
    },
    {
      name: "Weavers",
      icon: Users,
      path: "/weavers",
    },
    {
      name: "Materials",
      icon: Boxes,
      path: "/materials",
    },
    {
      name: "Purchases",
      icon: ShoppingCart,
      path: "/purchases",
    },
    {
      name: "Production",
      icon: ClipboardList,
      path: "/productions",
    },
    {
      name: "Sales",
      icon: IndianRupee,
      path: "/sales",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-blue-700 text-white shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-blue-600">

        <h1 className="text-2xl font-bold">
          🧵 Weaving ERP
        </h1>

        <p className="text-sm text-blue-200 mt-1">
          Weaving Management System
        </p>

      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-white text-blue-700 font-semibold shadow-md"
                  : "hover:bg-blue-800 text-white"
              }`}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}

      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-64 px-6">

        <div className="border-t border-blue-600 pt-4">

          <p className="text-xs text-blue-200 text-center">
            © 2026 Weaving ERP
          </p>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;