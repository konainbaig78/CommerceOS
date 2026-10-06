import {
  Bell,
  Menu,
  Search,
  Sparkles,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

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
  const navigate = useNavigate();

  const title =
    titles[location.pathname] ?? "CommerceOS";

  const handleAskAI = () => {
    navigate("/ai");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 h-[72px] border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-all duration-300 dark:border-white/[0.06] dark:bg-[#0B0F10]/90 lg:left-[${
        collapsed ? "76px" : "250px"
      }]`}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </p>

            <p className="hidden text-xs text-slate-400 sm:block">
              Commerce intelligence workspace
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <button
            type="button"
            aria-label="Search CommerceOS"
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600 sm:flex dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.05] dark:hover:text-slate-300"
          >
            <Search size={16} />

            <span>Search</span>

            <kbd className="ml-4 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
              ⌘ K
            </kbd>
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="View notifications"
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
          >
            <Bell size={18} />

            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400"
            />
          </button>

          {/* Ask AI */}
          <button
            type="button"
            onClick={handleAskAI}
            className="hidden items-center gap-2 rounded-xl bg-cyan-400 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98] sm:flex"
          >
            <Sparkles size={15} />
            Ask AI
          </button>
        </div>
      </div>
    </header>
  );
}