import { useNavigate } from "react-router-dom";
import {
  Factory,
  Users,
  Boxes,
  ShoppingCart,
  ClipboardList,
  IndianRupee,
} from "lucide-react";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Loom",
      icon: Factory,
      path: "/looms",
      color: "bg-blue-600",
    },
    {
      title: "Add Weaver",
      icon: Users,
      path: "/weavers",
      color: "bg-green-600",
    },
    {
      title: "Add Material",
      icon: Boxes,
      path: "/materials",
      color: "bg-purple-600",
    },
    {
      title: "Add Purchase",
      icon: ShoppingCart,
      path: "/purchases",
      color: "bg-orange-600",
    },
    {
      title: "Add Production",
      icon: ClipboardList,
      path: "/productions",
      color: "bg-indigo-600",
    },
    {
      title: "Add Sale",
      icon: IndianRupee,
      path: "/sales",
      color: "bg-pink-600",
    },
  ];

  return (
    <div className="mt-8">

      <h2 className="text-2xl font-bold text-gray-700 mb-5">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-3 gap-5">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className={`${action.color} text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3`}
            >
              <Icon size={28} />

              <span className="text-lg font-semibold">
                {action.title}
              </span>
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default QuickActions;