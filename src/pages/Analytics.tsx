import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  categoryData,
  customerGrowthData,
  revenueData,
} from "../data/dummyData";

import { Card } from "../components/ui/Card";

export default function Analytics() {
  const analyticsStats = [
    ["Conversion rate", "4.82%", "+0.8%"],
    ["Customer retention", "72.4%", "+4.2%"],
    ["Revenue per customer", "$214", "+9.7%"],
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-500">
          Intelligence
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Understand what's driving your business.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {analyticsStats.map(([title, value, change]) => (
          <Card key={title} className="p-5">
            <p className="text-xs text-slate-400">
              {title}
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {value}
            </p>

            <p className="mt-2 text-xs text-emerald-500">
              {change} this month
            </p>
          </Card>
        ))}
      </div>

      {/* Revenue Trend */}
      <Card className="p-5">
        <p className="text-xs text-slate-400">
          Revenue trend
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
          Revenue performance
        </h3>

        <div className="mt-6 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="analyticsRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#22d3ee"
                    stopOpacity={0.25}
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
                dataKey="day"
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
              />

              <Tooltip
                contentStyle={{
                  background: "#111718",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22d3ee"
                fill="url(#analyticsRevenue)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Customer Growth + Category Revenue */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Customer Growth */}
        <Card className="p-5">
          <p className="text-xs text-slate-400">
            Customer growth
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Customer acquisition
          </h3>

          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customerGrowthData}>
                <CartesianGrid
                  stroke="currentColor"
                  strokeOpacity={0.06}
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
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
                />

                <Tooltip
                  contentStyle={{
                    background: "#111718",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="customers"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue by Category */}
        <Card className="p-5">
          <p className="text-xs text-slate-400">
            Revenue distribution
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Revenue by category
          </h3>

          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid
                  stroke="currentColor"
                  strokeOpacity={0.06}
                  vertical={false}
                />

                <XAxis
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
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
                />

                <Tooltip
                  contentStyle={{
                    background: "#111718",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="revenue"
                  fill="#22d3ee"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}