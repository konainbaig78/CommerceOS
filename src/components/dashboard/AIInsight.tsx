import {
  ArrowUpRight,
  Bot,
  Sparkles,
} from "lucide-react";
import { Card } from "../ui/Card";

export function AIInsight() {
  return (
    <Card className="relative overflow-hidden border-cyan-400/20 p-5">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Bot size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                AI Insight
              </p>
              <p className="text-[11px] text-slate-400">
                Just now
              </p>
            </div>
          </div>

          <Sparkles
            size={16}
            className="text-cyan-400"
          />
        </div>

        <h4 className="mt-6 text-base font-semibold text-slate-900 dark:text-white">
          Weekend sales are outperforming expectations.
        </h4>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Revenue increased 18.4% over the weekend,
          mainly driven by Electronics and returning
          customers.
        </p>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-white/[0.03]">
          <div>
            <p className="text-xs text-slate-400">
              Recommended action
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
              Increase weekend campaign budget
            </p>
          </div>

          <ArrowUpRight
            size={17}
            className="text-cyan-400"
          />
        </div>
      </div>
    </Card>
  );
}