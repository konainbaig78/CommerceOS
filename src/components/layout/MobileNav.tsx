import {
  BarChart3,
  Bot,
  Home,
  Package,
  ShoppingCart,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Products",
    icon: Package,
    path: "/products",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    path: "/orders",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    label: "AI",
    icon: Bot,
    path: "/ai",
  },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111718]/95 lg:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] ${
                  isActive
                    ? "text-cyan-500"
                    : "text-slate-400"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}