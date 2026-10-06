import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import type { Stat } from "../../types";

import { Card } from "../ui/Card";

interface StatCardProps {
  stat: Stat;
  index: number;
}

export function StatCard({
  stat,
  index,
}: StatCardProps) {
  const isPositive =
    stat.trend === "up";

  return (
    <Card className="group p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">
            {stat.title}
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {stat.value}
          </h3>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-500">
          <TrendingUp size={17} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1 text-xs">
        {isPositive ? (
          <ArrowUpRight
            size={14}
            className="text-emerald-500"
          />
        ) : (
          <ArrowDownRight
            size={14}
            className="text-red-500"
          />
        )}

        <span
          className={
            isPositive
              ? "text-emerald-500"
              : "text-red-500"
          }
        >
          {stat.change}
        </span>

        <span className="text-slate-400">
          vs previous period
        </span>
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.04]">
        <div
          className="h-full rounded-full bg-cyan-400/60"
          style={{
            width: `${Math.min(
              65 + index * 7,
              100,
            )}%`,
          }}
        />
      </div>
    </Card>
  );
}