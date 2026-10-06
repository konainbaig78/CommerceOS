import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardRevenuePoint } from "../../types";

import { Card } from "../ui/Card";

interface RevenueChartProps {
  data: DashboardRevenuePoint[];
  loading: boolean;
}

export function RevenueChart({
  data,
  loading,
}: RevenueChartProps) {
  // Ensure the chart always receives an array.
  const revenueData: DashboardRevenuePoint[] = Array.isArray(data)
    ? data
    : [];

  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + Number(item.revenue || 0),
    0,
  );

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">
            Revenue
          </p>

          <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
            {loading
              ? "—"
              : `$${totalRevenue.toLocaleString()}`}
          </h3>
        </div>

        <div className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-500 dark:border-white/[0.07] dark:text-slate-400">
          Revenue
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        {loading ? (
          <div className="h-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.03]" />
        ) : revenueData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No revenue data for this period.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#22d3ee"
                    stopOpacity={0.22}
                  />

                  <stop
                    offset="100%"
                    stopColor="#22d3ee"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="currentColor"
                strokeOpacity={0.06}
                vertical={false}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#94a3b8",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#94a3b8",
                }}
                tickFormatter={(value) =>
                  `$${Number(value) / 1000}k`
                }
              />

              <Tooltip
                contentStyle={{
                  background: "#111718",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  color: "#fff",
                }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22d3ee"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}