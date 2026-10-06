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

export default function Settings({
  theme,
  setTheme,
}: SettingsProps) {
  const themes = [
    {
      id: "light" as const,
      label: "Light",
      description: "Clean and bright",
      icon: Sun,
    },
    {
      id: "dark" as const,
      label: "Dark",
      description: "Easy on the eyes",
      icon: Moon,
    },
    {
      id: "system" as const,
      label: "System",
      description: "Follow your device",
      icon: Monitor,
    },
  ];

  return (
    <div className="max-w-4xl space-y-6">
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

      <Card className="p-5 sm:p-6">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-slate-400">
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
                onClick={() => setTheme(item.id)}
                className={`relative rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-cyan-400 bg-cyan-400/5"
                    : "border-slate-200 hover:border-slate-300 dark:border-white/[0.07] dark:hover:border-white/[0.12]"
                }`}
              >
                {active && (
                  <div className="absolute right-3 top-3 text-cyan-400">
                    <Check size={16} />
                  </div>
                )}

                <Icon
                  size={19}
                  className={
                    active
                      ? "text-cyan-400"
                      : "text-slate-400"
                  }
                />

                <p className="mt-4 text-sm font-medium text-slate-900 dark:text-white">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Dashboard
        </h2>

        <div className="mt-5 divide-y divide-slate-200 dark:divide-white/[0.06]">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Compact tables
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Show more rows in data tables.
              </p>
            </div>

            <div className="h-6 w-11 rounded-full bg-cyan-400 p-1">
              <div className="ml-auto h-4 w-4 rounded-full bg-slate-950" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                AI insights
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Show intelligent business recommendations.
              </p>
            </div>

            <div className="h-6 w-11 rounded-full bg-cyan-400 p-1">
              <div className="ml-auto h-4 w-4 rounded-full bg-slate-950" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}