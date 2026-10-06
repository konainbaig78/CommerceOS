import {
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/customers",
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
];

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen
        border-r border-slate-200 bg-white
        transition-all duration-300
        dark:border-white/[0.06] dark:bg-[#0B0F10]
        ${collapsed ? "w-[76px]" : "w-[250px]"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-[72px] items-center justify-between px-5">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-sm font-black text-slate-950">
                C
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
                  CommerceOS
                </p>
                <p className="text-[10px] text-slate-400">
                  Commerce intelligence
                </p>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
              C
            </div>
          )}

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-white/[0.05]"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          <p
            className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 ${
              collapsed ? "hidden" : ""
            }`}
          >
            Workspace
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} />

                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}

          <div className="my-5 border-t border-slate-200 dark:border-white/[0.06]" />

          <p
            className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 ${
              collapsed ? "hidden" : ""
            }`}
          >
            Intelligence
          </p>

          <NavLink
            to="/ai"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/[0.04]"
              }`
            }
          >
            <Bot size={18} strokeWidth={1.8} />
            {!collapsed && <span>AI Copilot</span>}
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/[0.04]"
              }`
            }
          >
            <Settings size={18} strokeWidth={1.8} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-white/[0.06]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-100 lg:flex dark:hover:bg-white/[0.04]"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          {!collapsed && (
            <div className="mt-2 flex items-center gap-3 rounded-xl p-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-white">
                AK
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
                  Alex Khan
                </p>
                <p className="truncate text-xs text-slate-400">
                  Admin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}