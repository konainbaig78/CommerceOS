import {
  Bell,
  Menu,
  Search,
  Sparkles,
} from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  collapsed: boolean;
  setMobileOpen: (value: boolean) => void;
}

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/customers": "Customers",
  "/products": "Products",
  "/orders": "Orders",
  "/analytics": "Analytics",
  "/ai": "AI Copilot",
  "/settings": "Settings",
};

export function Header({
  collapsed,
  setMobileOpen,
}: HeaderProps) {
  const location = useLocation();

  const title = titles[location.pathname] ?? "CommerceOS";

  return (
    <header
      className={`fixed right-0 top-0 z-40 h-[72px] border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-all dark:border-white/[0.06] dark:bg-[#0B0F10]/90 ${
        collapsed ? "left-[76px]" : "left-[250px]"
      } left-0 lg:left-auto`}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-white/[0.05]"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </p>
            <p className="hidden text-xs text-slate-400 sm:block">
              Commerce intelligence workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 sm:flex dark:border-white/[0.07] dark:bg-white/[0.03]">
            <Search size={16} />
            <span>Search</span>
            <kbd className="ml-4 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-white/[0.06]">
              ⌘ K
            </kbd>
          </button>

          <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/[0.05]">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </button>

          <button className="hidden items-center gap-2 rounded-xl bg-cyan-400 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300 sm:flex">
            <Sparkles size={15} />
            Ask AI
          </button>
        </div>
      </div>
    </header>
  );
}