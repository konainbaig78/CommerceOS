import {
  Check,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import type { ThemeMode } from "../types";

interface SettingsProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const themes: {
  id: ThemeMode;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    id: "light",
    label: "Light",
    description: "Clean and bright",
    icon: Sun,
  },
  {
    id: "dark",
    label: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
  },
  {
    id: "system",
    label: "System",
    description: "Follow your device",
    icon: Monitor,
  },
];

export default function Settings({
  theme,
  setTheme,
}: SettingsProps) {
  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-500">
          Preferences
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Customize your CommerceOS workspace.
        </p>
      </div>

      {/* Appearance */}
      <Card className="p-5 sm:p-6">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Choose how CommerceOS looks.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {themes.map((item) => {
            const Icon = item.icon;
            const active = theme === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setTheme(item.id)}
                className={`relative rounded-2xl border p-4 text-left transition-all duration-200 ${
                  active
                    ? "border-cyan-400 bg-cyan-400/5 shadow-sm shadow-cyan-400/10"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04]"
                }`}
              >
                {active && (
                  <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                    <Check size={13} strokeWidth={2.5} />
                  </div>
                )}

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    active
                      ? "bg-cyan-400/10 text-cyan-500 dark:text-cyan-400"
                      : "bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-400"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-900 dark:text-white">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Dashboard */}
      <Card className="p-5 sm:p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Dashboard
        </h2>

        <div className="mt-5 divide-y divide-slate-200 dark:divide-white/[0.06]">
          <SettingToggle
            title="Compact tables"
            description="Show more rows in data tables."
          />

          <SettingToggle
            title="AI insights"
            description="Show intelligent business recommendations."
          />
        </div>
      </Card>
    </div>
  );
}

interface SettingToggleProps {
  title: string;
  description: string;
}

function SettingToggle({
  title,
  description,
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="h-6 w-11 shrink-0 rounded-full bg-cyan-400 p-1"
      >
        <div className="ml-auto h-4 w-4 rounded-full bg-slate-950 shadow-sm" />
      </div>
    </div>
  );
}